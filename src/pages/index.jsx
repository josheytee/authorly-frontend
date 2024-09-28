import React, { useState } from "react";
import { useRouter } from "next/router";
import { login } from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Next.js hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login({
        email: email,
        password: password,
      });

      if (response.status === 200) {
        router.push("/dashboard"); // Navigate to the dashboard
      }
    } catch (err) {
      console.log(err);
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md">
        <h1 className="text-2xl font-semibold text-center">Login</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-indigo-500 rounded hover:bg-indigo-600"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
