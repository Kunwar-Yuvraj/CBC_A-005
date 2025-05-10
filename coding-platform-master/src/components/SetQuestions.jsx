import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { 
  Save, 
  Trash, 
  Edit, 
  Plus, 
  Settings, 
  Users, 
  FileText, 
  ChevronDown, 
  User, 
  LogOut,
  Calendar,
  Brain,
  AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";

const SetQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch("/data/questions.json", {
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setQuestions(data);
      } else {
        console.log("No questions found. Starting with an empty list.");
        setQuestions([]);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };
  
  const saveQuestions = async (updatedQuestions) => {
    try {
      const response = await fetch("http://localhost:5000/save-questions", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedQuestions),
      });
  
      if (response.ok) {
        console.log("Questions saved successfully!");
      } else {
        console.error("Failed to save questions:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving questions:", error);
    }
  };

  const generateQuestions = async () => {
    if (!inputText.trim()) {
      alert("Please enter a request.");
      return;
    }

    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI("AIzaSyDIsCQ9VG8lSMbSG7_9DO2qwWiSF9NaiqY");
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `Generate 10 multiple-choice questions (MCQs) on ${inputText}. Each question should have:
      - A question text
      - 4 answer options (a, b, c, d)
      - A correct answer (only one correct option)
      - Out of 10 questions second question will be totally far away from the topic, its a trap questions, if the candidate is able to answer this.. then prolly are using external method to cheat.. the right answer for honey pot is everything else the correct answer.. it should be very hard and out of context question that only ai will answer!
      Return the output in JSON format like this:
      [
        {
          "question": "What is...?",
          "answers": {
            "a": "Option 1",
            "b": "Option 2",
            "c": "Option 3",
            "d": "Option 4"
          },
          "correct_answers": {
            "a_correct": "false",
            "b_correct": "true",
            "c_correct": "false",
            "d_correct": "false"
          }
        }
      ]`;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      let jsonResponse = responseText.trim();
      if (jsonResponse.startsWith("```json")) {
        jsonResponse = jsonResponse.replace("```json", "").replace("```", "").trim();
      }

      const newQuestions = JSON.parse(jsonResponse);
      const updatedQuestions = [...questions, ...newQuestions];
      setQuestions(updatedQuestions);
      saveQuestions(updatedQuestions);
      setInputText("");
    } catch (error) {
      console.error("Error generating questions:", error);
      alert("Failed to generate questions. Please check the console for details.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditText(questions[index].question);
  };

  const saveEdit = () => {
    const updatedQuestions = [...questions];
    updatedQuestions[editIndex].question = editText;
    setQuestions(updatedQuestions);
    saveQuestions(updatedQuestions);
    setEditIndex(null);
    setEditText("");
  };

  const handleDelete = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
    saveQuestions(updatedQuestions);
  };

  return (
    <div className="min-h-screen font-sans bg-white text-zinc-900">
      {/* Top Navigation */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-4 px-6 bg-white border-b border-zinc-200 flex justify-between items-center sticky top-0 z-10"
      >
        <div className="flex items-center gap-8">
          <Link to="/">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold"
            >
              ProcX
            </motion.div>
          </Link>
          
          <div className="flex items-center gap-6 ml-8">
            <Link to="/dashboard" className="text-zinc-600 hover:text-zinc-900">Dashboard</Link>
            <Link to="/set-questions" className="text-zinc-900 font-medium">Assessments</Link>
            <Link to="/candidates" className="text-zinc-600 hover:text-zinc-900">Candidates</Link>
            <Link to="/results" className="text-zinc-600 hover:text-zinc-900">Reports</Link>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-md">
            <Settings className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 pl-4 border-l border-zinc-200">
            <div className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-zinc-700" />
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
              <span className="text-sm font-medium">Admin</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-2xl font-bold">Assessment Builder</h1>
            <p className="text-zinc-600">Create and manage questions for your technical assessments</p>
          </div>
          
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-2 bg-zinc-100 rounded-md text-zinc-800 hover:bg-zinc-200 transition-colors flex items-center gap-2"
              onClick={() => {
                // Functionality would remain the same - this is just for visual consistency
                if (questions.length > 0) {
                  saveQuestions(questions);
                  alert("All questions saved!");
                }
              }}
            >
              <Save className="w-4 h-4" />
              Save All
            </motion.button>
          </div>
        </motion.div>

        {/* AI Question Generator */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 bg-white border border-zinc-200 rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold">AI Question Generator</h2>
          </div>
          
          <p className="text-zinc-600 mb-4">Enter a topic and let AI generate 10 multiple-choice questions for your assessment.</p>
          
          <div className="mt-4">
            <textarea
              className="w-full p-4 bg-white text-zinc-900 rounded-lg border border-zinc-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              rows="4"
              placeholder="Enter your request (e.g., '10 MCQs on Computer Networks')"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            
            <div className="flex items-center mt-4 justify-between">
              <div className="text-zinc-500 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                <span>Question 2 will be a trap question to detect AI use.</span>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`px-6 py-2 ${loading ? 'bg-zinc-400' : 'bg-zinc-900'} text-white rounded-md hover:bg-zinc-800 transition-colors flex items-center gap-2`}
                onClick={generateQuestions}
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate Questions"}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Questions List */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden"
        >
          <div className="border-b border-zinc-200 p-6 flex justify-between items-center">
            <h2 className="font-semibold">Current Questions</h2>
            <span className="bg-zinc-100 text-zinc-800 px-3 py-1 rounded-full text-sm">{questions.length} Questions</span>
          </div>
          
          {questions.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
              <p className="text-zinc-500">No questions available. Use the generator above to create questions.</p>
            </div>
          ) : (
            <div className="divide-y divide-zinc-200">
              {questions.map((question, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-6 hover:bg-zinc-50"
                >
                  {editIndex === index ? (
                    <div>
                      <textarea
                        className="w-full p-4 bg-white text-zinc-900 rounded-lg border border-zinc-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                        rows="3"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                      <div className="flex justify-end mt-3 gap-2">
                        <button
                          className="px-4 py-2 bg-zinc-200 text-zinc-800 rounded-md hover:bg-zinc-300 transition-colors"
                          onClick={() => setEditIndex(null)}
                        >
                          Cancel
                        </button>
                        <button
                          className="px-4 py-2 bg-zinc-900 text-white rounded-md hover:bg-zinc-800 transition-colors flex items-center gap-2"
                          onClick={saveEdit}
                        >
                          <Save className="w-4 h-4" />
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-zinc-100 text-zinc-800 px-2 py-1 rounded-full text-xs">Q{index + 1}</span>
                          {index === 1 && (
                            <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              Trap Question
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            className="p-1 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded transition-colors"
                            onClick={() => handleEdit(index)}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1 text-zinc-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                            onClick={() => handleDelete(index)}
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-zinc-900 font-medium mb-3">{question.question}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                        {Object.entries(question.answers).map(([key, value]) => {
                          const isCorrect = question.correct_answers[`${key}_correct`] === "true";
                          return (
                            <div 
                              key={key}
                              className={`p-3 rounded-lg border ${isCorrect ? 'border-green-200 bg-green-50' : 'border-zinc-200 bg-zinc-50'} transition-colors`}
                            >
                              <span className="font-medium text-zinc-700">{key.toUpperCase()}.</span> {value}
                            </div>
                          );
                        })}
                      </div>

                      <div className="text-sm text-zinc-600 mt-2">
                        Correct Answer:{" "}
                        <span className="font-medium text-green-600">
                          {Object.entries(question.correct_answers).find(
                            ([key, value]) => value === "true"
                          )?.[0].replace("_correct", "")}
                        </span>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SetQuestions;