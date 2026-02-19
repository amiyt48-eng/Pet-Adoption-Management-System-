import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const PetDetails = () => {
  const { id } = useParams();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-white p-10">
      <div className="max-w-3xl mx-auto bg-gray-50 p-8 rounded-2xl shadow">

        <h1 className="text-3xl font-bold mb-4">Pet Details 🐶</h1>

        <p className="mb-2"><strong>Name:</strong> Buddy</p>
        <p className="mb-2"><strong>Breed:</strong> Labrador</p>
        <p className="mb-2"><strong>Age:</strong> 2 years</p>
        <p className="mb-4">
          Friendly and playful dog looking for a loving home.
        </p>

        {isAuthenticated && (
         <button
  onClick={() => navigate(`/apply/${pet._id}`)}
  className="bg-green-600 text-white px-6 py-2 rounded-xl"
>
  Apply for Adoption
</button>
        )}
      </div>
    </div>
  );
};

export default PetDetails;
