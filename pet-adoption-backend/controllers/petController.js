import Pet from "../models/Pet.js";

// GET ALL PETS (Search + Filter + Pagination)
export const getPets = async (req, res) => {
  try {
    const { search, species, breed, age, page = 1, limit = 6 } = req.query;

    let query = {};

    // Search by name or breed
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { breed: { $regex: search, $options: "i" } },
      ];
    }

    if (species) query.species = species;
    if (breed) query.breed = breed;
    if (age) query.age = age;

    query.status = "Available";

    const pets = await Pet.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Pet.countDocuments(query);

    res.json({
      pets,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE PET
export const getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });

    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE PET (Admin)
export const createPet = async (req, res) => {
  try {
    const pet = await Pet.create(req.body);
    res.status(201).json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PET (Admin)
export const updatePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE PET (Admin)
export const deletePet = async (req, res) => {
  try {
    await Pet.findByIdAndDelete(req.params.id);
    res.json({ message: "Pet deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
