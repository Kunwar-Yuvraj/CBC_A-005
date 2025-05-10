from flask import Flask, render_template, request, jsonify
import pathlib
import google.generativeai as genai

app = Flask(__name__)

# Initialize the Gemini model
genai.configure(api_key="AIzaSyDIsCQ9VG8lSMbSG7_9DO2qwWiSF9NaiqY")  # Replace with your API key
model = genai.GenerativeModel('models/gemini-1.5-flash')

# Sample question
SAMPLE_QUESTION = "What is the capital of India?"

@app.route('/')
def index():
    return render_template('index.html', question=SAMPLE_QUESTION)

@app.route('/transcribe', methods=['POST'])
def transcribe():
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file'}), 400
    
    # Save the audio file
    audio = request.files['audio']
    audio_path = 'recorded_audio.mp3'
    audio.save(audio_path)
    
    # Transcribe the audio
    transcription_prompt = "Please transcribe the following audio input, JUST SIMPLY TRANSCRIBE AND RETURN THE TRANSCRIBED TEXT DIRECTLY NOT ANYTHING ELSE"
    transcription_response = model.generate_content([
        transcription_prompt,
        {
            "mime_type": "audio/mp3",
            "data": pathlib.Path(audio_path).read_bytes()
        }
    ])
    
    transcribed_text = transcription_response.text.strip()
    print(transcribed_text)
    
    # Analyze the transcription for cheating
    cheating_prompt = f"""
    You are a proctoring system designed to detect cheating in exams. 
    The question is: "{SAMPLE_QUESTION}".
    The user's transcription is: "{transcribed_text}".
    the transcriptio could be in any language , match the context and return 'Cheating Detected' or 'No Cheating detected'
    if the transcription is exact same as the question return 'Cheating detected' or else
    Analyze the transcription and determine if the user discussed the question or any related content that could indicate cheating from the recorded audio transcription.
    Respond with 'Cheating detected' if cheating is detected, otherwise respond with 'No cheating detected'.
    """
    
    cheating_response = model.generate_content(cheating_prompt)
    cheating_result = cheating_response.text.strip()
    
    return jsonify({'text': transcribed_text, 'cheating_result': cheating_result})

if __name__ == '__main__':
    app.run(debug=True, port=5003)