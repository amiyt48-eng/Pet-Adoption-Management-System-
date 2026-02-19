import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
const location = useLocation();

  const [errors, setErrors] = useState({});

  // Validation Function
  const validate = () => {
    const newErrors = {};

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  // Submit Handler
const submitHandler = async (e) => {
  e.preventDefault();

  const validationErrors = validate();
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length === 0) {
    const result = await dispatch(login(form));

    if (result.meta.requestStatus === "fulfilled") {
      const redirectPath =
        location.state?.from || "/";

      navigate(redirectPath, { replace: true });
    }
  }
};


  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="w-full max-w-md bg-gradient-to-br from-blue-50 to-pink-50 shadow-2xl rounded-3xl p-10 border border-gray-100">

          {/* Header Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-blue-100 p-4 rounded-full shadow-md text-3xl">
              🐾
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mt-4">
              Welcome Back
            </h2>
            <p className="text-gray-500 text-sm mt-2 text-center">
              Login to continue your pet adoption journey
            </p>
          </div>

          <form onSubmit={submitHandler} className="space-y-5">

            {/* Email Field */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className={`w-full p-3 rounded-xl border outline-none transition-all duration-300 ${
                  errors.email
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                className={`w-full p-3 rounded-xl border outline-none transition-all duration-300 ${
                  errors.password
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                }`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Login Button */}
          <button
  type="submit"
  className="w-full p-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all"
>
  {loading ? "Please wait..." : "Login"}
</button>


            {/* Footer */}
            <p className="text-center text-sm text-gray-500 mt-4">
              Don’t have an account?{" "}
              <span className="text-blue-600 font-medium cursor-pointer hover:underline"
              onClick={()=>navigate('/register')}>
                Sign up
              </span>
            </p>

          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
