import React, { useState, useEffect } from 'react';
import { send } from 'emailjs-com';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Clock, Book, Lock, Send, Settings, ChevronDown, Plus } from 'lucide-react'; // Added missing icons

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', testDate: '', testTime: '', testSubject: '', password: '' });

  // Load candidates from localStorage on component mount
  useEffect(() => {
    const savedCandidates = localStorage.getItem('candidates');
    if (savedCandidates) {
      setCandidates(JSON.parse(savedCandidates));
    }
  }, []);

  // Save candidates to localStorage whenever candidates state changes
  useEffect(() => {
    localStorage.setItem('candidates', JSON.stringify(candidates));
  }, [candidates]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const addCandidate = () => {
    if (form.name && form.email) {
      const updatedCandidates = [...candidates, form];
      setCandidates(updatedCandidates);
      setForm({ name: '', email: '', testDate: '', testTime: '', testSubject: '', password: '' });
    }
  };

  const sendEmail = (candidate) => {
    const templateParams = {
      test_date: candidate.testDate,
      test_time: candidate.testTime,
      test_subject: candidate.testSubject,
      password: candidate.password,
      to_email: candidate.email,
      to_name: candidate.name
    };

    send('service_ehjda9f', 'template_2pyrskh', templateParams, 'EoeRoUu7V0Kjwp5Pd')
      .then((response) => {
        console.log('Email sent successfully:', response);
        alert(`Email sent to ${candidate.email}`);
      })
      .catch((err) => console.error('Failed to send email:', err));
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
          <div className="text-xl font-bold">ProcX</div>
          <div className="flex items-center gap-6 ml-8">
            <a href="/dashboard" className="text-zinc-600 hover:text-zinc-900">Dashboard</a>
            <a href="/set-questions" className="text-zinc-600 hover:text-zinc-900">Assessments</a>
            <a href="/candidates" className="text-zinc-900 font-medium">Candidates</a>
            <a href="/results" className="text-zinc-600 hover:text-zinc-900">Reports</a>
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
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold mb-6">Add Candidate</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center gap-3 bg-white border border-zinc-200 rounded-lg p-3 focus-within:border-zinc-900 transition-all">
              <User className="w-5 h-5 text-zinc-500" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-transparent outline-none placeholder-zinc-500"
              />
            </div>
            <div className="flex items-center gap-3 bg-white border border-zinc-200 rounded-lg p-3 focus-within:border-zinc-900 transition-all">
              <Mail className="w-5 h-5 text-zinc-500" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-transparent outline-none placeholder-zinc-500"
              />
            </div>
            <div className="flex items-center gap-3 bg-white border border-zinc-200 rounded-lg p-3 focus-within:border-zinc-900 transition-all">
              <Calendar className="w-5 h-5 text-zinc-500" />
              <input
                type="date"
                name="testDate"
                value={form.testDate}
                onChange={handleChange}
                className="w-full bg-transparent outline-none placeholder-zinc-500"
              />
            </div>
            <div className="flex items-center gap-3 bg-white border border-zinc-200 rounded-lg p-3 focus-within:border-zinc-900 transition-all">
              <Clock className="w-5 h-5 text-zinc-500" />
              <input
                type="time"
                name="testTime"
                value={form.testTime}
                onChange={handleChange}
                className="w-full bg-transparent outline-none placeholder-zinc-500"
              />
            </div>
            <div className="flex items-center gap-3 bg-white border border-zinc-200 rounded-lg p-3 focus-within:border-zinc-900 transition-all">
              <Book className="w-5 h-5 text-zinc-500" />
              <input
                type="text"
                name="testSubject"
                placeholder="Test Subject"
                value={form.testSubject}
                onChange={handleChange}
                className="w-full bg-transparent outline-none placeholder-zinc-500"
              />
            </div>
            <div className="flex items-center gap-3 bg-white border border-zinc-200 rounded-lg p-3 focus-within:border-zinc-900 transition-all">
              <Lock className="w-5 h-5 text-zinc-500" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full bg-transparent outline-none placeholder-zinc-500"
              />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addCandidate}
            className="bg-zinc-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-zinc-800 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Candidate
          </motion.button>

          <h2 className="text-2xl font-bold mt-12 mb-6">Candidates List</h2>
          <ul className="space-y-4">
            {candidates.map((candidate, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-zinc-200 rounded-lg p-6 hover:shadow-sm transition-all"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-900">{candidate.name}</h3>
                    <p className="text-zinc-600">{candidate.email}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => sendEmail(candidate)}
                    className="bg-zinc-900 text-white px-4 py-2 rounded-md font-semibold hover:bg-zinc-800 transition-colors flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send Email
                  </motion.button>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default Candidates;