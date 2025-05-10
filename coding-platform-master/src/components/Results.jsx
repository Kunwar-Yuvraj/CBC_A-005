import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Send, Settings, ChevronDown, ArrowLeft, Printer, RefreshCw, Trash2, ChevronRight } from 'lucide-react';



// Separate component for displaying optimal solutions
const OptimalSolutionDisplay = ({ question, submittedCode, language }) => {
  return (
    <div className="mt-6 p-6 bg-zinc-50 rounded-lg">
      <h4 className="text-xl font-semibold mb-4 text-zinc-900">
        Optimal Solution Reference
      </h4>

      <div className="space-y-6">
        {/* Complexity Analysis */}
        <div className="mb-4">
          <h5 className="font-medium text-zinc-800 mb-2">
            Complexity Analysis:
          </h5>
          <div className="bg-white p-4 rounded-lg border border-zinc-200">
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <span className="text-zinc-600">Time Complexity:</span>
                <span className="ml-2 font-mono font-medium">
                  {question.complexity.time}
                </span>
              </div>
              <div>
                <span className="text-zinc-600">Space Complexity:</span>
                <span className="ml-2 font-mono font-medium">
                  {question.complexity.space}
                </span>
              </div>
            </div>
            <p className="text-zinc-700">{question.complexity.explanation}</p>
          </div>
        </div>

        {/* Optimal Implementation */}
        <div>
          <h5 className="font-medium text-zinc-800 mb-2">
            Optimal Implementation:
          </h5>
          <div className="bg-zinc-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-white">
              <code>{question.optimalSolution[language]}</code>
            </pre>
          </div>
        </div>

        {/* Your Implementation */}
        <div>
          <h5 className="font-medium text-zinc-800 mb-2">
            Your Implementation:
          </h5>
          <div className="bg-zinc-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-white">
              <code>{submittedCode}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

// Performance Badge component
const PerformanceBadge = ({ performance }) => {
  const badges = {
    excellent: "bg-green-100 text-green-800 border-green-200",
    good: "bg-blue-100 text-blue-800 border-blue-200",
    fair: "bg-yellow-100 text-yellow-800 border-yellow-200",
    poor: "bg-red-100 text-red-800 border-red-200",
  };

  const getPerformanceLevel = (score) => {
    if (score >= 90) return { level: "excellent", text: "Excellent" };
    if (score >= 70) return { level: "good", text: "Good" };
    if (score >= 50) return { level: "fair", text: "Fair" };
    return { level: "poor", text: "Needs Improvement" };
  };

  const { level, text } = getPerformanceLevel(performance);

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium border ${badges[level]}`}
    >
      {text}
    </span>
  );
};

// Component to display a single result history item
const ResultHistoryItem = ({ result, isExpanded, toggleExpand, onDelete }) => {
  const calculateTotalPercentage = () => {
    const totalScore = result.mcq.score + result.coding.score;
    const totalPossible = result.mcq.total + result.coding.total;
    return ((totalScore / totalPossible) * 100).toFixed(1);
  };

  const getGrade = (percentage) => {
    if (percentage >= 90) return { grade: "A", color: "text-green-600" };
    if (percentage >= 70) return { grade: "B", color: "text-blue-600" };
    if (percentage >= 50) return { grade: "C", color: "text-yellow-600" };
    if (percentage >= 30) return { grade: "D", color: "text-orange-600" };
    return { grade: "F", color: "text-red-600" };
  };

  const totalPercentage = calculateTotalPercentage();
  const { grade, color } = getGrade(totalPercentage);
  const date = new Date(result.timestamp).toLocaleString();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border border-zinc-200 rounded-lg overflow-hidden mb-4 hover:shadow-sm transition-all"
    >
      {/* Header - Always visible */}
      <div 
        className="p-4 flex items-center justify-between cursor-pointer"
        onClick={toggleExpand}
      >
        <div className="flex items-center gap-4">
          <div className="font-medium text-lg text-zinc-900">{result.name}</div>
          <div className="text-zinc-600 text-sm">{date}</div>
          <PerformanceBadge performance={totalPercentage} />
        </div>
        <div className="flex items-center gap-4">
          <div className={`text-xl font-bold ${color}`}>
            {totalPercentage}% ({grade})
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDelete(result.timestamp);
            }}
            className="p-2 text-zinc-400 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <div className="text-zinc-500">
            {isExpanded ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </div>
        </div>
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div className="border-t p-6 bg-zinc-50">
          {/* Status/Reason */}
          <div className="mb-6 p-4 bg-white border border-zinc-200 rounded-lg">
            <p className="text-zinc-700">
              <span className="font-medium">Status:</span> {result.reason}
            </p>
          </div>

          {/* Section Scores */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* MCQ Section */}
            <div className="border border-zinc-200 rounded-lg p-6 bg-white">
              <h3 className="text-xl font-semibold mb-4 text-zinc-900">
                Multiple Choice Questions
              </h3>
              <div className="space-y-4">
                <div className="text-center p-4 bg-zinc-50 rounded-lg">
                  <div className="text-sm text-zinc-600 mb-1">Score</div>
                  <div className="text-2xl font-bold text-zinc-900">
                    {result.mcq.score}/{result.mcq.total}
                  </div>
                </div>
                <div className="text-center p-4 bg-zinc-50 rounded-lg">
                  <div className="text-sm text-zinc-600 mb-1">Percentage</div>
                  <div className={`text-2xl font-bold ${getGrade((result.mcq.score / result.mcq.total) * 100).color}`}>
                    {((result.mcq.score / result.mcq.total) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>

            {/* Coding Section */}
            <div className="border border-zinc-200 rounded-lg p-6 bg-white">
              <h3 className="text-xl font-semibold mb-4 text-zinc-900">
                Coding Questions
              </h3>
              <div className="space-y-4">
                <div className="text-center p-4 bg-zinc-50 rounded-lg">
                  <div className="text-sm text-zinc-600 mb-1">
                    Test Cases Passed
                  </div>
                  <div className="text-2xl font-bold text-zinc-900">
                    {result.coding.score}/{result.coding.total}
                  </div>
                </div>
                <div className="text-center p-4 bg-zinc-50 rounded-lg">
                  <div className="text-sm text-zinc-600 mb-1">Percentage</div>
                  <div className={`text-2xl font-bold ${getGrade((result.coding.score / result.coding.total) * 100).color}`}>
                    {((result.coding.score / result.coding.total) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coding Solutions Review */}
          {result.coding.answers && Object.keys(result.coding.answers).length > 0 && (
            <div className="border-t pt-8">
              <h3 className="text-2xl font-semibold mb-6 text-zinc-900">
                Code Review & Optimization
              </h3>

              {Object.entries(result.coding.answers).map(
                ([index, submission]) => {
                  const question = result.questions[index];
                  return (
                    <div key={index} className="mb-8 p-6 border border-zinc-200 rounded-lg bg-white">
                      <h4 className="text-xl font-semibold mb-4 text-zinc-900">
                        {question.title}
                      </h4>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="p-4 bg-zinc-50 rounded-lg">
                          <div className="text-sm text-zinc-600">
                            Tests Passed
                          </div>
                          <div className="text-xl font-bold text-zinc-900">
                            {submission.testsPassed}/{submission.totalTests}
                          </div>
                        </div>

                        {/* Optimization Status */}
                        <div
                          className={`p-4 rounded-lg ${
                            submission.optimization?.optimal
                              ? "bg-green-50"
                              : "bg-yellow-50"
                            }`}
                        >
                          <div className="text-sm text-zinc-600">
                            Solution Efficiency
                          </div>
                          <div className="text-sm mt-1">
                            {submission.optimization?.optimal
                              ? "✓ Optimal Solution"
                              : `⚠ ${submission.optimization?.reason}`}
                          </div>
                        </div>
                      </div>

                      {/* Show optimal solution if the submitted solution isn't optimal */}
                      {!submission.optimization?.optimal &&
                        question.optimalSolution && (
                          <OptimalSolutionDisplay
                            question={question}
                            submittedCode={submission.code}
                            language={submission.language}
                          />
                        )}
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

const Results = () => {
  const location = useLocation();
  const name = location.state?.name || "Unknown";
  const [currentResults, setCurrentResults] = useState(null);
  const [reason, setReason] = useState("");
  const [allResults, setAllResults] = useState([]);
  const [expandedResult, setExpandedResult] = useState(null);
  const [viewMode, setViewMode] = useState('current'); // 'current' or 'history'
  const navigate = useNavigate();

  // Load current result and save to history
  useEffect(() => {
    const savedResults = sessionStorage.getItem("examResults");
    const savedReason = sessionStorage.getItem("examEndReason");
    const savedQuestions = sessionStorage.getItem("codingQuestions");
  
    if (savedResults) {
      const resultData = JSON.parse(savedResults);
      const questionsData = JSON.parse(savedQuestions || '{}');
  
      // Create current result object
      const currentResult = {
        ...resultData,
        questions: questionsData,
        reason: savedReason || "Exam completed",
        name: name,
        timestamp: new Date().toISOString(),
      };
  
      setCurrentResults(currentResult);
      setReason(savedReason || "Exam completed");
  
      // Load existing results from localStorage
      const existingResults = JSON.parse(localStorage.getItem("examHistoryResults") || "[]");
  
      // Only proceed if the user is not "Unknown" and doesn't already have a result
      if (name !== "Unknown" && !existingResults.some((result) => result.name === name)) {
        const updatedResults = [currentResult, ...existingResults];
        localStorage.setItem("examHistoryResults", JSON.stringify(updatedResults));
  
        // Update state with all results
        setAllResults(updatedResults);
      } else {
        // If the user is "Unknown" or already has a result, just update the state with existing results
        setAllResults(existingResults);
      }
  
      // If the user is "Unknown", automatically switch to history view
      if (name === "Unknown") {
        setViewMode('history');
      }
    } else if (viewMode === 'current') {
      // No current results, load history or redirect
      const existingResults = JSON.parse(localStorage.getItem("examHistoryResults") || "[]");
      if (existingResults.length > 0) {
        setAllResults(existingResults);
        setViewMode('history');
      } else {
        navigate("/");
      }
    }
  }, [navigate, name, viewMode]);

  // Load history from localStorage
  useEffect(() => {
    const existingResults = JSON.parse(localStorage.getItem("examHistoryResults") || "[]");
    setAllResults(existingResults);
  }, []);

  const toggleResultExpand = (resultId) => {
    if (expandedResult === resultId) {
      setExpandedResult(null);
    } else {
      setExpandedResult(resultId);
    }
  };

  const calculateMCQPercentage = (result) => {
    return ((result.mcq.score / result.mcq.total) * 100).toFixed(1);
  };

  const calculateCodingPercentage = (result) => {
    return ((result.coding.score / result.coding.total) * 100).toFixed(1);
  };

  const calculateTotalPercentage = (result) => {
    const totalScore = result.mcq.score + result.coding.score;
    const totalPossible = result.mcq.total + result.coding.total;
    return ((totalScore / totalPossible) * 100).toFixed(1);
  };

  const getGrade = (percentage) => {
    if (percentage >= 90) return { grade: "A", color: "text-green-600" };
    if (percentage >= 70) return { grade: "B", color: "text-blue-600" };
    if (percentage >= 50) return { grade: "C", color: "text-yellow-600" };
    if (percentage >= 30) return { grade: "D", color: "text-orange-600" };
    return { grade: "F", color: "text-red-600" };
  };

  // Toggle between current result and history
  const handleViewModeChange = (mode) => {
    if (mode === 'current') {
      // If switching to "Current" view, show the latest result only if it exists
      const latestResult = allResults[0]; // Latest result is the first in the array
      if (latestResult) {
        setCurrentResults(latestResult);
      } else {
        // If no results exist, stay in history view
        setViewMode('history');
        return;
      }
    }
    setViewMode(mode);
  };

  // Clear current results and exam data
  const clearCurrentExam = () => {
    sessionStorage.removeItem("examResults");
    sessionStorage.removeItem("examEndReason");
    sessionStorage.removeItem("codingQuestions");
  };

  // Delete a specific result from history
  const deleteResult = (timestamp) => {
    const updatedResults = allResults.filter(result => result.timestamp !== timestamp);
    setAllResults(updatedResults);
    localStorage.setItem("examHistoryResults", JSON.stringify(updatedResults));
    
    // If we're deleting the current expanded result, close it
    if (expandedResult === timestamp) {
      setExpandedResult(null);
    }
  };

  // Clear all history
  const clearAllHistory = () => {
    if (window.confirm("Are you sure you want to delete all exam history? This cannot be undone.")) {
      localStorage.removeItem("examHistoryResults");
      setAllResults([]);
      setExpandedResult(null);
      
      // If we're in history view with no results, go back to home
      if (viewMode === 'history' && !currentResults) {
        navigate("/");
      }
    }
  };

  if (name !== "Unknown") {
    return (
      <div className="min-h-screen bg-white flex flex-col font-sans text-zinc-900">
        {/* Top Navigation */}
        <motion.nav 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="py-4 px-6 bg-white border-b border-zinc-200 flex justify-between items-center sticky top-0 z-10"
        >
          <div className="flex items-center gap-8">
            <div className="text-xl font-bold">ProcX</div>
            <div className="flex items-center gap-6 ml-8">
              <a href="/dashboard" className="text-zinc-600 hover:text-zinc-900">Dashboard</a>
              <a href="/set-questions" className="text-zinc-600 hover:text-zinc-900">Assessments</a>
              <a href="/candidates" className="text-zinc-600 hover:text-zinc-900">Candidates</a>
              <a href="/results" className="text-zinc-900 font-medium">Reports</a>
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

        <div className="flex-grow flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-xl px-6"
          >
            <h1 className="text-4xl font-bold text-zinc-900 mb-6">
              Thank You for Taking the Test, {name}!
            </h1>
            <p className="text-xl text-zinc-700 mb-8">
              We appreciate your participation. Your results will be reviewed and you will be notified shortly.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/")}
              className="bg-zinc-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-zinc-800 transition-colors"
            >
              Return to Home
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!currentResults && viewMode === 'current' && allResults.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col font-sans text-zinc-900">
        {/* Top Navigation */}
        <motion.nav 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="py-4 px-6 bg-white border-b border-zinc-200 flex justify-between items-center sticky top-0 z-10"
        >
          <div className="flex items-center gap-8">
            <div className="text-xl font-bold">ProcX</div>
            <div className="flex items-center gap-6 ml-8">
              <a href="/dashboard" className="text-zinc-600 hover:text-zinc-900">Dashboard</a>
              <a href="/set-questions" className="text-zinc-600 hover:text-zinc-900">Assessments</a>
              <a href="/candidates" className="text-zinc-600 hover:text-zinc-900">Candidates</a>
              <a href="/results" className="text-zinc-900 font-medium">Reports</a>
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

        <div className="flex-grow flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="text-xl font-semibold text-zinc-600">
              No results available. Please take an exam first.
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/")}
              className="mt-6 bg-zinc-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-zinc-800 transition-colors"
            >
              Return to Home
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-zinc-900">
      {/* Top Navigation */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-4 px-6 bg-white border-b border-zinc-200 flex justify-between items-center sticky top-0 z-10"
      >
        <div className="flex items-center gap-8">
          <div className="text-xl font-bold">ProcX</div>
          <div className="flex items-center gap-6 ml-8">
            <a href="/dashboard" className="text-zinc-600 hover:text-zinc-900">Dashboard</a>
            <a href="/set-questions" className="text-zinc-600 hover:text-zinc-900">Assessments</a>
            <a href="/candidates" className="text-zinc-600 hover:text-zinc-900">Candidates</a>
            <a href="/results" className="text-zinc-900 font-medium">Reports</a>
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
      <div className="max-w-4xl mx-auto px-6 py-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl font-bold mb-8 text-zinc-900">
            {viewMode === 'current' ? `Exam Results for ${name}` : 'Exam History'}
          </h1>

          {/* Conditionally render the toggle button */}
          {name !== "Unknown" && (
            <div className="flex justify-start mb-8">
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  onClick={() => handleViewModeChange('current')}
                  disabled={!currentResults}
                  className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
                    viewMode === 'current'
                      ? 'bg-zinc-900 text-white border-zinc-900'
                      : 'bg-white text-zinc-700 hover:bg-zinc-50 border-zinc-200'
                  }`}
                >
                  Current Result
                </button>
                <button
                  type="button"
                  onClick={() => handleViewModeChange('history')}
                  className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${
                    viewMode === 'history'
                      ? 'bg-zinc-900 text-white border-zinc-900'
                      : 'bg-white text-zinc-700 hover:bg-zinc-50 border-zinc-200'
                  }`}
                >
                  History
                </button>
              </div>
            </div>
          )}

          {viewMode === 'current' && currentResults ? (
            <div className="space-y-8">
              {/* Current Exam Result content */}
              {/* Exam End Reason */}
              {reason && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-6 p-4 bg-zinc-50 rounded-lg border border-zinc-200"
                >
                  <p className="text-zinc-700">
                    <span className="font-medium">Status:</span> {reason}
                  </p>
                </motion.div>
              )}

              {/* Overall Score */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center p-6 bg-zinc-50 rounded-lg border border-zinc-200"
              >
                <h2 className="text-2xl font-semibold mb-4 text-zinc-900">
                  Overall Performance
                </h2>
                <div
                  className={`text-4xl font-bold mb-2 ${
                    getGrade(calculateTotalPercentage(currentResults)).color
                  }`}
                >
                  {calculateTotalPercentage(currentResults)}%
                </div>
                <div className="text-xl mb-4 text-zinc-800">
                  Grade: {getGrade(calculateTotalPercentage(currentResults)).grade}
                </div>
                <PerformanceBadge performance={calculateTotalPercentage(currentResults)} />
              </motion.div>

              {/* Section Scores */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* MCQ Section */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="border border-zinc-200 rounded-lg p-6 bg-white"
                >
                  <h3 className="text-xl font-semibold mb-4 text-zinc-900">
                    Multiple Choice Questions
                  </h3>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-zinc-50 rounded-lg">
                      <div className="text-sm text-zinc-600 mb-1">Score</div>
                      <div className="text-2xl font-bold text-zinc-900">
                        {currentResults.mcq.score}/{currentResults.mcq.total}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-zinc-50 rounded-lg">
                      <div className="text-sm text-zinc-600 mb-1">Percentage</div>
                      <div
                        className={`text-2xl font-bold ${
                          getGrade(calculateMCQPercentage(currentResults)).color
                        }`}
                      >
                        {calculateMCQPercentage(currentResults)}%
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Coding Section */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="border border-zinc-200 rounded-lg p-6 bg-white"
                >
                  <h3 className="text-xl font-semibold mb-4 text-zinc-900">
                    Coding Questions
                  </h3>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-zinc-50 rounded-lg">
                      <div className="text-sm text-zinc-600 mb-1">
                        Test Cases Passed
                      </div>
                      <div className="text-2xl font-bold text-zinc-900">
                        {currentResults.coding.score}/{currentResults.coding.total}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-zinc-50 rounded-lg">
                      <div className="text-sm text-zinc-600 mb-1">Percentage</div>
                      <div
                        className={`text-2xl font-bold ${
                          getGrade(calculateCodingPercentage(currentResults)).color
                        }`}
                      >
                        {calculateCodingPercentage(currentResults)}%
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Coding Solutions Review */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="border-t pt-8"
              >
                <h3 className="text-2xl font-semibold mb-6 text-zinc-900">
                  Code Review & Optimization
                </h3>

                {currentResults?.coding?.answers &&
                  Object.entries(currentResults.coding.answers).map(
                    ([index, submission]) => {
                      const question = currentResults.questions[index];
                      return (
                        <motion.div 
                          key={index} 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                          className="mb-8 p-6 border border-zinc-200 rounded-lg bg-white"
                        >
                          <h4 className="text-xl font-semibold mb-4 text-zinc-900">
                            {question.title}
                          </h4>

                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="p-4 bg-zinc-50 rounded-lg">
                              <div className="text-sm text-zinc-600">
                                Tests Passed
                              </div>
                              <div className="text-xl font-bold text-zinc-900">
                                {submission.testsPassed}/{submission.totalTests}
                              </div>
                            </div>

                            {/* Optimization Status */}
                            <div
                              className={`p-4 rounded-lg ${
                                submission.optimization?.optimal
                                  ? "bg-green-50"
                                  : "bg-yellow-50"
                              }`}
                            >
                              <div className="text-sm text-zinc-600">
                                Solution Efficiency
                              </div>
                              <div className="text-sm mt-1">
                                {submission.optimization?.optimal
                                  ? "✓ Optimal Solution"
                                  : `⚠ ${submission.optimization?.reason}`}
                              </div>
                            </div>
                          </div>

                          {/* Show optimal solution if the submitted solution isn't optimal */}
                          {!submission.optimization?.optimal &&
                            question.optimalSolution && (
                              <OptimalSolutionDisplay
                                question={question}
                                submittedCode={submission.code}
                                language={submission.language}
                              />
                            )}
                        </motion.div>
                      );
                    }
                  )}
              </motion.div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* History View */}
              {allResults.length > 0 ? (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-zinc-900">Result History</h2>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={clearAllHistory}
                      className="px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded hover:bg-red-200 transition-colors"
                    >
                      Clear All History
                    </motion.button>
                  </div>

                  {allResults.map((result, index) => (
                    <div key={index} className="relative">
                      <ResultHistoryItem
                        result={result}
                        isExpanded={expandedResult === result.timestamp}
                        toggleExpand={() => toggleResultExpand(result.timestamp)}
                        onDelete={deleteResult}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-10 bg-zinc-50 rounded-lg border border-zinc-200">
                  <div className="text-xl text-zinc-500">
                    No exam history available.
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 flex justify-center space-x-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/")}
              className="bg-zinc-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-zinc-800 transition-colors"
            >
              Return to Home
            </motion.button>
            {viewMode === 'current' && currentResults && (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.print()}
                  className="bg-zinc-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-zinc-800 transition-colors"
                >
                  Print Results
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearCurrentExam}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Start New Exam
                </motion.button>
              </>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Results;