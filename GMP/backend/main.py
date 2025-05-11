from flask import Flask, jsonify, make_response
from flask_cors import CORS
from detection import ProctorDetector
import os

app = Flask(__name__)
CORS(app, supports_credentials=True)  # Ensure credentials and cross-origin requests work

detector = ProctorDetector()

if not os.path.exists('violations'):
    os.makedirs('violations')

@app.route('/start')
def start_detection():
    detector.start_detection()
    response = jsonify({"status": "Detection started"})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/stop')            
def stop_detection():
    detector.stop_detection()
    response = jsonify({"status": "Detection stopped"})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/status')
def get_status():
    response = jsonify(detector.get_status())
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/screenshot')
def take_screenshot():
    filename = detector.capture_screenshot()
    if filename:
        response = jsonify({"status": "Screenshot saved", "filename": filename})
    else:
        response = jsonify({"status": "Failed to capture screenshot"}), 400
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

if __name__ == '__main__':
    app.run(debug=True, port=5000)