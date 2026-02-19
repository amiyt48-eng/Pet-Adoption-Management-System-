import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { applyAdoption } from "../features/adoptions/adoptionSlice";

const PetCard = ({ pet }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <img
        src={pet.image || "https://via.placeholder.com/200"}
        alt={pet.name}
        className="w-full h-40 object-cover rounded"
      />

      <h2 className="text-xl font-bold mt-2">{pet.name}</h2>
      <p>Breed: {pet.breed}</p>
      <p>Age: {pet.age}</p>

      <div className="flex justify-between mt-3">
        <Link
          to={`/pets/${pet._id}`}
          className="text-blue-600 underline"
        >
          View
        </Link>

        <button
          onClick={() => dispatch(applyAdoption(pet._id))}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Adopt
        </button>
      </div>
    </div>
  );
};

export default PetCard;
