import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Pets from "./pages/Pets";
import PetDetails from "./pages/PetDetails";
import Dashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ApplyAdoption from "./pages/ApplyAdoption";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
              <Navbar />

        <Routes>

          {/* ================= VISITOR ================= */}
          <Route path="/" element={<Pets />} />
          <Route path="/pets/:id" element={<PetDetails />} />

          {/* ================= AUTH ================= */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ================= USER ================= */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="user">
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/apply/:id"
            element={
              <ProtectedRoute role="user">
                <ApplyAdoption />
              </ProtectedRoute>
            }
          />

          {/* ================= ADMIN ================= */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* ================= 404 ================= */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
