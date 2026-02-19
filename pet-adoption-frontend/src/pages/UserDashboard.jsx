import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyApplications } from "../features/adoptions/adoptionSlice";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { applications } = useSelector(
    (state) => state.adoptions
  );

  useEffect(() => {
    dispatch(getMyApplications());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-white p-10">
      <h1 className="text-3xl font-bold mb-8">
        My Applications 🐾
      </h1>

      {applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        <div className="bg-gray-50 rounded-2xl shadow p-6">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
