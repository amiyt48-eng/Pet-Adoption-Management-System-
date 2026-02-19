import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPet,
  fetchPets,
  deletePet,
  updatePet,
} from "../features/pets/petSlice";
import { logout } from "../features/auth/authSlice";
import {
  getAllApplications,
  updateApplication,
} from "../features/adoptions/adoptionSlice";


const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { pets } = useSelector((state) => state.pets);

  const [showForm, setShowForm] = useState(false);
const [editingId, setEditingId] = useState(null);
const { applications } = useSelector(
  (state) => state.adoptions
);

  const [pet, setPet] = useState({
    name: "",
    breed: "",
    species: "",
    age: "",
    description: "",
  });

  // Load pets when admin page opens
useEffect(() => {
  dispatch(fetchPets());
  dispatch(getAllApplications()); // 👈 ADD THIS
}, [dispatch]);

  const handleLogout = () => {
  dispatch(logout());
};


  // Add Pet
 const handleSubmit = async (e) => {
  e.preventDefault();

  let result;

  if (editingId) {
    result = await dispatch(
      updatePet({ id: editingId, data: pet })
    );
  } else {
    result = await dispatch(createPet(pet));
  }

  if (result.meta.requestStatus === "fulfilled") {
    alert(editingId ? "Pet updated ✅" : "Pet added ✅");

    setPet({
      name: "",
      breed: "",
      species: "",
      age: "",
      description: "",
    });

    setEditingId(null);
    setShowForm(false);
  }
};

  // Delete Pet
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this pet?"
    );

    if (confirmDelete) {
      await dispatch(deletePet(id));
    }
  };

  return (
    <div className="min-h-screen bg-white p-10">
    <div className="flex justify-between items-center mb-8">
  <h1 className="text-3xl font-bold">
    Admin Dashboard 🛠
  </h1>

  
</div>

      <div className="grid md:grid-cols-2 gap-8">

        {/* ================= ADD PET ================= */}
        <div className="bg-gray-50 p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Manage Pets
          </h2>

          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl mb-4"
          >
            {showForm ? "Close Form" : "Add Pet"}
          </button>

          {showForm && (
            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                placeholder="Pet Name"
                className="w-full border p-2 rounded"
                value={pet.name}
                onChange={(e) =>
                  setPet({ ...pet, name: e.target.value })
                }
                required
              />

              <input
                type="text"
                placeholder="Breed"
                className="w-full border p-2 rounded"
                value={pet.breed}
                onChange={(e) =>
                  setPet({ ...pet, breed: e.target.value })
                }
                required
              />

              <select
                className="w-full border p-2 rounded"
                value={pet.species}
                onChange={(e) =>
                  setPet({ ...pet, species: e.target.value })
                }
                required
              >
                <option value="">Select Species</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
              </select>

              <input
                type="number"
                placeholder="Age"
                className="w-full border p-2 rounded"
                value={pet.age}
                onChange={(e) =>
                  setPet({ ...pet, age: e.target.value })
                }
                required
              />

              <textarea
                placeholder="Description"
                className="w-full border p-2 rounded"
                value={pet.description}
                onChange={(e) =>
                  setPet({ ...pet, description: e.target.value })
                }
              />

              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
               {editingId ? "Update Pet" : "Save Pet"}

              </button>
            </form>
          )}
        </div>

        {/* ================= PET LIST ================= */}
        <div className="bg-gray-50 p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            All Pets
          </h2>

          {pets.length === 0 ? (
            <p className="text-gray-500">
              No pets available.
            </p>
          ) : (
            <div className="space-y-4">
              {pets.map((pet) => (
                <div
                  key={pet._id}
                  className="flex justify-between items-center bg-white p-3 rounded shadow"
                >
                  <div>
                    <p className="font-semibold">{pet.name}</p>
                    <p className="text-sm text-gray-500">
                      {pet.breed} • {pet.species} • {pet.age} yrs
                    </p>
                  </div>

                 <div className="flex gap-2">
  <button
    onClick={() => {
      setPet(pet);
      setEditingId(pet._id);
      setShowForm(true);
    }}
    className="bg-yellow-500 text-white px-3 py-1 rounded"
  >
    Edit
  </button>

  <button
    onClick={() => handleDelete(pet._id)}
    className="bg-red-500 text-white px-3 py-1 rounded"
  >
    Delete
  </button>
</div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================= APPLICATIONS ================= */}
<div className="bg-gray-50 p-6 rounded-2xl shadow mt-10">
  <h2 className="text-xl font-semibold mb-4">
    Adoption Applications
  </h2>

  {applications?.length === 0 ? (
    <p className="text-gray-500">
      No applications found.
    </p>
  ) : (
    <table className="w-full">
      <thead>
        <tr className="border-b text-left">
          <th className="py-2">User</th>
          <th>Pet</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {applications.map((app) => (
          <tr key={app._id} className="border-b">
            <td className="py-2">
              {app.user?.name}
            </td>
            <td>{app.pet?.name}</td>
            <td>
              <span
                className={
                  app.status === "Approved"
                    ? "text-green-600"
                    : app.status === "Rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }
              >
                {app.status}
              </span>
            </td>

        <td className="py-2">
  {app.status === "Pending" ? (
    <div className="flex gap-2">
      <button
        onClick={() =>
          dispatch(
            updateApplication({
              id: app._id,
              status: "Approved",
            })
          )
        }
        className="bg-green-500 text-white px-3 py-1 rounded"
      >
        Approve
      </button>

      <button
        onClick={() =>
          dispatch(
            updateApplication({
              id: app._id,
              status: "Rejected",
            })
          )
        }
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Reject
      </button>
    </div>
  ) : (
    <span className="text-gray-500 font-medium">
      No Action
    </span>
  )}
</td>

          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>


      </div>
    </div>
  );
};

export default AdminDashboard;
