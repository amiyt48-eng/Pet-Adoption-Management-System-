import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPets } from "../features/pets/petSlice";
import { applyAdoption } from "../features/adoptions/adoptionSlice";

const PetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pets } = useSelector((state) => state.pets);
  const { user } = useSelector((state) => state.auth);
  const { applications } = useSelector((state) => state.adoptions);

  useEffect(() => {
    dispatch(fetchPets());
  }, [dispatch]);

  const pet = pets.find((p) => p._id === id);

  if (!pet) return <p className="p-10">Loading...</p>;

  const alreadyApplied = applications?.some(
    (app) => app.pet?._id === id
  );

  const handleApply = () => {
    dispatch(applyAdoption(id));
  };

  return (
    <div className="min-h-screen bg-white p-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600"
      >
        ← Back
      </button>

      <div className="max-w-3xl mx-auto bg-gray-50 p-8 rounded-2xl shadow">
        <h1 className="text-3xl font-bold mb-4">
          {pet.name}
        </h1>

        <p><strong>Breed:</strong> {pet.breed}</p>
        <p><strong>Species:</strong> {pet.species}</p>
        <p><strong>Age:</strong> {pet.age} years</p>
        <p className="mt-4">{pet.description}</p>

        {user?.role === "user" && (
          <div className="mt-6">
            {alreadyApplied ? (
              <span className="text-green-600 font-semibold">
                Already Applied ✅
              </span>
            ) : (
              <button
                onClick={handleApply}
                className="bg-green-600 text-white px-6 py-2 rounded-xl"
              >
                Apply for Adoption
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PetDetails;
