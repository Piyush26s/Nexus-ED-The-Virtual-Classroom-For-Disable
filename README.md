# Accessible Virtual Classroom

Accessible Virtual Classroom is a web-based learning platform designed specifically for students with disabilities. The goal of the system is to provide an inclusive, easy-to-use, and accessible digital learning environment where students can attend classes, access notes, submit assignments, and receive AI-based assistance.

## 🚀 Features

- **Accessibility First**: Simple, clean user interface designed for all users.
- **Voice Navigation**: Support for voice commands like 'Open Notes' or 'Start Quiz' via Web Speech API.
- **Head Tracking**: Webcam-based face detection (MediaPipe) to control cursor movement for students with motor disabilities.
- **AI-Powered Assistance**: 
  - Chatbot to explain concepts in natural language (OpenAI API).
  - Summarization tool to convert long notes into simple summaries.
- **Read Aloud**: Text-to-Speech support for notes and announcements.
- **Customization**: High contrast modes and font customization, including dyslexia-friendly fonts minimum 18px.
- **Role-Based Access**: 
  - **Admin**: Manage users, create classes, monitor platform.
  - **Teacher**: Upload notes, create assignments, conduct quizzes, post announcements.
  - **Student**: Join classes, view notes, submit assignments, take quizzes, use AI assistant.

## 🛠️ Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas)
- **AI & Integrations**: OpenAI API, Web Speech API, MediaPipe
- **Security**: JWT Authentication, bcrypt password hashing, HTTPS

## 📂 Project Structure

- `/head-tracking-assist`: React frontend application containing all web views and accessibility features (Head Tracking, Voice Navigation, etc.).
- `/server`: Node.js & Express backend for handling API requests, authentication, and database interactions.

## ⚙️ How to Run Locally

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- MongoDB URI (local or Atlas)
- Relevant API Keys for AI features

### Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory and add your environment variables (e.g., `PORT`, `MONGO_URI`, `JWT_SECRET`).
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd head-tracking-assist
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm run dev
   ```
   *(or `npm start` depending on your setup)*

## 👥 Objective

Most existing online learning systems are not fully optimized for disabled users, commonly suffering from small clickable elements, complex interfaces, lack of voice navigation, limited screen reader compatibility, and no head-tracking support. Accessible Virtual Classroom aims to solve this by bringing a completely accessible alternative.
