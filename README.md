
#  InterVue X — AI-Powered Interview Preparation Platform

InterVue X is a modern, high-performance Application designed to help users practice technical and behavioral interviews using real-time AI, multimodal interactions, and advanced resume tooling.

The platform combines **React + TypeScript**, **Google Gemini AI**, **real-time audio/video**, and **canvas-based system design tools** to simulate realistic interview experiences.

Here's the link to access the application : https://interview-x-918130002834.us-west1.run.app

---

##  Tech Stack Overview

InterVue X is built for **performance, scalability, and real-time interaction**, leveraging modern frontend tooling and cloud-native AI APIs.

---

##  Frontend Framework & Core Libraries

* **React (v18+)**
  Component-based UI architecture for building interactive, reusable interfaces.

* **TypeScript**
  Used throughout the project for static typing, improved maintainability, and safer refactoring.

* **Vite**
  Ultra-fast development server and optimized production bundler with Hot Module Replacement (HMR).

* **React Router DOM (v6+)**
  Client-side routing for seamless page navigation without full reloads.

---

##  Styling & UI

* **Tailwind CSS**
  Utility-first CSS framework used across the application, supporting:

  * Responsive layouts
  * Dark mode
  * Consistent design tokens

* **Lucide React**
  SVG-based icon library for scalable, customizable icons.

---

##  State Management & Persistence

* **React Hooks (`useState`, `useEffect`)**
  Manage component state, lifecycle effects, and data fetching.

* **LocalStorage (Client-Side Persistence)**
  Used as a lightweight client-side database:

  * `intervue_user` → active session
  * `intervue_history` → interview records
  * `intervue_users_db` → mock user database

---

##  Audio & Multimedia

### Web Audio API

Used extensively for real-time voice interviews:

* `navigator.mediaDevices.getUserMedia` — microphone access
* `AudioContext` — audio graph management
* `ScriptProcessorNode` — raw PCM audio capture
* `AnalyserNode` — frequency analysis & visualization
* AI audio playback using `AudioBufferSourceNode`

### HTML5 Media

* `<video>` — AI avatar loop states (idle / speaking)
* `<canvas>` — whiteboard drawing & waveform visualizations

---

##  External APIs & AI Integration

### Google Gemini API (`@google/genai`)

#### 🔹 Gemini 2.5 Flash Native Audio Preview

**Model:** `gemini-2.5-flash-native-audio-preview-09-2025`
**Used in:** `InterviewLive.tsx`

* Powers the **real-time live interview**
* WebSocket-based streaming of:

  * User microphone audio
  * Low-latency AI voice responses
* Handles interviewer persona logic (e.g., *Dr. Emma*)

---

#### 🔹 Gemini 3 Flash Preview

**Model:** `gemini-3-flash-preview`

Used for:

* **Post-Interview Analysis**

  * Generates structured JSON feedback (scores, strengths, weaknesses)
* **Resume Builder AI Polish**

  * Rewrites summaries and bullet points

---

#### 🔹 Gemini 2.5 Flash

**Model:** `gemini-2.5-flash`

Used for:

* **Code Judge (InterviewLive.tsx)**

  * Evaluates user code against constraints & test cases
* **Resume Review**

  * ATS scoring and job-fit feedback

---

#### 🔹 Gemini 2.5 Flash Image

**Model:** `gemini-2.5-flash-image`

Used in:

* `ImageEditor.tsx`
* Image generation & editing for system design diagrams

---

#### 🔹 Veo 3.1 Fast Generate Preview

**Model:** `veo-3.1-fast-generate-preview`

Used in:

* `VideoStudio.tsx`
* Generates short, high-quality MP4 videos from text prompts

---

##  Google Identity Services (Authentication)

* **Google Sign-In (GSI)**

  * Script: `accounts.google.com/gsi/client`
  * Enables OAuth-based Google login

* **JWT Decoding**

  * Custom utility (`utils/auth.ts`) extracts:

    * Name
    * Email
    * Profile picture

---

##  Page-by-Page Tooling Breakdown

###  Home / Dashboard (`Dashboard.tsx`)

* React Router navigation
* Tailwind CSS animations & gradients
* LocalStorage login state detection

---

###  Authentication (`Login.tsx`, `Signup.tsx`)

* Google GSI login button
* Mock user database using LocalStorage
* JWT parsing & session persistence

---

###  Live Interview (`InterviewLive.tsx`)

* Gemini Live WebSocket connection
* Real-time microphone capture
* AI voice playback
* Audio waveform visualization
* Code editor for coding rounds
* AI-driven interviewer persona

---

###  System Design Interview

Files:

* `SystemDesignInterview.tsx`
* `InterviewWhiteboard.tsx`

Features:

* HTML5 Canvas drawing
* Shapes, erasing, freehand diagrams
* Export whiteboard as image
* Mouse & touch input support

---

###  Resume Builder (`ResumeBuilder.tsx`)

* JSON-driven resume schema
* Gemini 3 Flash for AI rewriting
* Print-optimized PDF export using CSS media queries

---

###  Resume Review (`ResumeReview.tsx`)

* File upload (text / image)
* Gemini 2.5 Flash analysis
* ATS score & improvement feedback

---

###  Veo Video Studio (`VideoStudio.tsx`)

* Text-to-video generation
* Google AI Studio key selection
* Fetch-based MP4 retrieval

---

###  Jobs Board (`Jobs.tsx`)

* Static TypeScript job database
* Client-side filtering & pagination
* Search & category logic using array methods

---

##  Utilities & Infrastructure

### `utils/audio.ts`

* PCM16 audio conversion
* Base64 ↔ binary transformations
* Optimized streaming for Gemini Live API

---

### `utils/auth.ts`

* Session creation & cleanup
* LocalStorage-based mock database
* JWT decoding utilities

---

### `components/Layout.tsx`

* Dark mode handling
* Tailwind `dark:` class toggling
* Global layout wrapper

---

##  Deployment Notes

* Designed for deployment on **Google Cloud** (Cloud Run / Firebase Hosting / App Engine)
* Google OAuth requires:

  * Stable HTTPS domain
  * Exact JavaScript Origin
  * Exact Redirect URI

---

##  Summary

**InterView X** is a full-fledged AI interview simulation platform combining:

* Real-time multimodal AI
* Advanced frontend engineering
* Canvas-based system design tools
* Audio streaming & visualization
* Resume and ATS intelligence

Built with production-grade technologies and cloud-native AI integration.


