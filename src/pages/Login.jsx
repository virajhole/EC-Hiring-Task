import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://intern-task-api.bravo68web.workers.dev/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setSnackbarMessage("User is not registered!");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      } else {
        localStorage.setItem("token", data.token);
        setSnackbarMessage("Login successful! Redirecting to products page...");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);

        setTimeout(() => {
          navigate("/products");
        }, 1500);
      }
    } catch (error) {
      console.error("Error during login", error);
      setSnackbarMessage(" User is not registered!");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="bg-slate-300 min-h-screen flex justify-center items-center bg-cover bg-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

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
              className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
              type="submit"
            >
              Login
            </button>
          </div>

          <div className="text-center mt-8">
            <span className="text-sm text-gray-500">Create new account </span>
            <button
              type="button"
              onClick={handleSignUp}
              className="text-blue-500 hover:underline ml-2"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
