import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [students, setStudents] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch students data from JSON file
    fetch("/data/students.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch students data");
        }
        return response.json();
      })
      .then((data) => {
        setStudents(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error loading students data:", error);
        setError("Failed to load student data. Please try again later.");
        setIsLoading(false);
      });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Find student with matching credentials
    const student = students.find(
      (s) => s.username === username && s.password === password
    );

    if (student) {
      // Store student info in sessionStorage for future reference
      sessionStorage.setItem("currentStudent", JSON.stringify({
        id: student.id,
        name: student.name,
        email: student.email,
        username: student.username,
        profileImage: student.profileImage || ""
      }));
      navigate("/exam");
    } else {
      setError("Invalid username or password");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Student Login</h1>
            <p className="text-gray-600 mt-2">Sign in to continue to your exam</p>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Sign In
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Demo accounts: student1/password1, student2/password2
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;