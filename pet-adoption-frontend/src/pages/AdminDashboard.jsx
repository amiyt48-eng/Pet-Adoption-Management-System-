const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-white p-10">

      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard 🛠
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-gray-50 p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">Manage Pets</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl">
            Add Pet
          </button>
        </div>

        <div className="bg-gray-50 p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Adoption Applications
          </h2>
          <button className="bg-green-600 text-white px-4 py-2 rounded-xl">
            View Applications
          </button>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
