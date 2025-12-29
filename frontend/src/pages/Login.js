import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch("https://edtech-xdna.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      if (data.role === "student") navigate("/student");
      if (data.role === "instructor") navigate("/instructor");
      if (data.role === "admin") navigate("/admin");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <div className="bg-gray-900 p-8 rounded-xl w-96">
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        <input
          className="w-full mb-3 p-2 rounded bg-gray-800"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full mb-4 p-2 rounded bg-gray-800"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded"
        >
          Login
        </button>
        <p className="text-sm text-gray-400 mt-3">
  Don’t have an account?{" "}
  <span
    className="text-indigo-400 cursor-pointer"
    onClick={() => navigate("/register")}
  >
    Register
  </span>
</p>

      </div>
    </div>
  );
}


