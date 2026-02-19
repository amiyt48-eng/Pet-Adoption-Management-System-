import Adoption from "../models/Adoption.js";
import Pet from "../models/Pet.js";

export const applyAdoption = async (req, res) => {
  const pet = await Pet.findById(req.body.petId);

  if (!pet || pet.status !== "Available")
    return res.status(400).json({ message: "Pet not available" });

  const existing = await Adoption.findOne({
    user: req.user.id,
    pet: req.body.petId,
  });

  if (existing)
    return res.status(400).json({ message: "Already applied" });

  const adoption = await Adoption.create({
    user: req.user.id,
    pet: req.body.petId,
  });

  pet.status = "Pending";
  await pet.save();

  res.status(201).json(adoption);
};

export const getMyApplications = async (req, res) => {
  const apps = await Adoption.find({ user: req.user.id }).populate("pet");
  res.json(apps);
};

export const getAllApplications = async (req, res) => {
  const apps = await Adoption.find().populate("user pet");
  res.json(apps);
};

export const updateApplicationStatus = async (req, res) => {
  const { status } = req.body; // Approved or Rejected

  const application = await Adoption.findById(req.params.id);

  if (!application) {
    return res.status(404).json({ message: "Application not found" });
  }

  application.status = status;

  await application.save();

  // If approved → update pet status
  if (status === "Approved") {
    await Pet.findByIdAndUpdate(application.pet, {
      status: "Adopted",
    });
  }

  res.json(application);
};
