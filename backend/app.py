import os
from flask import Flask, request, jsonify
from groq import Groq
from dotenv import load_dotenv
from flask_cors import CORS # Add this import
from providers.groq import completion as groq_completion

load_dotenv()

app = Flask(__name__)
CORS(app)

PDF_UPLOAD_FOLDER = "/home/med/Desktop/Git/sutor/backend/attachment/"
if not os.path.exists(PDF_UPLOAD_FOLDER):
    os.makedirs(PDF_UPLOAD_FOLDER)

# Global variable to store the converted markdown content
converted_pdf_content = None

client = Groq(
    api_key=os.environ.get("GROQ_API_KEY"),
)


global memory
memory = []


@app.route('/chat', methods=['POST'])
def chat():

    SYSTEM = f"""
    [SYSTEM]
    Your mission is to generate a latex code with explication, generate one latex code in one block ```latex  [latex_here] ``` , also  some explication and analyze
"""

    data = request.get_json()
    user_message = data.get('message')
    attachment_filename = data.get('attachment') # Now this is a filename

    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    full_message = user_message
    global converted_pdf_content
    if converted_pdf_content:
        full_message = f"{user_message}\n\nAttachment:\n{converted_pdf_content}"

    messages = [{"role": "system", "content": SYSTEM }]

    for i in range(0, len(memory), 2):
        messages.append({"role": "user", "content": memory[i]})
        messages.append({"role": "assistant", "content": memory[i+1]})

    # Add the current user message
    messages.append({"role": "user", "content": full_message})

    try:
        chat_completion = groq_completion(messages)
        response_content = chat_completion
        
        # memory
        memory.append(full_message)
        memory.append(response_content)

        return jsonify({"response": response_content})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/upload_pdf', methods=['POST'])
def upload_pdf():
    global converted_pdf_content
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file:
        filepath = os.path.join(PDF_UPLOAD_FOLDER, file.filename)
        file.save(filepath)
        try:
            from markitdown import MarkItDown
            md = MarkItDown()
            with open(filepath, 'rb') as f:
                result = md.convert(f)
            converted_pdf_content = result.text_content
            return jsonify({"message": "PDF converted and ready for chat", "filename": file.filename}), 200
        except Exception as e:
            return jsonify({"error": f"Error converting PDF: {str(e)}"}), 500
    return jsonify({"error": "Something went wrong"}), 500

if __name__ == '__main__':
    app.run(debug=True)
