# Text Generation Project - Lesson Snap

## Description

**LessonSummarizer** is an AI-powered tool designed to efficiently summarize course materials and lessons. The application uses **Next.js** for the front-end and **Python** for the back-end.

On the back-end, the tool is powered by the **facebook/bart-large-cnn** pre-trained transformer model, which is fine-tuned to generate concise and informative summaries from long educational content.

### Key Features:

- **Text Input**: Users can upload or input their course material (texts, articles, etc.).
- **AI-powered Summaries**: The AI analyzes the content and generates a clear and concise summary, helping users quickly grasp the key points.
- **Interactive Interface**: The front-end, built with Next.js, ensures a smooth, user-friendly experience with real-time feedback and easy navigation.

The combination of a modern front-end framework and a cutting-edge NLP model makes this tool highly efficient for both students and professionals who need quick summaries of educational content.

---

## Prerequisites

- **Python 3.10** for the back-end
- **Node.js** (recommended version: 16.x or higher) for the front-end

---

## Installation

### 1. Clone the repository

Clone the repository to your local machine:

```bash
git clone <repository_URL>
cd <repository_name>
```

### 2. Install dependencies

- Navigate to the back directory:

```bash
cd back/
```

- Create a virtual environment with Python 3.10:

```bash
python3.10 -m venv venv
```

- Activate the virtual environment: On Linux/Mac

```bash
source venv/bin/activate
```

- Activate the virtual environment: On Windows

```bash
venv\Scripts\activate
```

- Install the dependencies:

```bash
pip install -r requirements.txt
```

- Navigate to the front directory:

```bash
cd front/
```

- Install the front-end dependencies:

```bash
npm install
```

### 3. Running the Application

- Navigate to the back directory (if not already there):

```bash
cd back/
```

- Run the FastAPI development server:

```bash
fastapi dev main.py
```

- Navigate to the front directory (if not already there):

```bash
cd front/
```

- Run the Next.js development server:

```bash
npm run dev
```

### 4. Access the Application

Once both servers are running, you can access the application by navigating to:

http://localhost:3000/lesson

This `README.md` provides clear instructions for setting up both the front-end and back-end, including virtual environment setup, dependency installation, and how to run both servers.
