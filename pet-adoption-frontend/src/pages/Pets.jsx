import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const dummyPets = [
  { _id: "1", name: "Buddy", breed: "Labrador", species: "Dog", age: 2 },
  { _id: "2", name: "Milo", breed: "Beagle", species: "Dog", age: 1 },
  { _id: "3", name: "Luna", breed: "Persian", species: "Cat", age: 3 },
  { _id: "4", name: "Charlie", breed: "Bulldog", species: "Dog", age: 4 },
  { _id: "5", name: "Kitty", breed: "Siamese", species: "Cat", age: 2 },
  { _id: "6", name: "Rocky", breed: "Pug", species: "Dog", age: 1 },
];

const Pets = () => {
  const navigate = useNavigate();
const { isAuthenticated } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const petsPerPage = 4;

  // Filtering
  const filteredPets = dummyPets.filter((pet) => {
    return (
      (pet.name.toLowerCase().includes(search.toLowerCase()) ||
        pet.breed.toLowerCase().includes(search.toLowerCase())) &&
      (species ? pet.species === species : true) &&
      (breed ? pet.breed === breed : true) &&
      (age ? pet.age === Number(age) : true)
    );
  });

  // Pagination
  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = filteredPets.slice(
    indexOfFirstPet,
    indexOfLastPet
  );

  const totalPages = Math.ceil(filteredPets.length / petsPerPage);

  // Apply Button Logic
 const handleApply = (petId) => {
  if (isAuthenticated) {
    navigate(`/pets/${petId}`);
  } else {
    navigate("/login", {
      state: { from: `/apply/${petId}` },
    });
  }
};

  return (
    <div className="min-h-screen bg-white px-6 py-10">

      <h1 className="text-3xl font-bold text-center mb-8">
        Available Pets 🐾
      </h1>

      {/* Search + Filters */}
      <div className="bg-gray-50 p-6 rounded-2xl shadow mb-8 grid md:grid-cols-4 gap-4">

        <input
          type="text"
          placeholder="Search by name or breed"
          className="p-3 border rounded-xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-3 border rounded-xl"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
        >
          <option value="">All Species</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
        </select>

        <select
          className="p-3 border rounded-xl"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        >
          <option value="">All Breeds</option>
          <option value="Labrador">Labrador</option>
          <option value="Beagle">Beagle</option>
          <option value="Persian">Persian</option>
          <option value="Bulldog">Bulldog</option>
          <option value="Siamese">Siamese</option>
          <option value="Pug">Pug</option>
        </select>

        <select
          className="p-3 border rounded-xl"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        >
          <option value="">All Ages</option>
          <option value="1">1 Year</option>
          <option value="2">2 Years</option>
          <option value="3">3 Years</option>
          <option value="4">4 Years</option>
        </select>

      </div>

      {/* Pet Cards */}
      <div className="grid md:grid-cols-4 gap-6">

        {currentPets.length === 0 && (
          <p className="text-gray-500">No pets found.</p>
        )}

        {currentPets.map((pet) => (
          <div
            key={pet._id}
            className="bg-gray-50 p-5 rounded-2xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">
              {pet.name}
            </h2>

            <p className="text-gray-600">{pet.breed}</p>

            <p className="text-gray-600">
              {pet.species} • {pet.age} years
            </p>

            <div className="flex gap-2 mt-4">

              <Link
                to={`/pets/${pet._id}`}
                className="flex-1 bg-blue-600 text-white p-2 rounded-xl text-center hover:bg-blue-700"
              >
                View
              </Link>

           <button
  onClick={() => handleApply(pet._id)}
  className="flex-1 bg-green-600 text-white p-2 rounded-xl hover:bg-green-700"
>
  Apply
</button>


            </div>

          </div>
        ))}

      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 space-x-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-xl ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

    </div>
  );
};

export default Pets;
