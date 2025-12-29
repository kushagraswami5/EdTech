import { useState } from "react";
import Navbar from "../components/Navbar";

export default function InstructorDashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createCourse = async () => {
    await fetch("https://edtech-xdna.onrender.com//api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, description }),
    });

    alert("Course created");
  };

  return (
  <>
  <Navbar />

    <div className="p-6 text-white">
      <h1 className="text-2xl mb-4">Instructor Dashboard</h1>

      <input
        className="block mb-2 p-2 bg-gray-800 rounded"
        placeholder="Course Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="block mb-2 p-2 bg-gray-800 rounded"
        placeholder="Course Description"
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        onClick={createCourse}
        className="bg-indigo-600 px-4 py-2 rounded"
      >
        Create Course
      </button>
    </div>
    </>
  );
}

