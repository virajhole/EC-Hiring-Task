import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://intern-task-api.bravo68web.workers.dev/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSnackbarSeverity("success");
        setSnackbarMessage("Registration successful");
        setSnackbarOpen(true);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage(data.message || "Registration failed");
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Error during registration");
      setSnackbarOpen(true);
      console.error("Error during registration", error);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="bg-slate-300 min-h-screen flex justify-center items-center bg-cover bg-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

          <div className="relative">
            <label className="text-sm font-semibold block mb-2">Email</label>
            <input
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Type your email"
              required
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
              <i className="fas fa-user"></i>
            </span>
          </div>

          <div className="relative">
            <label className="text-sm font-semibold block mb-2">Password</label>
            <input
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type your password"
              required
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
              <i className="fas fa-lock"></i>
            </span>
          </div>

          <div>
            <button
              className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300"
              type="submit"
            >
              Register
            </button>
          </div>

          <div className="text-center mt-8">
            <span className="text-sm text-gray-500">
              Already have an account?
            </span>
            <button
              type="button"
              onClick={handleLogin}
              className="text-blue-500 hover:underline ml-2"
            >
              Login
            </button>
          </div>
        </form>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
