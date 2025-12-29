import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const userId = JSON.parse(atob(token.split(".")[1])).id;

  // Fetch courses
  useEffect(() => {
    fetch("https://edtech-xdna.onrender.com/api/courses", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      });
  }, [token]);

  // Fetch progress
  useEffect(() => {
    fetch("http://localhost:5000/api/progress", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setProgress);
  }, [token]);

  const isEnrolled = (course) =>
    course.students?.includes(userId);

  const isCompleted = (courseId) =>
    progress.some(
      (p) => p.course._id === courseId && p.completed === true
    );

  const enroll = async (id) => {
    await fetch(`http://localhost:5000/api/courses/${id}/enroll`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });

    setCourses((prev) =>
      prev.map((c) =>
        c._id === id
          ? { ...c, students: [...(c.students || []), userId] }
          : c
      )
    );
  };

  const markCompleted = async (id) => {
    await fetch(`http://localhost:5000/api/progress/${id}/complete`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });

    setProgress((prev) => [
      ...prev,
      { course: { _id: id }, completed: true },
    ]);
  };

  return (
    <>
      <Navbar />

      <div className="p-6 text-white max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>

        {loading && <p className="text-gray-400">Loading courses...</p>}

        {!loading && courses.length === 0 && (
          <p className="text-gray-400">No courses available</p>
        )}

        {courses.map((course) => {
          const enrolled = isEnrolled(course);
          const completed = isCompleted(course._id);

          return (
            <div
              key={course._id}
              className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl mb-6 shadow-lg"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">{course.title}</h2>
                  <p className="text-gray-300 mt-1">
                    {course.description}
                  </p>

                  {completed && (
                    <span className="inline-block mt-2 text-sm text-green-400">
                      ✔ Completed
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                {!enrolled && (
                  <button
                    onClick={() => enroll(course._id)}
                    className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded"
                  >
                    Enroll
                  </button>
                )}

                {enrolled && !completed && (
                  <button
                    onClick={() => markCompleted(course._id)}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded"
                  >
                    Mark Completed
                  </button>
                )}

                {enrolled && completed && (
                  <button
                    disabled
                    className="bg-gray-600 px-4 py-1 rounded cursor-not-allowed"
                  >
                    Completed
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}


