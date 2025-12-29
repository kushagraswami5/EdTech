import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="bg-gray-950 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-white">EdTech Platform</h1>

      <button
        onClick={logout}
        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
      >
        Logout
      </button>
    </nav>
  );
}
