Online Proctored Exam System
Overview
The Online Proctored Exam System is a web-based application designed to conduct secure and monitored online exams. It ensures the integrity of the exam process by detecting and preventing malicious activities such as tab switching, right-clicking, cellphone usage, and more. The system calculates a risk score based on detected violations and terminates the exam if the risk score exceeds a predefined threshold.

Key Features
Real-Time Malicious Activity Detection:

Detects tab switching, window blur, right-clicking, cellphone usage, and suspicious sounds.

Captures screenshots only when malicious activities are detected.

Risk Scoring System:

Assigns weights to different violations.

Terminates the exam if the risk score exceeds the threshold.

Coding Questions:

Supports coding questions with multiple programming languages (Python, JavaScript, Java).

Provides test cases and evaluates code submissions.

Environment Check:

Ensures the exam environment is secure before starting the exam.

Checks for camera connectivity, single person detection, and absence of cellphones.

User-Friendly Interface:

Clean and intuitive UI for both candidates and administrators.

Displays real-time alerts for violations.

Technologies Used
Frontend: React.js, React Router, Tailwind CSS

Backend: Flask (for proctoring and screenshot capture)

APIs: Fetch API for communication with the backend

State Management: React Hooks (useState, useEffect, useCallback, useRef)

Routing: React Router v6

How It Works
Environment Check:

The system checks for a secure environment (camera connected, single person detected, no cellphones).

Candidates must press 'N' to confirm they are ready.

Exam Monitoring:

The system continuously monitors for malicious activities.

Screenshots are captured only when violations occur.

Risk Scoring:

Each violation contributes to the risk score.

If the risk score exceeds the threshold, the exam is terminated.

Coding Section:

Candidates can write and run code for coding questions.

The system evaluates the code against predefined test cases.

Results:

Exam results, including risk score and violation details, are stored and displayed.
