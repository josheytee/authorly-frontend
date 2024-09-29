import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { apiFetch } from "../../utils/api"; // Import the apiFetch utility

// Helper function to set a cookie with expiration time
function setCookie(name, value, minutes) {
  const date = new Date();
  date.setTime(date.getTime() + minutes * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

export default function Login() {
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState(""); // State to hold general error messages

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const data = await apiFetch("/api/login", "POST", null, formData);

      // Assuming the API returns a token upon successful login
      setCookie("token", data.token, 60); // Set the token in a cookie for 60 minutes
      setToken(data.token); // Set token in the context
      navigate("/");
    } catch (error) {
      // Handle validation errors
      if (error.message.includes("validation")) {
        setErrors(error.errors);
      } else {
        // Set the general error message (e.g., incorrect email or password)
        setGeneralError(error.message);
        console.error("Error logging in:", error);
      }
    }
  }

  return (
    <>
      <h1 className="title">Login to your account</h1>

      <form onSubmit={handleLogin} className="w-1/2 mx-auto space-y-6">
        {/* Display general error message */}
        {generalError && <p className="error">{generalError}</p>}

        <div>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && <p className="error">{errors.email[0]}</p>}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {errors.password && <p className="error">{errors.password[0]}</p>}
        </div>

        <button className="primary-btn">Login</button>
      </form>
    </>
  );
}
