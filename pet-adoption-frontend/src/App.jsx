import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Pets from "./pages/Pets";
import PetDetails from "./pages/PetDetails";
import Dashboard from "./pages/UserDashboard";
import ApplyAdoption from "./pages/ApplyAdoption";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Routes>

          {/* ================= VISITOR ================= */}
          <Route path="/" element={<Pets />} />
          <Route path="/pets/:id" element={<PetDetails />} />
          <Route path="/apply/:id" element={<ApplyAdoption />} />

          {/* ================= AUTH ================= */}
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/register"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Register />
              )
            }
          />

          {/* ================= USER ================= */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/apply/:id"
            element={
              <ProtectedRoute>
                <ApplyAdoption />
              </ProtectedRoute>
            }
          />

          {/* ================= 404 ================= */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
