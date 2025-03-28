import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store user data in localStorage or context
      localStorage.setItem('user', JSON.stringify(data.user));
      window.dispatchEvent(new Event("storage"));
      navigate("/");
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
    }
  };

  return (
    <div className="bg-white min-h-screen flex justify-center">
      <div className="w-full max-w-md pt-32">
        <h2 className="text-2xl font-semibold mb-6 text-center">Welcome Back to StudyGram!</h2>
        {error && (
          <div className="mb-4 p-2 bg-red-50 text-red-600 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button type="submit" className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold p-2 rounded">
            Login
          </button>
          <div className="mt-4 text-center">
            <span className="text-gray-700">Don't have an account? </span>
            <a href="/signup" className="text-gray-500 underline hover:text-gray-600">
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;