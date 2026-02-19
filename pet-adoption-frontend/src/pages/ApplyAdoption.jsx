import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  applyAdoption,
  resetAdoptionState,
} from "../features/adoptions/adoptionSlice";

const ApplyAdoption = () => {
  const { id } = useParams(); // petId from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector(
    (state) => state.adoptions
  );

  const { isAuthenticated } = useSelector(
    (state) => state.auth
  );

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: `/apply/${id}` },
      });
    }
  }, [isAuthenticated, navigate, id]);

  /* ================= SUCCESS REDIRECT ================= */
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(resetAdoptionState());
        navigate("/dashboard");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [success, dispatch, navigate]);

  /* ================= APPLY HANDLER ================= */
  const handleApply = () => {
    dispatch(applyAdoption(id));
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-50 p-8 rounded-3xl shadow-xl">

        <h2 className="text-2xl font-bold mb-4 text-center">
          Confirm Adoption 🐾
        </h2>

        <p className="text-gray-600 mb-6 text-center">
          Are you sure you want to apply for this pet?
        </p>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-100 text-green-600 p-3 rounded-lg mb-4 text-sm text-center">
            Application submitted successfully!
          </div>
        )}

        {/* Apply Button */}
        <button
          onClick={handleApply}
          disabled={loading}
          className={`w-full p-3 rounded-xl text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Applying..." : "Apply for Adoption"}
        </button>

        {/* Cancel Button */}
        <button
          onClick={() => navigate(-1)}
          className="w-full mt-3 border border-gray-300 p-3 rounded-xl hover:bg-gray-100"
        >
          Cancel
        </button>

      </div>
    </div>
  );
};

export default ApplyAdoption;
