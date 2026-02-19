import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getMyApplications } from "../features/adoptions/adoptionSlice";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { applications, loading, error } = useSelector(
    (state) => state.adoptions
  );

  useEffect(() => {
    dispatch(getMyApplications());
  }, [dispatch]);

  const getStatusBadge = (status) => {
    if (status === "Approved")
      return "bg-green-100 text-green-600";
    if (status === "Rejected")
      return "bg-red-100 text-red-600";
    return "bg-yellow-100 text-yellow-600";
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white p-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            My Applications 🐾
          </h1>

          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Apply for Adoption
          </button>
        </div>

        <div className="bg-gray-50 rounded-2xl shadow p-6">

          {loading && <p>Loading...</p>}

          {error && (
            <p className="text-red-500">{error}</p>
          )}

          {!loading && applications.length === 0 && (
            <p className="text-gray-500">
              No applications found.
            </p>
          )}

          {!loading && applications.length > 0 && (
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-3">Pet</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {applications.map((app) => (
                  <tr key={app._id} className="border-b">
                    <td className="py-3">
                      {app.pet?.name}
                    </td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
