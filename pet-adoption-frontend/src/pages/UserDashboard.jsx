const UserDashboard = () => {
  const applications = [
    { id: 1, pet: "Buddy", status: "Pending" },
    { id: 2, pet: "Milo", status: "Approved" },
  ];

  return (
    <div className="min-h-screen bg-white p-10">
      <h1 className="text-3xl font-bold mb-8">My Applications 🐾</h1>

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
              <tr key={app.id} className="border-b">
                <td className="py-3">{app.pet}</td>
                <td>{app.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;
