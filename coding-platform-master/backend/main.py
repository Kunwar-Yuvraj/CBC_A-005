from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from detection import ProctorDetector
import os
import json

app = Flask(__name__)
CORS(app)

QUESTIONS_FILE_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'public', 'data', 'questions.json'))

detector = ProctorDetector()

if not os.path.exists('violations'):
    os.makedirs('violations')

@app.route('/start')
def start_detection():
    detector.start_detection()
    return {"status": "Detection started"}

@app.route('/stop')
def stop_detection():
    detector.stop_detection()
    return {"status": "Detection stopped"}

@app.route('/status')
def get_status():
    return jsonify(detector.get_status())

@app.route('/screenshot')
def take_screenshot():
    filename = detector.capture_screenshot()
    if filename:
        return {"status": "Screenshot saved", "filename": filename}
    return {"status": "Failed to capture screenshot"}, 400

# Route to save questions
@app.route('/save-questions', methods=['PUT'])
def save_questions():
    try:
        updated_questions = request.json
        with open(QUESTIONS_FILE_PATH, "w", encoding="utf-8") as file:
            json.dump(updated_questions, file, indent=4)
        return jsonify({"status": "success", "message": "Questions saved successfully!"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True, port=5000)
