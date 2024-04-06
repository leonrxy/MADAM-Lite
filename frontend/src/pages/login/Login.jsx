import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaBolt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Logo from '../../assets/Logo.svg'; // Adjust the path based on the actual location


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        // Mengatur waktu kedaluwarsa token
        const expiration = new Date();
        expiration.setDate(expiration.getDate() + 1); // Token berlaku selama 1 hari
        const tokenData = { value: token, expiresAt: expiration.getTime() };

        // Simpan token di sessionStorage
        sessionStorage.setItem("token", JSON.stringify(tokenData));
        navigateTo("/dashboard");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
           <h3 className="text-center mb-4 flex items-center justify-center space-x-1">
            <img src={Logo} alt="Logo" className="h-10" />
            </h3>
          <h2 className="text-3xl font-bold mb-4 text-left">Login</h2>
          <p className="text-base text-left mb-4 text-gray-600">
            Welcome! Please enter your profile
          </p>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-black text-sm font-normal mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-black text-sm placeholder-black placeholder-opacity-50 leading-tight focus:outline-none focus:ring-1 focus:ring-gray-300"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-black text-sm font-normal mb-2"
            >
              Password
            </label>
            <div className="flex">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:ring-1 focus:ring-gray-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="ml-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <input
              type="checkbox"
              id="remember"
              className="mr-2 leading-tight"
            />
            <label htmlFor="remember" className="text-sm text-gray-700">
              Remember Me
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
