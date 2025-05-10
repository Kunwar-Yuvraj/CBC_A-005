import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Begin = () => {
  const navigate = useNavigate();
  const [name, setName] = useState(""); // State to store the user's name

  const handleStartTest = () => {
    if (name.trim() === "") {
      alert("Please enter your name to proceed."); // Validation to ensure the name is not empty
      return;
    }
    navigate("/exam", { state: { name } }); // Pass the name to the next route
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white">
      {/* Content Container */}
      <div className="relative max-w-2xl mx-4 text-black text-center p-8 bg-gray-100 rounded-xl shadow-md border border-gray-300">
        <h1 className="text-3xl font-bold mb-6">Online Exam Instructions</h1>
        <ul className="list-disc list-inside text-lg mb-6 text-left space-y-3">
          <li>
            Ensure a stable and secure internet connection for the duration of
            the exam.
          </li>
          <li>
            Avoid refreshing or navigating away from the exam window, as this
            will trigger a monitoring alert.
          </li>
          <li>
            You are under active surveillance. Unauthorized actions will result
            in disqualification.
          </li>
          <li>Remain in a quiet, isolated environment to maintain focus.</li>
          <li>Audio and video will be monitored</li>
          <li>The test will begin when you click "Start Test."</li>
        </ul>

        {/* Input for the user's name */}
        <div className="mb-6">
          <label htmlFor="name" className="block text-lg font-medium mb-2">
            Enter your name as a digital signature:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Your Name"
            required
          />
        </div>

        {/* Start Test Button */}
        <button
          onClick={handleStartTest}
          className="text-lg font-medium bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition duration-300"
        >
          Start Test
        </button>
      </div>
    </div>
  );
};

export default Begin;