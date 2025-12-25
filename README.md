# InterVue-X
InterVue X is an impact-first start-up with a mission to empower job seekers globally through GenAI solutions. We provide real-time interview practices with actionable feedback to track and enhance a candidate’s interview performance.

##1. Tech Stack Overview
The application is a modern Single Page Application (SPA) built for performance, responsiveness, and real-time capabilities.
Frontend Framework & Core Libraries
React (v18+): The core UI library used for building component-based interfaces.
TypeScript: Used throughout the project for static typing, ensuring code reliability and better developer tooling.
Vite: The build tool and development server, chosen for its extremely fast HMR (Hot Module Replacement) and optimized production builds.
React Router DOM (v6+): Handles client-side routing, enabling seamless navigation between pages without refreshing the browser.
Styling & UI
Tailwind CSS: A utility-first CSS framework used for styling all components. It provides a responsive, dark-mode-ready design system directly in the HTML.
Lucide React: An icon library used for consistent, scalable, and customizable SVG icons across the app.
State Management & Persistence
React useState & useEffect: Used for local component state management (e.g., form inputs, toggle states, data fetching).
LocalStorage: Used as a client-side "database" to persist user sessions, interview history, and profile data across browser reloads (intervue_user, intervue_history, intervue_users_db).
Audio & Multimedia
Web Audio API: Native browser API used for:
Capturing microphone input (navigator.mediaDevices.getUserMedia).
Processing raw PCM audio data (AudioContext, ScriptProcessorNode).
Visualizing audio frequencies (AnalyserNode).
Playing back AI-generated audio responses.
HTML5 <video> & <canvas>: Used for rendering the AI avatar video loops and the whiteboard drawing surface.

##2. External APIs & AI Integration
Google Gemini API (@google/genai SDK)
This is the core intelligence engine of the application.
Gemini 2.5 Flash Native Audio Preview (gemini-2.5-flash-native-audio-preview-09-2025):
Used In: InterviewLive.tsx (Live Interview Page).
Function: Powers the Multimodal Live API. It establishes a WebSocket connection to stream real-time audio from the user and receive low-latency audio responses from the AI interviewer. It handles the conversational logic and persona (e.g., "Dr. Emma").
Gemini 3 Flash Preview (gemini-3-flash-preview):
Used In:
InterviewLive.tsx: For post-interview analysis. It processes the transcript to generate structured JSON feedback (score, strengths, weaknesses).
ResumeBuilder.tsx: For the AI Polish feature, rewriting resume summaries and bullet points.
Gemini 2.5 Flash (gemini-2.5-flash):
Used In:
InterviewLive.tsx: Acts as the Code Judge. It evaluates user-submitted code against constraints and test cases.
ResumeReview.tsx: Analyzes uploaded resumes against job descriptions to provide an ATS score and feedback.
Gemini 2.5 Flash Image (gemini-2.5-flash-image):
Used In: ImageEditor.tsx.
Function: Generates or edits images based on text prompts and uploaded base images (e.g., adding a database node to a system design diagram).
Veo 3.1 Fast Generate Preview (veo-3.1-fast-generate-preview):
Used In: VideoStudio.tsx.
Function: Generates short, high-quality video clips from text prompts for creating interview scenarios or office simulations.
Google Identity Services (Sign-In)
accounts.google.com/gsi/client: The script loaded in index.html to enable "Sign in with Google" functionality.
JWT Decoding: Custom utility (utils/auth.ts) to parse the JSON Web Token returned by Google to extract user details (name, email, picture).

##3. Page-by-Page Tooling Breakdown
1. Home / Dashboard (Dashboard.tsx)
React Router: Navigation to specific tools (/interview, /resume-builder, etc.).
Tailwind CSS: Complex gradients, responsive grids for the "Benefits" section, and CSS animations for the progress bars.
LocalStorage: Checks for login state to show the "Welcome Back" toast.

##3. Authentication (Login.tsx, Signup.tsx, utils/auth.ts)
Google GSI Client: Renders the "Sign in with Google" button.
LocalStorage:
intervue_users_db: Stores registered user credentials (mock database).
intervue_user: Stores the currently active session.
Crypto API (Browser): (Implicitly used) For basic base64 decoding of JWTs.

##5. Live Interview (InterviewLive.tsx)
Google GenAI SDK (live.connect): Establishes the real-time WebSocket session.
Web Audio API:
AudioContext: Manages the audio graph.
ScriptProcessorNode: Captures raw PCM data from the microphone.
AudioBufferSourceNode: Plays back the AI's audio chunks.
AnalyserNode: Provides frequency data for the <AudioVisualizer>.
HTML5 Canvas: Renders the real-time audio waveform visualization.
HTML5 Video: loops the interviewer's "idle" or "talking" video state based on audio activity.
Monaco Editor (Conceptually): A custom-built code editor UI using textarea and line numbers for the Coding round.

##6. System Design Interview (SystemDesignInterview.tsx, InterviewWhiteboard.tsx)
HTML5 Canvas API: The core of the whiteboard.
getContext('2d'): Used for all drawing operations (lines, shapes, erasing).
toDataURL(): Used to export the whiteboard as an image.
React Refs: Used to manipulate the canvas DOM element directly for performance.
Mouse/Touch Events: Event listeners to track pointer movement for drawing.

##7. Resume Builder (ResumeBuilder.tsx)
React State: Manages the complex JSON object representing the resume data.
Gemini 3 Flash API: Calls the generateContent method to rewrite text for the "AI Polish" feature.
CSS Print Media Queries: (@media print) Used to format the layout perfectly when the user presses Ctrl+P or the "Download PDF" button (which triggers browser print).

##8. Resume Review (ResumeReview.tsx)
File Reader API: Reads uploaded files (Text/Image) from the user's device.
Gemini 2.5 Flash API:
Accepts text or base64 image data.
Returns a structured JSON response with scores and feedback.

##9. Veo Video Studio (VideoStudio.tsx)
Gemini Veo Model: Calls generateVideos to create MP4 content.
Google AI Studio Key Selection: Uses window.aistudio to securely request the user's API key for billing-enabled features.
Fetch API: Retrieves the generated video blob from the URI returned by the model.

##10. Jobs Board (Jobs.tsx)
Local Data: A static TypeScript file (data/jobs.ts) acts as the database for job listings.
Array Methods: filter, map, and slice are used heavily for search, filtering, and pagination logic.
4. Utilities & Infrastructure
utils/audio.ts
Base64 Conversion: Custom functions (base64ToUint8Array, arrayBufferToBase64) to convert between binary audio data and strings for API transmission.
PCM Processing: float32ToPCM16 converts browser microphone float data to the 16-bit integers required by the Gemini Live API.
utils/auth.ts
Session Management: Functions to set, get, and clear cookies/localStorage for user sessions.
Mock Database: Logic to read/write arrays of user objects to LocalStorage, simulating a backend database.
components/Layout.tsx

Dark Mode: Uses a useEffect hook to toggle a .dark class on the <html> element, interacting with Tailwind's dark: modifier.
This document covers the complete technological footprint of the InterView X application.
