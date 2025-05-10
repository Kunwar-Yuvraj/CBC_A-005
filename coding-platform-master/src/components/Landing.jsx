import React from "react";
import { ArrowRight, ChevronDown, Shield, User, Volume2, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Landing = () => {
  // Animation for the code lines in the background
  const codeLines = Array(15).fill().map((_, i) => ({
    width: Math.random() * 80 + 20,
    delay: Math.random() * 3
  }));

  return (
    <div className="min-h-screen font-sans bg-white text-zinc-900">
      {/* Hero Section - Full Page */}
      <div className="h-screen relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/2 h-screen bg-gray-50 -skew-x-12 transform origin-top-right" />
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            className="absolute top-40 right-40 w-64 h-64 rounded-full bg-gradient-to-r from-sky-200 to-indigo-200 blur-3xl"
          />
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 3, delay: 1, repeat: Infinity, repeatType: "reverse" }}
            className="absolute bottom-20 left-60 w-72 h-72 rounded-full bg-gradient-to-r from-amber-100 to-rose-100 blur-3xl"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto h-full flex flex-col">
          {/* Navbar */}
          <motion.nav 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="py-6 px-6 flex justify-between items-center"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold"
            >
              ProcX
            </motion.div>
            
            <div className="flex items-center gap-8">
              <motion.a 
                whileHover={{ y: -2 }}
                className="text-zinc-600 hover:text-zinc-900" 
                href="#features"
              >
                Features
              </motion.a>
              <motion.a 
                whileHover={{ y: -2 }}
                className="text-zinc-600 hover:text-zinc-900" 
                href="#"
              >
                
                Pricing
              </motion.a>
              <motion.a 
                whileHover={{ y: -2 }}
                className="text-zinc-600 hover:text-zinc-900" 
                href="#"
              >
                About
              </motion.a>
              <Link to="/dashboard">
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-4 py-2 bg-zinc-100 rounded-md text-zinc-800 hover:bg-zinc-200 transition-colors"
                >
                  Admin Dashboard
                </motion.button>
              </Link>
            </div>
          </motion.nav>

          {/* Hero Content */}
          <div className="flex-1 flex items-center">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
              {/* Left Side Content */}
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex flex-col justify-center"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-zinc-100 text-zinc-800 text-xs font-medium tracking-wider px-3 py-1 rounded-full w-fit mb-6"
                >
                  FULL-STACK PROCTORING PLATFORM
                </motion.span>

                <motion.h1 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="text-6xl md:text-7xl font-bold mb-6"
                >
                  <span className="bg-gradient-to-r from-zinc-900 via-blue-800 to-zinc-900 bg-clip-text text-transparent">
                    ProcX
                  </span>
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="text-lg text-zinc-600 mb-8 max-w-lg"
                >
                  The ultimate platform for online assessments. Test your
                  skills, track your progress, and land your dream job with our modern proctoring solution.
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="flex gap-4"
                >
                  <Link to="/test">
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                      whileTap={{ scale: 0.98 }}
                      className="group bg-zinc-900 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
                    >
                      Take a Test
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.span>
                    </motion.button>
                  </Link>

                  <Link to="/learn">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white text-zinc-900 px-6 py-3 rounded-lg font-medium border border-zinc-200 hover:border-zinc-300 transition-all duration-300"
                    >
                      Learn More
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Right Side - Animated Security Visual */}
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="flex items-center justify-center"
              >
                <div className="w-full aspect-square max-w-md bg-gradient-to-br from-gray-100 to-white rounded-2xl p-1 shadow-xl relative overflow-hidden">
                  {/* Animated code background */}
                  <div className="absolute inset-0 bg-white/80 z-0">
                    <div className="p-6">
                      {codeLines.map((line, index) => (
                        <motion.div
                          key={index}
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ width: `${line.width}%`, opacity: 0.3 }}
                          transition={{ 
                            duration: 2, 
                            delay: line.delay,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                          className="h-2 bg-gray-200 rounded-full mb-3"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Security features visualization */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-48 h-48">
                      {/* Central user */}
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center shadow-lg">
                          <User className="w-10 h-10 text-zinc-700" />
                        </div>
                      </motion.div>

                      {/* Orbital security features */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0"
                      >
                        <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shadow-md">
                            <Eye className="w-6 h-6 text-blue-600" />
                          </div>
                        </motion.div>
                      </motion.div>

                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0"
                      >
                        <motion.div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shadow-md">
                            <Shield className="w-6 h-6 text-green-600" />
                          </div>
                        </motion.div>
                      </motion.div>

                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0"
                      >
                        <motion.div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
                          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center shadow-md">
                            <Volume2 className="w-6 h-6 text-amber-600" />
                          </div>
                        </motion.div>
                      </motion.div>

                      {/* Connecting lines */}
                      <svg className="absolute inset-0 w-full h-full">
                        <motion.circle 
                          cx="50%" 
                          cy="50%" 
                          r="45%" 
                          fill="none" 
                          stroke="rgba(0,0,0,0.1)" 
                          strokeWidth="1"
                          strokeDasharray="5,5"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.circle 
                          cx="50%" 
                          cy="50%" 
                          r="30%" 
                          fill="none" 
                          stroke="rgba(0,0,0,0.1)" 
                          strokeWidth="1"
                          strokeDasharray="3,3"
                          animate={{ rotate: -360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Pulse animations */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0, 0.5, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                      className="w-32 h-32 rounded-full border border-blue-300"
                    />
                    <motion.div
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0, 0.5, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        delay: 1.5,
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                      className="w-32 h-32 rounded-full border border-blue-300 absolute"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          >
            <span className="text-xs text-zinc-500 mb-2">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-5 h-5 text-zinc-400" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Advanced Security Features</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">
              Our platform ensures secure testing while respecting privacy
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Video Surveillance</h3>
              <p className="text-zinc-600">
                Our AI-powered system detects unauthorized objects like cellphones in real-time, ensuring test integrity without storing any video data.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Enhanced Privacy</h3>
              <p className="text-zinc-600">
                Stream-only processing means no data is saved - all video feeds are analyzed in real-time through our ML models, protecting your privacy.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center mb-4">
                <Volume2 className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Audio Monitoring</h3>
              <p className="text-zinc-600">
                Our LLM analyzes background sounds to detect suspicious audio related to test content, flagging potential cheating attempts automatically.
              </p>
            </motion.div>
            
            {/* Feature 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-indigo-600">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Browser Lockdown</h3>
              <p className="text-zinc-600">
                Prevents tab switching, right-clicks, and window changes to maintain focus and prevent access to unauthorized resources during tests.
              </p>
            </motion.div>
            
            {/* Feature 5 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <div className="w-12 h-12 bg-rose-50 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-rose-600">
                  <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Multiple Device Detection</h3>
              <p className="text-zinc-600">
                Our system can identify if a test-taker attempts to use additional devices or screens during the assessment, maintaining test integrity.
              </p>
            </motion.div>
            
            {/* Feature 6 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <div className="w-12 h-12 bg-sky-50 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-sky-600">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Flagging</h3>
              <p className="text-zinc-600">
                Automatic alerts for suspicious activities are triggered immediately, allowing proctors to intervene when necessary while maintaining a fair testing environment.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">How ProcX Works</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">
              Our modern proctoring platform combines advanced technology with user-friendly features
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Register & Setup</h3>
              <p className="text-zinc-600">
                Create your account, grant temporary permissions, and set up your testing environment with our simple preparation checklist.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Take Your Test</h3>
              <p className="text-zinc-600">
                Complete your coding assessment in our secure environment with real-time monitoring and advanced security features.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Results</h3>
              <p className="text-zinc-600">
                Receive detailed feedback and analysis of your performance, with insights that help you improve for future assessments.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-br from-zinc-900 to-zinc-800 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-4xl font-bold mb-4">Ready to showcase your skills?</h2>
            <p className="text-zinc-300 max-w-2xl mx-auto">
              Join thousands of developers who trust ProcX for fair and secure coding assessments
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center gap-4"
          >
            <Link to="/test">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="group bg-white text-zinc-900 px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
              >
                Start Now
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </motion.button>
            </Link>

            <Link to="/demo">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-transparent text-white px-6 py-3 rounded-lg font-medium border border-white/30 hover:bg-white/10 transition-all duration-300"
              >
                See Demo
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 bg-zinc-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-xl font-bold mb-4">ProcX</div>
              <p className="text-zinc-600 text-sm">
                The modern solution for secure and fair full-stack coding assessments.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-zinc-600 hover:text-zinc-900 text-sm">Features</a></li>
                <li><a href="#" className="text-zinc-600 hover:text-zinc-900 text-sm">Pricing</a></li>
                <li><a href="#" className="text-zinc-600 hover:text-zinc-900 text-sm">Enterprise</a></li>
                <li><a href="#" className="text-zinc-600 hover:text-zinc-900 text-sm">Security</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-zinc-600 hover:text-zinc-900 text-sm">Documentation</a></li>
                <li><a href="#" className="text-zinc-600 hover:text-zinc-900 text-sm">API</a></li>
                <li><a href="#" className="text-zinc-600 hover:text-zinc-900 text-sm">Blog</a></li>
                <li><a href="#" className="text-zinc-600 hover:text-zinc-900 text-sm">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-zinc-600 hover:text-zinc-900 text-sm">About Us</a></li>
                <li><a href="#" className="text-zinc-600 hover:text-zinc-900 text-sm">Careers</a></li>
                <li><a href="#" className="text-zinc-600 hover:text-zinc-900 text-sm">Contact</a></li>
                <li><a href="#" className="text-zinc-600 hover:text-zinc-900 text-sm">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-zinc-200 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-zinc-500 text-sm">
              © {new Date().getFullYear()} ProcX. All rights reserved.
            </p>
            
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-zinc-500 hover:text-zinc-900">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" className="text-zinc-500 hover:text-zinc-900">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="text-zinc-500 hover:text-zinc-900">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" className="text-zinc-500 hover:text-zinc-900">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;