import React from "react";
import { Link } from "react-router-dom";
import { Settings, Users, FileText, ArrowRight, ChevronDown, User, LogOut, BarChart3, Calendar, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";

const Dashboard = () => {
  // Sample data for recent candidates
  const recentCandidates = [
    { id: 1, name: "Alex Johnson", test: "Full-Stack Assessment", date: "Mar 12, 2025", status: "Completed" },
    { id: 2, name: "Sarah Williams", test: "Frontend Development", date: "Mar 14, 2025", status: "In Progress" },
    { id: 3, name: "Michael Chen", test: "Backend Development", date: "Mar 15, 2025", status: "Scheduled" },
  ];

  // Sample data for upcoming tests
  const upcomingTests = [
    { id: 1, name: "Full-Stack JavaScript", candidates: 12, date: "Mar 18, 2025" },
    { id: 2, name: "React Performance", candidates: 8, date: "Mar 20, 2025" },
    { id: 3, name: "API Architecture", candidates: 5, date: "Mar 25, 2025" },
  ];

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
            <Link to="/dashboard" className="text-zinc-900 font-medium">Dashboard</Link>
            <Link to="/set-questions" className="text-zinc-600 hover:text-zinc-900">Assessments</Link>
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

      {/* Dashboard Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-zinc-600">Welcome back! Here's what's happening with your assessments today.</p>
          </div>
          
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-2 bg-zinc-100 rounded-md text-zinc-800 hover:bg-zinc-200 transition-colors flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Schedule Test
            </motion.button>
            
            <Link to="/set-questions">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-4 py-2 bg-zinc-900 text-white rounded-md hover:bg-zinc-800 transition-colors flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                Create Assessment
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <span className="text-zinc-600 text-sm">Active Tests</span>
              <div className="w-8 h-8 bg-blue-50 rounded-md flex items-center justify-center">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">12</span>
              <span className="text-green-600 text-sm">+3 from last week</span>
            </div>
          </div>
          
          <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <span className="text-zinc-600 text-sm">Total Candidates</span>
              <div className="w-8 h-8 bg-amber-50 rounded-md flex items-center justify-center">
                <Users className="w-4 h-4 text-amber-600" />
              </div>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">248</span>
              <span className="text-green-600 text-sm">+24 this month</span>
            </div>
          </div>
          
          <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <span className="text-zinc-600 text-sm">Completion Rate</span>
              <div className="w-8 h-8 bg-green-50 rounded-md flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">87%</span>
              <span className="text-green-600 text-sm">+2% from last month</span>
            </div>
          </div>
          
          <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <span className="text-zinc-600 text-sm">Average Score</span>
              <div className="w-8 h-8 bg-indigo-50 rounded-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
                  <path d="M12 20v-6M6 20V10M18 20V4" />
                </svg>
              </div>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">72%</span>
              <span className="text-amber-600 text-sm">-3% from last month</span>
            </div>
          </div>
        </motion.div>

        {/* Main Grid - Quick Actions and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
              <div className="border-b border-zinc-200 p-6">
                <h2 className="font-semibold">Quick Actions</h2>
              </div>
              
              <div className="p-2">
                <Link to="/set-questions">
                  <motion.div 
                    whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
                    className="p-4 rounded-lg flex items-center gap-4 cursor-pointer"
                  >
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Settings className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Set Questions</h3>
                      <p className="text-zinc-600 text-sm">Create and manage assessment questions</p>
                    </div>
                    <ArrowRight className="w-4 h-4 ml-auto text-zinc-400" />
                  </motion.div>
                </Link>
                
                <Link to="/candidates">
                  <motion.div 
                    whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
                    className="p-4 rounded-lg flex items-center gap-4 cursor-pointer"
                  >
                    <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Candidates Management</h3>
                      <p className="text-zinc-600 text-sm">View and manage assessment takers</p>
                    </div>
                    <ArrowRight className="w-4 h-4 ml-auto text-zinc-400" />
                  </motion.div>
                </Link>
                
                <Link to="/results">
                  <motion.div 
                    whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
                    className="p-4 rounded-lg flex items-center gap-4 cursor-pointer"
                  >
                    <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Review Results</h3>
                      <p className="text-zinc-600 text-sm">Analyze and export test results</p>
                    </div>
                    <ArrowRight className="w-4 h-4 ml-auto text-zinc-400" />
                  </motion.div>
                </Link>
              </div>
            </div>
          </motion.div>
          
          {/* Recent Candidates and Upcoming Tests */}
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="grid grid-cols-1 gap-6">
              {/* Recent Candidates */}
              <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
                <div className="border-b border-zinc-200 p-6 flex justify-between items-center">
                  <h2 className="font-semibold">Recent Candidates</h2>
                  <Link to="/candidates" className="text-sm text-blue-600 hover:text-blue-800">View All</Link>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-zinc-50">
                        <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider py-3 px-6">Name</th>
                        <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider py-3 px-6">Test</th>
                        <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider py-3 px-6">Date</th>
                        <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider py-3 px-6">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200">
                      {recentCandidates.map(candidate => (
                        <tr key={candidate.id} className="hover:bg-zinc-50">
                          <td className="py-4 px-6">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center mr-3">
                                <User className="w-4 h-4 text-zinc-600" />
                              </div>
                              <span>{candidate.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-zinc-600">{candidate.test}</td>
                          <td className="py-4 px-6 text-zinc-600">{candidate.date}</td>
                          <td className="py-4 px-6">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              candidate.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                              candidate.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                              'bg-amber-100 text-amber-800'
                            }`}>
                              {candidate.status}
                            </span>
                          </td>
                        </tr>
                        ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  {/* Upcoming Tests */}
                  <div className="bg-[#1E1E1E] border border-[#333333] rounded-xl shadow-sm overflow-hidden mt-6">
                    <div className="border-b border-[#333333] p-6 flex justify-between items-center">
                      <h2 className="font-semibold text-[#00FF88]">Upcoming Tests</h2>
                      <Link to="/tests" className="text-sm text-[#00FF88] hover:text-[#33FF99]">View All</Link>
                    </div>
                    
                    <div className="p-4">
                      {upcomingTests.map(test => (
                        <div key={test.id} className="p-4 border-b border-[#333333] last:border-b-0 hover:bg-[#262626] transition-colors">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium text-white">{test.name}</h3>
                              <div className="flex items-center gap-4 mt-2">
                                <span className="text-[#A0A0A0] text-sm flex items-center gap-1">
                                  <Calendar className="w-3.5 h-3.5" />
                                  {test.date}
                                </span>
                                <span className="text-[#A0A0A0] text-sm flex items-center gap-1">
                                  <Users className="w-3.5 h-3.5" />
                                  {test.candidates} candidates
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <button className="p-2 text-[#A0A0A0] hover:text-[#00FF88] bg-[#0A0A0A] rounded-md transition-colors">
                                <Settings className="w-4 h-4" />
                              </button>
                              <Link to={`/tests/${test.id}`}>
                                <button className="py-2 px-4 bg-[#0A0A0A] text-[#00FF88] rounded-md hover:bg-[#1A1A1A] transition-colors text-sm">
                                  View
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Performance Summary */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8"
            >
              <div className="bg-[#1E1E1E] border border-[#333333] rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-semibold text-[#00FF88]">Performance Summary</h2>
                  <div className="flex items-center gap-2">
                    <select className="bg-[#0A0A0A] border border-[#333333] text-[#A0A0A0] rounded-md px-3 py-2 text-sm">
                      <option>Last 30 Days</option>
                      <option>Last 90 Days</option>
                      <option>This Year</option>
                    </select>
                    
                    <button className="py-2 px-4 bg-[#0A0A0A] text-[#00FF88] border border-[#333333] rounded-md hover:bg-[#1A1A1A] text-sm">
                      Export
                    </button>
                  </div>
                </div>
                
                <div className="h-64 bg-[#0A0A0A] rounded-lg border border-[#333333] p-4 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-10 h-10 text-[#00FF88] mx-auto mb-3" />
                    <p className="text-[#A0A0A0]">Performance metrics chart would appear here</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Footer */}
          <div className="border-t border-[#333333] mt-12 py-6">
            <div className="max-w-6xl mx-auto px-6">
              <div className="flex justify-between items-center">
                <div className="text-[#A0A0A0] text-sm">
                  © 2025 ProcX Assessment Platform
                </div>
                
                <div className="flex items-center gap-6">
                  <Link to="/help" className="text-[#A0A0A0] text-sm hover:text-[#00FF88]">
                    Help Center
                  </Link>
                  <Link to="/settings" className="text-[#A0A0A0] text-sm hover:text-[#00FF88]">
                    Settings
                  </Link>
                  <button className="flex items-center gap-1 text-[#A0A0A0] text-sm hover:text-[#00FF88]">
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    export default Dashboard;