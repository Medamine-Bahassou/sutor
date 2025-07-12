# Sutor - Your AI-Powered Chat and PDF Assistant

Sutor is a full-stack web application that combines a powerful AI chat interface with PDF processing capabilities. It allows users to interact with an AI model, upload PDF documents, and have the content of the PDF be part of the conversation.

## Features

- **AI Chat:** A clean and intuitive chat interface for interacting with a large language model.
- **PDF Processing:** Upload PDF files to be converted into markdown format.
- **Contextual Conversations:** The content of the uploaded PDF is seamlessly integrated into the chat, allowing the AI to answer questions and discuss the document's contents.
- **LaTeX Rendering:** The application can render LaTeX code into a viewable PDF and allows for editing in Overleaf.

## Tech Stack

- **Frontend:**
  - [Next.js](https://nextjs.org/) - A React framework for building user interfaces.
  - [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for styling.
  - [shadcn/ui](https://ui.shadcn.com/) - A collection of re-usable components.
- **Backend:**
  - [Flask](https://flask.palletsprojects.com/) - A lightweight web framework for Python.
  - [Groq](https://groq.com/) - Powering the AI chat with a large language model.
  - [MarkItDown](https://github.com/dev-med/markitdown) - For converting PDF files to markdown.

## Getting Started

### Prerequisites

- Node.js and npm
- Python and pip
- A Groq API key

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Medamine-Bahassou/sutor.git
   cd sutor
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   cp .env.example .env
   # Add your GROQ_API_KEY to the .env file
   flask run
   ```

3. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Start chatting with the AI.
3. To discuss a PDF, use the attachment feature to upload your file.
4. If the AI generates LaTeX code, it will be rendered as a PDF on the right side of the screen.
