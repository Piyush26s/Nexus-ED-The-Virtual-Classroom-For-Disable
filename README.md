# VirtClass: Empathetic AI-Driven Inclusive Classroom 🚀

> **"Transforming Disabilities into Digital Superpowers through Human-Centric Design."**

VirtClass is a next-generation virtual learning environment built from the ground up on **Human-Computer Interaction (HCI)** principles. While traditional classrooms focus on the curriculum, we focus on the **Universal Access** of that curriculum, empowering students with motor, visual, and cognitive challenges using state-of-the-art assistive AI.

---

## 🌟 The Core Mission
Most digital learning platforms suffer from "Accessibility Debt"—small click targets, complex navigation, and a lack of alternative input methods. **VirtClass** solves this by implementing an adaptive UI that morphs based on the user's specific disability profile.

---

## ✨ Key Premium Features

### 🎮 1. Gaze-to-Action (Assistive AI)
Using **MediaPipe FaceMesh**, the platform tracks head movements in real-time. 
- **Hands-Free Navigation**: Look right to go 'Next', look left for 'Back'.
- **Gaze Clicking**: Precision mouth-opening or focus-based triggers for button clicks.
- **Dead-zone Filtering**: Intelligent smoothing to prevent accidental movements from triggering actions.

### 🎙️ 2. Voice-Link Interface
A full conversational bridge powered by the **Web Speech API**.
- **Contextual Commands**: "Hey AI, open my math notes" or "Start the accessibility audit".
- **Dynamic Feedback**: The system speaks back to the user, confirming actions and reading out content for visual assistance.

### 🎨 3. HCI Design System (Electric Indigo)
A custom-engineered visual language:
- **Glassmorphism**: Translucent interfaces with backdrop blur to reduce cognitive visual load.
- **Micro-Animations**: Pulse effects for voice input and smooth entries for dashboard panels.
- **Fitts's Law Optimized**: Oversized 'Hit Zones' for buttons and cards, making them significantly easier to target via head tracking.

### 👨‍🏫 4. Faculty Intelligence Portal
A dedicated workspace for professors to:
- **Monitor Engagement**: Real-time "Attention Scores" derived from gaze stability.
- **Class Management**: Professional glassmorphism dashboard for grading and announcements.

---

## 🛠️ The Technical Engine

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 19 + Vite (Next-Gen Build Tool) |
| **Design Engine** | Custom CSS Variables (Standard Tokens) + Glassmorphism |
| **Vision AI** | @mediapipe/face_mesh (Neural Face Tracking) |
| **Speech Engine** | Web Speech (Synthesis + Recognition) |
| **Backend** | Node.js / Express (Modular API Architecture) |
| **State Management** | Context API (Multi-layer: Auth, Tracking, Profile) |

---

## 📂 Project Architecture

```text
/virtal classroom project
├── /head-tracking-assist    # The Client-Side UI Engine
│   ├── /src/components      # Core HCI Components (HUD, Voice, Layout)
│   ├── /src/context         # The Brain (Global State & AI Logic)
│   ├── /src/hooks           # Precision Tracking & Smoothing Algorithms
│   ├── /src/pages           # Premium Views (Dashboard, Faculty, AI Lab)
│   └── index.css            # Global Design System (Electric Indigo)
└── /server                  # The Backend API Service
    ├── server.js            # Express Entry Point
    └── /routes              # AI Chat & User Data Endpoints
```

---

## ⚙️ Deployment & Setup

### 1. Prerequisites
- **Node.js**: v18.x.x+
- **Camera**: Functional webcam for Computer Vision features.
- **Microphone**: For Voice-Link navigation.

### 2. Frontend Launch
```bash
cd "virtal classroom project/head-tracking-assist"
npm install --legacy-peer-deps
npm run dev
```
> Access at: **http://localhost:5173**

### 3. Backend Launch
```bash
cd "virtal classroom project/server"
npm install
npm start
```
> API running on: **http://localhost:5000**

---

## 🏆 Project Objectives (HCI Benchmarks)
1. **Error Prevention**: High-contrast modes and voice confirmations to reduce mis-clicks.
2. **Recognition Over Recall**: Minimalist dashboards so users don't have to remember complex paths.
3. **Flexibility & Efficiency**: Users can switch between Voice, Head Tracking, or Mouse at any time.

---
*Built with ❤️ for a world where technology leaves no one behind . by Piyush * 🏳️‍🌈
