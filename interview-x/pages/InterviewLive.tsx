
import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { 
  Mic, MicOff, PhoneOff, Play, Code2, 
  Terminal, Clock, CheckCircle, 
  PlayCircle, Send, BookOpen, BrainCircuit, Lightbulb,
  Award, TrendingUp, AlertTriangle, FileText, Loader2, RefreshCw, Layers,
  VideoOff, AlertCircle, XCircle, Timer, Zap, PenTool, ArrowLeft, Briefcase, ArrowDown, Move
} from 'lucide-react';
import { arrayBufferToBase64, base64ToUint8Array, decodeAudioData, float32ToPCM16 } from '../utils/audio';
import { AudioVisualizer } from '../components/AudioVisualizer';
import { InterviewWhiteboard } from '../components/InterviewWhiteboard';
import { useLocation, useNavigate } from 'react-router-dom';

const API_KEY = process.env.API_KEY || '';
const LIVE_MODEL = 'gemini-2.5-flash-native-audio-preview-09-2025';
const ANALYSIS_MODEL = 'gemini-3-flash-preview';
const JUDGE_MODEL = 'gemini-2.5-flash'; 

// --- QUESTION DATASET ---
type QuestionDifficulty = 'Medium' | 'Hard';

interface Question {
    id: string;
    title: string;
    description: string;
    examples: string;
    constraints: string[];
    difficulty: QuestionDifficulty;
    starterCode: {
        python: string;
        javascript: string;
        java: string;
        cpp: string;
    };
}

const QUESTION_BANK: Question[] = [
    // MEDIUM QUESTIONS
    {
        id: 'm1',
        title: "Longest Substring Without Repeating Characters",
        description: "Given a string s, find the length of the longest substring without repeating characters.",
        examples: "Input: s = 'abcabcbb'\nOutput: 3\nExplanation: The answer is 'abc', with the length of 3.",
        constraints: ["0 <= s.length <= 5 * 10^4", "s consists of English letters, digits, symbols and spaces."],
        difficulty: 'Medium',
        starterCode: {
            python: "class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        # Your code here\n        pass",
            javascript: "/**\n * @param {string} s\n * @return {number}\n */\nvar lengthOfLongestSubstring = function(s) {\n    // Your code here\n};",
            java: "class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // Your code here\n    }\n}",
            cpp: "class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        // Your code here\n    }\n};"
        }
    },
    {
        id: 'm2',
        title: "Container With Most Water",
        description: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water.",
        examples: "Input: height = [1,8,6,2,5,4,8,3,7]\nOutput: 49",
        constraints: ["n == height.length", "2 <= n <= 10^5", "0 <= height[i] <= 10^4"],
        difficulty: 'Medium',
        starterCode: {
            python: "class Solution:\n    def maxArea(self, height: List[int]) -> int:\n        pass",
            javascript: "/**\n * @param {number[]} height\n * @return {number}\n */\nvar maxArea = function(height) {\n};",
            java: "class Solution {\n    public int maxArea(int[] height) {\n    }\n}",
            cpp: "class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n    }\n};"
        }
    },
    {
        id: 'm3',
        title: "Group Anagrams",
        description: "Given an array of strings strs, group the anagrams together. You can return the answer in any order.",
        examples: "Input: strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]\nOutput: [[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]",
        constraints: ["1 <= strs.length <= 10^4", "0 <= strs[i].length <= 100", "strs[i] consists of lowercase English letters."],
        difficulty: 'Medium',
        starterCode: {
            python: "class Solution:\n    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:\n        pass",
            javascript: "/**\n * @param {string[]} strs\n * @return {string[][]}\n */\nvar groupAnagrams = function(strs) {\n};",
            java: "class Solution {\n    public List<List<String>> groupAnagrams(String[] strs) {\n    }\n}",
            cpp: "class Solution {\npublic:\n    vector<vector<string>> groupAnagrams(vector<string>& strs) {\n    }\n};"
        }
    },
    // HARD QUESTIONS
    {
        id: 'h1',
        title: "Median of Two Sorted Arrays",
        description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).",
        examples: "Input: nums1 = [1,3], nums2 = [2]\nOutput: 2.00000",
        constraints: ["nums1.length == m", "nums2.length == n", "0 <= m <= 1000", "0 <= n <= 1000", "1 <= m + n <= 2000"],
        difficulty: 'Hard',
        starterCode: {
            python: "class Solution:\n    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:\n        pass",
            javascript: "/**\n * @param {number[]} nums1\n * @param {number[]} nums2\n * @return {number}\n */\nvar findMedianSortedArrays = function(nums1, nums2) {\n};",
            java: "class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n    }\n}",
            cpp: "class Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n    }\n};"
        }
    },
    {
        id: 'h2',
        title: "Merge k Sorted Lists",
        description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
        examples: "Input: lists = [[1,4,5],[1,3,4],[2,6]]\nOutput: [1,1,2,3,4,4,5,6]",
        constraints: ["k == lists.length", "0 <= k <= 10^4", "0 <= lists[i].length <= 500"],
        difficulty: 'Hard',
        starterCode: {
            python: "class Solution:\n    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:\n        pass",
            javascript: "/**\n * @param {ListNode[]} lists\n * @return {ListNode}\n */\nvar mergeKLists = function(lists) {\n};",
            java: "class Solution {\n    public ListNode mergeKLists(ListNode[] lists) {\n    }\n}",
            cpp: "class Solution {\npublic:\n    ListNode* mergeKLists(vector<ListNode*>& lists) {\n    }\n};"
        }
    },
    {
        id: 'h3',
        title: "Trapping Rain Water",
        description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
        examples: "Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6",
        constraints: ["n == height.length", "1 <= n <= 2 * 10^4", "0 <= height[i] <= 10^5"],
        difficulty: 'Hard',
        starterCode: {
            python: "class Solution:\n    def trap(self, height: List[int]) -> int:\n        pass",
            javascript: "/**\n * @param {number[]} height\n * @return {number}\n */\nvar trap = function(height) {\n};",
            java: "class Solution {\n    public int trap(int[] height) {\n    }\n}",
            cpp: "class Solution {\npublic:\n    int trap(vector<int>& height) {\n    }\n};"
        }
    }
];

// Interviewer Configuration
const INTERVIEWERS = {
    emma: {
        name: "Dr. Emma",
        voice: "Kore",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop&crop=top",
        video: "" 
    },
    john: {
        name: "Dr. John",
        voice: "Fenrir",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=600&fit=crop&crop=top",
        video: "" 
    }
};

interface ReportData {
    score: number;
    feedback: string;
    strengths: string[];
    improvements: string[];
    technicalAccuracy: string;
    communicationStyle: string;
}

interface JudgeResult {
    status: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Compilation Error' | 'Runtime Error';
    testCasesPassed: number;
    totalTestCases: number;
    input?: string;
    expectedOutput?: string;
    actualOutput?: string;
    errorMessage?: string;
    executionTime?: string;
    memoryUsed?: string;
    complexityAnalysis?: string;
}

export const InterviewLive: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const config = location.state || {}; 
  const selectedInterviewer = INTERVIEWERS[(config.interviewer as 'emma' | 'john') || 'emma'];
  const isSystemDesign = config.round === 'System Design';

  // Session State
  const [interviewStatus, setInterviewStatus] = useState<'idle' | 'active' | 'finished'>('idle');
  const [isMicOn, setIsMicOn] = useState(true);
  const [sessionDuration, setSessionDuration] = useState(0);

  // Avatar Video State
  const videoRef = useRef<HTMLVideoElement>(null);
  const [speakingCount, setSpeakingCount] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  
  // Question State
  const [questions, setQuestions] = useState<Question[]>([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  // Editor/Whiteboard Mode State
  const [activeTab, setActiveTab] = useState<'code' | 'whiteboard'>('code');

  // Hidden Transcript State (for analysis only, not shown in UI)
  const [fullTranscript, setFullTranscript] = useState<Array<{role: string, text: string}>>([]);
  
  // Analysis State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [reportData, setReportData] = useState<ReportData | null>(null);

  // Editor State
  const [language, setLanguage] = useState<'python' | 'javascript' | 'java' | 'cpp'>('python');
  const [code, setCode] = useState('');
  const [consoleOutput, setConsoleOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<JudgeResult | null>(null);
  
  // Audio Refs
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);
  
  // Visualizer Refs
  const inputAnalyserRef = useRef<AnalyserNode | null>(null);
  const outputAnalyserRef = useRef<AnalyserNode | null>(null);
  const [inputAnalyser, setInputAnalyser] = useState<AnalyserNode | undefined>(undefined);
  const [outputAnalyser, setOutputAnalyser] = useState<AnalyserNode | undefined>(undefined);

  // Gemini Session Refs
  const sessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  // --- INITIALIZATION & QUESTION SELECTION ---
  useEffect(() => {
    // Force Whiteboard for System Design
    if (isSystemDesign) {
        setActiveTab('whiteboard');
    }

    // Only select questions if we haven't already and we are in a coding round
    if (questions.length === 0 && config.round === 'Coding') {
        const seenIds = JSON.parse(localStorage.getItem('interview_seen_ids') || '[]');
        const availableMedium = QUESTION_BANK.filter(q => q.difficulty === 'Medium' && !seenIds.includes(q.id));
        const availableHard = QUESTION_BANK.filter(q => q.difficulty === 'Hard' && !seenIds.includes(q.id));
        
        let selectedMedium: Question;
        let selectedHard: Question;

        if (availableMedium.length === 0 || availableHard.length === 0) {
            localStorage.setItem('interview_seen_ids', '[]');
            const allMedium = QUESTION_BANK.filter(q => q.difficulty === 'Medium');
            const allHard = QUESTION_BANK.filter(q => q.difficulty === 'Hard');
            selectedMedium = allMedium[Math.floor(Math.random() * allMedium.length)];
            selectedHard = allHard[Math.floor(Math.random() * allHard.length)];
        } else {
            selectedMedium = availableMedium[Math.floor(Math.random() * availableMedium.length)];
            selectedHard = availableHard[Math.floor(Math.random() * availableHard.length)];
        }

        const newSeenIds = [...seenIds, selectedMedium.id, selectedHard.id];
        if (newSeenIds.length > 20) newSeenIds.splice(0, newSeenIds.length - 20);
        localStorage.setItem('interview_seen_ids', JSON.stringify(newSeenIds));

        setQuestions([selectedMedium, selectedHard]);
        setCode(selectedMedium.starterCode['python']);
    }
  }, [config.round, isSystemDesign]);

  const handleQuestionSwitch = (index: number) => {
      setActiveQuestionIndex(index);
      setSubmissionResult(null);
      setConsoleOutput('');
      if (questions[index]) {
          setCode(questions[index].starterCode[language]);
      }
  };

  useEffect(() => {
    let interval: any;
    if (interviewStatus === 'active') {
      interval = setInterval(() => {
        setSessionDuration(prev => {
            if (config.duration && prev >= config.duration * 60) {
                stopSession();
                return prev;
            }
            return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [interviewStatus, config.duration]);

  useEffect(() => {
    if (videoRef.current && !videoError && videoLoaded) {
        if (speakingCount > 0) {
            videoRef.current.play().catch(e => console.warn(`Video play interrupted: ${e.message}`));
        } else {
            videoRef.current.pause();
        }
    }
  }, [speakingCount, videoError, videoLoaded]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value as any;
    setLanguage(newLang);
    if (questions[activeQuestionIndex]) {
        setCode(questions[activeQuestionIndex].starterCode[newLang as keyof typeof questions[0]['starterCode']]);
    }
    setConsoleOutput('');
    setSubmissionResult(null);
  };

  // --- COMPILER JUDGE LOGIC ---
  const executeJudge = async (isSubmission: boolean) => {
      if (!code.trim() || questions.length === 0) return;
      setIsRunning(true);
      setConsoleOutput(isSubmission ? 'Judging Solution...' : 'Running Code...');
      setSubmissionResult(null);

      try {
          const q = questions[activeQuestionIndex];
          const ai = new GoogleGenAI({ apiKey: API_KEY });
          const constraintsText = q.constraints.join('\n');
          const typeOfRun = isSubmission ? "SUBMISSION" : "TEST_RUN";
          
          const prompt = `
          You are a strict Competitive Programming Online Judge.
          Task: Verify correctness and efficiency.
          Context: ${typeOfRun}
          Problem: ${q.title}
          Constraints: ${constraintsText}
          Language: ${language}
          Code: ${code}
          
          Output JSON format ONLY:
          { "status": "Accepted" | "Wrong Answer" | "Time Limit Exceeded" | "Compilation Error" | "Runtime Error", "testCasesPassed": number, "totalTestCases": number, "input": "string", "expectedOutput": "string", "actualOutput": "string", "errorMessage": "string", "executionTime": "string", "memoryUsed": "string", "complexityAnalysis": "string" }
          `;

          const response = await ai.models.generateContent({
              model: JUDGE_MODEL,
              contents: prompt,
              config: { responseMimeType: "application/json" }
          });

          const result: JudgeResult = JSON.parse(response.text);
          setSubmissionResult(result);
          
          if (result.status === 'Accepted') {
              setConsoleOutput(`> Status: ${isSubmission ? 'Accepted (Submitted)' : 'Finished'}\n> Runtime: ${result.executionTime}\n> Memory: ${result.memoryUsed}\n\n${result.complexityAnalysis}`);
          } else {
              setConsoleOutput(`> Status: ${result.status}\n> Input: ${result.input}\n> Output: ${result.actualOutput}\n> Expected: ${result.expectedOutput}\n\n${result.errorMessage || ''}`);
          }
      } catch (error) {
          console.error("Judge Error", error);
          setConsoleOutput("Error: Could not connect to the Judge Service.");
      } finally {
          setIsRunning(false);
      }
  };

  const handleRunCode = () => executeJudge(false);
  const handleSubmitSolution = () => {
    if (interviewStatus !== 'active') {
        alert("Please start the interview first!");
        return;
    }
    executeJudge(true);
  };

  const generateFeedback = async () => {
    setIsAnalyzing(true);
    try {
        const ai = new GoogleGenAI({ apiKey: API_KEY });
        const transcriptText = fullTranscript.length > 0 
            ? fullTranscript.map(t => `${t.role}: ${t.text}`).join('\n')
            : "No transcript available.";
        
        const prompt = `
        Analyze this interview transcript for a ${config.role || 'Software Engineer'} role.
        Round: ${config.round || 'Technical'}
        Transcript: ${transcriptText}

        Output JSON:
        { "score": number, "feedback": "string", "strengths": ["string"], "improvements": ["string"], "technicalAccuracy": "string", "communicationStyle": "string" }
        `;

        const response = await ai.models.generateContent({
            model: ANALYSIS_MODEL,
            contents: prompt,
            config: { responseMimeType: "application/json" }
        });

        const data = JSON.parse(response.text);
        setReportData(data);
        
        const historyItem = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            role: config.role || 'Software Engineer',
            round: config.round || 'Technical',
            score: data.score,
            feedback: data.feedback,
            reportData: data
        };
        const existingHistory = JSON.parse(localStorage.getItem('intervue_history') || '[]');
        localStorage.setItem('intervue_history', JSON.stringify([historyItem, ...existingHistory]));

    } catch (e) {
        console.error("Analysis failed", e);
        setReportData({
            score: 0,
            feedback: "Analysis failed.",
            strengths: [],
            improvements: [],
            technicalAccuracy: "N/A",
            communicationStyle: "N/A"
        });
    } finally {
        setIsAnalyzing(false);
    }
  };

  const connectToLive = async () => {
    if (!API_KEY) { alert("API Key missing"); return; }

    try {
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      inputAudioContextRef.current = inputCtx;
      outputAudioContextRef.current = outputCtx;

      inputAnalyserRef.current = inputCtx.createAnalyser();
      outputAnalyserRef.current = outputCtx.createAnalyser();
      setInputAnalyser(inputAnalyserRef.current);
      setOutputAnalyser(outputAnalyserRef.current);

      const outputNode = outputCtx.createGain();
      outputNode.connect(outputCtx.destination);
      outputNode.connect(outputAnalyserRef.current);

      const ai = new GoogleGenAI({ apiKey: API_KEY });
      const totalTime = config.duration || 15;
      
      let systemInstructionText = "";

      if (config.round === 'Salary Negotiation' && config.salaryContext) {
          const { current, offered, desired, currency } = config.salaryContext;
          systemInstructionText = `
          You are ${selectedInterviewer.name}, a Hiring Manager.
          OFFER DETAILS: Role: ${config.role}, Offered: ${currency}${offered}, Current: ${currency}${current}, Desired: ${currency}${desired}.
          Goal: Negotiate budget limit ${currency}${desired}.
          `;
      } else {
          const resumeContext = config.resumeText 
            ? `\n\nCANDIDATE RESUME:\n${config.resumeText}\nAsk specific intro questions.`
            : '';
          const jobContext = config.company && config.jobDescription 
            ? `\n\nCONTEXT:\nCompany: ${config.company}\nJob: ${config.jobDescription}\n`
            : '';

          systemInstructionText = `You are ${selectedInterviewer.name}, a technical interviewer. Role: ${config.role}. Round: ${config.round}.${resumeContext}${jobContext}`;
          
          if (questions.length > 0 && config.round === 'Coding') {
              systemInstructionText += `
              Conduct ${totalTime} min coding interview. Q1: "${questions[0].title}".
              `;
          }
      }
      
      const sessionPromise = ai.live.connect({
        model: LIVE_MODEL,
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: selectedInterviewer.voice } } },
          systemInstruction: systemInstructionText,
          inputAudioTranscription: {},
          outputAudioTranscription: {}
        },
        callbacks: {
            onopen: async () => {
                setInterviewStatus('active');
                setFullTranscript([]); 
                await startMicrophoneStream(inputCtx, sessionPromise);
            },
            onmessage: async (msg: LiveServerMessage) => await handleServerMessage(msg, outputCtx, outputNode),
            onclose: () => stopSession(),
            onerror: (err) => { console.error(err); stopSession(); }
        }
      });
      sessionRef.current = sessionPromise;
    } catch (e) {
      console.error("Connection failed", e);
      stopSession();
    }
  };

  const startMicrophoneStream = async (ctx: AudioContext, sessionPromise: Promise<any>) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;
      const source = ctx.createMediaStreamSource(stream);
      sourceNodeRef.current = source;
      if (inputAnalyserRef.current) source.connect(inputAnalyserRef.current);

      const processor = ctx.createScriptProcessor(2048, 1, 1);
      processor.onaudioprocess = (e) => {
        if (!inputAudioContextRef.current || inputAudioContextRef.current.state === 'closed') return;
        const inputData = e.inputBuffer.getChannelData(0);
        const pcm16 = float32ToPCM16(inputData);
        const base64Data = arrayBufferToBase64(pcm16.buffer);
        sessionPromise.then(session => session.sendRealtimeInput({ media: { mimeType: 'audio/pcm;rate=16000', data: base64Data } }));
      };
      source.connect(processor);
      processor.connect(ctx.destination);
    } catch (err) { console.error("Mic error", err); }
  };

  const handleServerMessage = async (msg: LiveServerMessage, ctx: AudioContext, outputNode: GainNode) => {
    const inputTx = msg.serverContent?.inputTranscription?.text;
    const outputTx = msg.serverContent?.outputTranscription?.text;
    if (inputTx || outputTx) {
       setFullTranscript(prev => {
         const newLogs = [...prev];
         if (inputTx) newLogs.push({ role: 'Candidate', text: inputTx });
         if (outputTx) newLogs.push({ role: selectedInterviewer.name, text: outputTx });
         return newLogs;
       });
    }

    const audioData = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
    if (audioData && ctx.state !== 'closed') {
        const uint8Array = base64ToUint8Array(audioData);
        const audioBuffer = await decodeAudioData(uint8Array, ctx, 24000, 1);
        const currentTime = ctx.currentTime;
        let startTime = nextStartTimeRef.current < currentTime ? currentTime : nextStartTimeRef.current;
        
        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(outputNode);
        source.start(startTime);
        nextStartTimeRef.current = startTime + audioBuffer.duration;
        sourcesRef.current.add(source);

        const delayMs = (startTime - currentTime) * 1000;
        const startTimeout = setTimeout(() => setSpeakingCount(prev => prev + 1), Math.max(0, delayMs));
        videoTimeoutsRef.current.push(startTimeout);
        source.onended = () => {
            setSpeakingCount(prev => Math.max(0, prev - 1));
            sourcesRef.current.delete(source);
        };
    }

    if (msg.serverContent?.interrupted) {
        sourcesRef.current.forEach(s => s.stop());
        sourcesRef.current.clear();
        nextStartTimeRef.current = 0;
        videoTimeoutsRef.current.forEach(clearTimeout);
        videoTimeoutsRef.current = [];
        setSpeakingCount(0);
    }
  };

  const stopSession = () => {
    if (!sessionRef.current && interviewStatus === 'idle') return;
    if (interviewStatus === 'active') {
        setInterviewStatus('finished');
        generateFeedback(); 
    } else {
        setInterviewStatus('idle');
    }
    
    if (audioStreamRef.current) audioStreamRef.current.getTracks().forEach(t => t.stop());
    if (inputAudioContextRef.current?.state !== 'closed') inputAudioContextRef.current?.close();
    if (outputAudioContextRef.current?.state !== 'closed') outputAudioContextRef.current?.close();
    
    videoTimeoutsRef.current.forEach(clearTimeout);
    setSpeakingCount(0);

    if (sessionRef.current) {
        sessionRef.current.then((s: any) => { try { if(s.close) s.close(); } catch(e) {} });
        sessionRef.current = null;
    }
  };

  useEffect(() => { return () => stopSession(); }, []);

  // --- UI COMPONENTS FOR STANDARD INTERVIEW ---
  const StatusAndAvatarPanel = () => (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-xl transition-colors duration-300">
        <div className="flex items-center justify-between mb-8">
        <h2 className="font-bold text-xl text-zinc-900 dark:text-white">Status</h2>
        <div className="flex items-center gap-2">
            <Clock size={18} className="text-zinc-500" />
            <span className={`font-mono font-bold text-lg ${config.duration && sessionDuration > config.duration * 60 - 60 ? 'text-red-500 animate-pulse' : 'text-zinc-900 dark:text-white'}`}>
                {formatTime(sessionDuration)}
            </span>
        </div>
        </div>

        <div className="mb-8 flex justify-center">
        {interviewStatus === 'active' ? (
            <span className="flex items-center gap-3 text-green-500 text-base font-bold bg-green-500/10 px-4 py-1.5 rounded-full animate-pulse">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full"/> LIVE
            </span>
        ) : interviewStatus === 'finished' ? (
            <span className="text-blue-500 text-base font-bold bg-blue-100 dark:bg-blue-900/30 px-4 py-1.5 rounded-full flex items-center gap-2"><CheckCircle size={16} /> COMPLETED</span>
        ) : (
            <span className="text-zinc-500 text-base font-bold bg-zinc-100 dark:bg-zinc-800 px-4 py-1.5 rounded-full">OFFLINE</span>
        )}
        </div>
        
        <div className="space-y-6">
            {/* Interviewer Avatar */}
            <div className="aspect-[4/3] bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden relative group transition-colors shadow-inner flex items-center justify-center">
            {!videoLoaded && !videoError && selectedInterviewer.video && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-zinc-800">
                    <Loader2 className="animate-spin text-purple-500 mb-2" size={32} /><span className="text-sm text-zinc-400">Loading Avatar...</span>
                </div>
            )}
            {(videoError || !selectedInterviewer.video) && (
                <img src={selectedInterviewer.image} alt={selectedInterviewer.name} className="absolute inset-0 w-full h-full object-cover object-top"/>
            )}
            {!videoError && selectedInterviewer.video && (
                <video ref={videoRef} src={selectedInterviewer.video} className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`} muted loop playsInline onLoadedData={() => setVideoLoaded(true)} onError={() => { setVideoError(true); setVideoLoaded(true); }}/>
            )}
            <div className="absolute bottom-3 left-4 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg text-sm font-mono text-white flex items-center gap-2 border border-white/20 z-10">
                <div className={`w-2.5 h-2.5 rounded-full ${speakingCount > 0 ? 'bg-green-500 animate-pulse' : 'bg-purple-500'}`}></div><span className="font-bold">{selectedInterviewer.name}</span>
            </div>
            </div>

            {/* Candidate Avatar */}
            <div className="aspect-[4/3] bg-zinc-100 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden relative transition-colors">
            <div className="absolute inset-0 flex items-center justify-center">
                    <AudioVisualizer isActive={interviewStatus === 'active' && isMicOn} analyser={inputAnalyser} color="#22d3ee" />
            </div>
            <div className="absolute bottom-3 left-4 bg-white/80 dark:bg-black/60 px-3 py-1.5 rounded-lg text-sm font-mono text-zinc-900 dark:text-zinc-300 flex items-center gap-2 font-bold">
                <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full"></div> You
            </div>
            </div>
        </div>

        <div className="mt-8">
            {interviewStatus === 'idle' ? (
            <button onClick={connectToLive} className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-500/20 hover:scale-[1.02] text-lg">
                <Play size={22} fill="currentColor"/> Start Interview
            </button>
            ) : interviewStatus === 'active' ? (
            <div className="flex gap-4">
                <button onClick={() => setIsMicOn(!isMicOn)} className={`flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${isMicOn ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700' : 'bg-red-100 text-red-600 border border-red-200'}`}>
                    {isMicOn ? <Mic size={22} /> : <MicOff size={22} />}
                </button>
                <button onClick={stopSession} className="flex-1 py-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/50 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                    <PhoneOff size={22} /> End
                </button>
            </div>
            ) : (
            <button onClick={() => { setInterviewStatus('idle'); setSessionDuration(0); setReportData(null); }} className="w-full py-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-xl font-bold transition-all text-lg">
                New Session
            </button>
            )
            }
        </div>
    </div>
  );

  const ReportCard = () => (
    <div className="flex flex-col h-full overflow-y-auto bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden transition-colors duration-300">
        <div className="p-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-2 bg-gradient-to-r from-purple-50 to-white dark:from-purple-900/20 dark:to-zinc-900">
            <Award size={22} className="text-purple-600 dark:text-purple-400"/>
            <h3 className="font-bold text-lg text-zinc-900 dark:text-white">Interview Report Card</h3>
        </div>
        
        {isAnalyzing ? (
            <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
                <Loader2 size={36} className="text-purple-600 animate-spin mb-4" />
                <h4 className="font-semibold text-xl text-zinc-900 dark:text-white mb-2">Analyzing Performance...</h4>
                <p className="text-base text-zinc-500">Generating scores and feedback based on the session.</p>
            </div>
        ) : reportData ? (
            <div className="p-8 space-y-8">
                <div className="text-center">
                    <div className="relative inline-flex items-center justify-center">
                        <svg className="w-40 h-40 transform -rotate-90">
                            <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-zinc-200 dark:text-zinc-800" />
                            <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray={440} strokeDashoffset={440 - (440 * reportData.score) / 100} className="text-purple-600 transition-all duration-1000 ease-out" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-bold text-zinc-900 dark:text-white">{reportData.score}</span>
                            <span className="text-sm text-zinc-500 uppercase font-medium mt-1">Score</span>
                        </div>
                    </div>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                    <h4 className="font-semibold text-base mb-3 text-zinc-900 dark:text-white flex items-center gap-2"><FileText size={18} className="text-blue-500" /> Summary</h4>
                    <p className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed italic">"{reportData.feedback}"</p>
                </div>
                <div className="grid grid-cols-1 gap-6">
                    <div className="bg-green-50 dark:bg-green-900/10 p-5 rounded-2xl border border-green-100 dark:border-green-900/20">
                        <h4 className="font-bold text-sm uppercase text-green-700 dark:text-green-400 mb-4 flex items-center gap-2"><TrendingUp size={16} /> Strengths</h4>
                        <ul className="space-y-3">{reportData.strengths.map((s, i) => <li key={i} className="flex items-start gap-3 text-sm text-green-900 dark:text-green-200"><span className="mt-1.5 w-1.5 h-1.5 bg-green-500 rounded-full shrink-0" />{s}</li>)}</ul>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-900/10 p-5 rounded-2xl border border-orange-100 dark:border-orange-900/20">
                        <h4 className="font-bold text-sm uppercase text-orange-700 dark:text-orange-400 mb-4 flex items-center gap-2"><AlertTriangle size={16} /> Areas for Improvement</h4>
                        <ul className="space-y-3">{reportData.improvements.map((s, i) => <li key={i} className="flex items-start gap-3 text-sm text-orange-900 dark:text-orange-200"><span className="mt-1.5 w-1.5 h-1.5 bg-orange-500 rounded-full shrink-0" />{s}</li>)}</ul>
                    </div>
                </div>
                <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex gap-4">
                    <button onClick={() => { setInterviewStatus('idle'); setSessionDuration(0); setFullTranscript([]); setReportData(null); }} className="flex-1 py-3.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white rounded-xl text-base font-bold transition-colors flex items-center justify-center gap-2"><RefreshCw size={18} /> Retry</button>
                    <button onClick={() => navigate('/')} className="flex-1 py-3.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-base font-bold transition-colors">Dashboard</button>
                </div>
            </div>
        ) : <div className="p-8 text-center text-zinc-500">No report available.</div>}
    </div>
  );

  // --- SYSTEM DESIGN SPECIAL LAYOUT ---
  if (isSystemDesign) {
      const sysContext = config.systemDesignContext || {};
      
      return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black p-4 flex flex-col gap-4 relative">
            <button onClick={() => navigate('/')} className="absolute top-4 left-6 z-50 flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors bg-white/50 dark:bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm text-sm font-medium">
                <ArrowLeft size={16} /> Back
            </button>

            {/* Top Bar: Question */}
            <div className="bg-[#262626] text-white p-6 rounded-t-xl flex justify-between items-start shadow-sm mt-12 md:mt-0">
                <div className="max-w-4xl">
                    <div className="text-xl font-bold mb-2">System Design ( Technical )</div>
                    <div className="space-y-1 text-sm text-zinc-300">
                        <div className="flex gap-2">
                            <span className="font-bold text-white min-w-[80px]">Main:</span>
                            <span>Can you propose a high level design for the following topic? Read description and estimations before you start designing.</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="font-bold text-white min-w-[80px]">Question:</span>
                            <span>{sysContext.topic} – {sysContext.problemTitle}</span>
                        </div>
                        <div className="flex gap-2 mt-2">
                            <span className="font-bold text-white min-w-[80px]">Description:</span>
                            <span>{sysContext.problemDesc}</span>
                        </div>
                        {/* Display Requirements/Estimations */}
                        {sysContext.requirements && sysContext.requirements.length > 0 && (
                            <div className="flex gap-2 mt-2 items-start">
                                <span className="font-bold text-white min-w-[80px]">Estimations:</span>
                                <ul className="list-disc pl-4 space-y-1">
                                    {sysContext.requirements.map((req: string, idx: number) => (
                                        <li key={idx}>{req}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-zinc-800 px-3 py-1.5 rounded text-sm font-mono text-white border border-zinc-700">
                        {formatTime(sessionDuration)}
                    </div>
                </div>
            </div>

            {/* Main Area: Whiteboard */}
            <div className="flex-1 bg-white rounded-b-xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden relative min-h-[600px]">
                <InterviewWhiteboard />
                
                {/* Floating Interviewer Panel */}
                <div className="absolute top-4 right-4 z-20 flex gap-4">
                    {/* Interviewer Video */}
                    <div className="w-48 h-36 bg-zinc-900 rounded-lg shadow-2xl border border-zinc-700 overflow-hidden relative">
                        <img src={selectedInterviewer.image} alt="Interviewer" className="w-full h-full object-cover opacity-80" />
                        <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-0.5 rounded text-[10px] text-white font-bold flex items-center gap-1">
                            <div className={`w-1.5 h-1.5 rounded-full ${speakingCount > 0 ? 'bg-green-500 animate-pulse' : 'bg-zinc-500'}`}></div>
                            {selectedInterviewer.name}
                        </div>
                    </div>
                    
                    {/* User Video (Small) */}
                    <div className="w-48 h-36 bg-zinc-800 rounded-lg shadow-2xl border border-zinc-700 overflow-hidden relative">
                        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                             <AudioVisualizer isActive={interviewStatus === 'active' && isMicOn} analyser={inputAnalyser} color="#22d3ee" />
                        </div>
                        <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-0.5 rounded text-[10px] text-white font-bold">You</div>
                    </div>
                </div>

                {/* Floating Controls */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-zinc-900/90 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-4 shadow-2xl border border-zinc-700 z-30">
                    {interviewStatus === 'active' ? (
                        <>
                            <button onClick={() => setIsMicOn(!isMicOn)} className={`p-3 rounded-full transition-colors ${isMicOn ? 'bg-zinc-700 text-white hover:bg-zinc-600' : 'bg-red-500/20 text-red-500 border border-red-500/50'}`}>
                                {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
                            </button>
                            <div className="h-8 w-px bg-zinc-700"></div>
                            <button onClick={stopSession} className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold text-sm transition-colors flex items-center gap-2">
                                <PhoneOff size={18} /> End Interview
                            </button>
                        </>
                    ) : (
                        <button onClick={connectToLive} className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-full font-bold text-sm transition-colors flex items-center gap-2 shadow-lg shadow-purple-600/30">
                            <Play size={18} fill="currentColor"/> Start Session
                        </button>
                    )}
                </div>
            </div>
            
            {/* Show Report if finished */}
            {interviewStatus === 'finished' && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-black/80 backdrop-blur-sm animate-in fade-in zoom-in duration-300">
                    <div className="w-full max-w-4xl h-[80vh]">
                        <ReportCard />
                    </div>
                </div>
            )}
        </div>
      );
  }

  // --- STANDARD LAYOUT ---
  return (
    <div className="h-full flex flex-col lg:flex-row gap-8 p-8 transition-colors duration-300 bg-zinc-50 dark:bg-black relative">
      <button onClick={() => navigate('/')} className="absolute top-4 left-8 z-50 flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors bg-white/50 dark:bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm text-sm font-medium">
        <ArrowLeft size={18} /> Back
      </button>

      {/* Left Column: Status & Avatars */}
      <div className="w-full lg:w-96 flex flex-col gap-8 mt-12 lg:mt-0">
        <StatusAndAvatarPanel />
      </div>

      {/* Middle Column: IDE/Whiteboard (Hidden for Salary Negotiation) */}
      {config.round === 'Coding' && (
          <div className="flex-1 flex flex-col gap-6 min-w-0 mt-12 lg:mt-0">
             <div className="flex items-center gap-2 bg-zinc-200 dark:bg-zinc-800/50 p-1.5 rounded-xl w-fit self-start">
                 <button onClick={() => setActiveTab('code')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'code' ? 'bg-white dark:bg-zinc-700 text-black dark:text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'}`}><Code2 size={16} /> Code Editor</button>
                 <button onClick={() => setActiveTab('whiteboard')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'whiteboard' ? 'bg-white dark:bg-zinc-700 text-black dark:text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'}`}><PenTool size={16} /> Whiteboard</button>
             </div>
             <div className="flex-1 relative bg-[#1e1e1e] rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden">
                 <div className={`absolute inset-0 flex flex-col bg-[#1e1e1e] transition-opacity duration-300 ${activeTab === 'code' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                     <div className="h-16 bg-[#252526] border-b border-[#111] flex items-center justify-between px-6">
                         <div className="flex items-center gap-6">
                             <div className="flex items-center gap-3 text-zinc-400"><Code2 size={20} className="text-blue-400" /><span className="font-mono text-sm font-bold text-zinc-200">code_editor</span></div>
                             <div className="h-6 w-px bg-zinc-600"></div>
                             <div className="relative">
                                 <select value={language} onChange={handleLanguageChange} className="appearance-none bg-[#333] hover:bg-[#444] text-zinc-200 text-sm font-medium py-2 pl-4 pr-10 rounded-lg border border-[#444] focus:border-blue-500 focus:outline-none cursor-pointer">
                                     <option value="python">Python</option><option value="javascript">JavaScript</option><option value="java">Java</option><option value="cpp">C++</option>
                                 </select>
                             </div>
                         </div>
                         <div className="flex items-center gap-3">
                             <button onClick={handleRunCode} disabled={isRunning} className="flex items-center gap-2 px-5 py-2 bg-[#333] hover:bg-[#444] text-zinc-200 text-sm font-bold rounded-lg transition-colors border border-[#444]">{isRunning ? <PlayCircle size={16} className="animate-spin" /> : <PlayCircle size={16} />} Run Code</button>
                             <button onClick={handleSubmitSolution} disabled={isRunning} className="flex items-center gap-2 px-5 py-2 bg-green-700 hover:bg-green-600 text-white text-sm font-bold rounded-lg transition-colors shadow-lg shadow-green-900/20">{isRunning ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />} Submit Solution</button>
                         </div>
                     </div>
                     <div className="flex-1 flex min-h-0 relative">
                         <div className="w-14 bg-[#1e1e1e] border-r border-[#333] flex flex-col items-end py-6 pr-4 select-none">{code.split('\n').map((_, i) => <div key={i} className="text-[#858585] font-mono text-base leading-7">{i + 1}</div>)}</div>
                         <div className="flex-1 relative overflow-auto"><textarea className="w-full h-full bg-[#1e1e1e] text-[#d4d4d4] font-mono text-base leading-7 p-6 resize-none outline-none caret-white whitespace-pre" value={code} onChange={(e) => setCode(e.target.value)} spellCheck={false} autoCapitalize="off" autoComplete="off" autoCorrect="off" /></div>
                     </div>
                     <div className="h-56 bg-[#1e1e1e] border-t border-[#111] flex flex-col">
                         <div className="px-6 py-3 bg-[#252526] border-b border-[#111] flex items-center justify-between">
                             <div className="flex items-center gap-2 text-zinc-400 text-sm font-bold uppercase tracking-wider"><Terminal size={14} /> Console Output</div>
                             <div className="flex items-center gap-3">
                                 {submissionResult && <span className={`text-xs px-3 py-1 rounded-full font-bold ${submissionResult.status === 'Accepted' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>{submissionResult.status.toUpperCase()}</span>}
                                 <button onClick={() => setConsoleOutput('')} className="text-zinc-500 hover:text-zinc-300"><XCircle size={16} /></button>
                             </div>
                         </div>
                         <div className="flex-1 bg-[#1e1e1e] p-6 overflow-auto font-mono text-sm text-zinc-300 whitespace-pre-wrap">{consoleOutput || <span className="text-zinc-600 italic">Ready to execute...</span>}</div>
                     </div>
                 </div>
                 
                 <div className={`absolute inset-0 bg-white dark:bg-zinc-900 transition-opacity duration-300 ${activeTab === 'whiteboard' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                     <InterviewWhiteboard />
                 </div>
             </div>
          </div>
      )}

      {/* Right Column: Context/Problem/Report */}
      <div className={`w-full ${config.round === 'Coding' ? 'lg:w-[400px]' : 'flex-1'} bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden transition-colors duration-300 mt-12 lg:mt-0`}>
          {interviewStatus === 'finished' ? <ReportCard /> : 
            // Reuse existing ContextPanel logic for Coding/Salary
            (config.round === 'Salary Negotiation' ? (
                <div className="flex flex-col h-full">
                  <div className="p-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-2 bg-zinc-50 dark:bg-zinc-900/50">
                      <Briefcase size={20} className="text-green-600 dark:text-green-400"/>
                      <h3 className="font-bold text-base text-zinc-900 dark:text-white">Negotiation Context</h3>
                  </div>
                  <div className="flex-1 overflow-y-auto p-8 space-y-6">
                      <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                          <h4 className="font-bold text-green-800 dark:text-green-400 text-sm mb-1 uppercase">Offered Salary</h4>
                          <div className="text-3xl font-bold text-zinc-900 dark:text-white">
                              {config.salaryContext?.currency}{parseInt(config.salaryContext?.offered).toLocaleString()}
                          </div>
                      </div>
                      <div className="p-4 bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl">
                          <h4 className="font-bold text-zinc-500 text-sm mb-1 uppercase">Your Target</h4>
                          <div className="text-xl font-bold text-zinc-900 dark:text-white">
                              {config.salaryContext?.currency}{parseInt(config.salaryContext?.desired).toLocaleString()}
                          </div>
                      </div>
                  </div>
              </div>
            ) : config.round === 'Coding' ? (
                <div className="flex flex-col h-full">
                    <div className="p-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/50">
                        <div className="flex items-center gap-2">
                            <BookOpen size={20} className="text-purple-600 dark:text-purple-400"/>
                            <h3 className="font-bold text-base text-zinc-900 dark:text-white">Problem Statement</h3>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => handleQuestionSwitch(0)} className={`px-4 py-1.5 rounded-lg text-xs font-bold ${activeQuestionIndex === 0 ? 'bg-purple-600 text-white' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'}`}>Q1</button>
                            <button onClick={() => handleQuestionSwitch(1)} className={`px-4 py-1.5 rounded-lg text-xs font-bold ${activeQuestionIndex === 1 ? 'bg-purple-600 text-white' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'}`}>Q2</button>
                        </div>
                    </div>
                    {questions.length > 0 && (
                        <div className="flex-1 overflow-y-auto p-8 text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-5">{activeQuestionIndex + 1}. {questions[activeQuestionIndex].title}</h2>
                            <p className="mb-6">{questions[activeQuestionIndex].description}</p>
                            <div className="bg-zinc-100 dark:bg-zinc-800 p-5 rounded-xl mb-8 font-mono text-sm whitespace-pre-wrap">{questions[activeQuestionIndex].examples}</div>
                            <h4 className="font-bold text-zinc-900 dark:text-white mb-3 text-lg">Constraints:</h4>
                            <ul className="list-disc pl-6 space-y-2 mb-6 text-sm font-mono">{questions[activeQuestionIndex].constraints.map((c, i) => <li key={i}>{c}</li>)}</ul>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex flex-col h-full">
                    <div className="p-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-2 bg-zinc-50 dark:bg-zinc-900/50">
                        <Briefcase size={20} className="text-purple-600 dark:text-purple-400"/>
                        <h3 className="font-bold text-base text-zinc-900 dark:text-white">Role Context</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-8 text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">{config.role}</h2>
                        <div className="text-purple-600 dark:text-purple-400 font-bold mb-6 text-sm uppercase tracking-wide">{config.company}</div>
                        <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                            <h4 className="font-bold text-zinc-900 dark:text-white mb-3 text-sm uppercase tracking-wide">Job Description / Context</h4>
                            <p className="text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap leading-relaxed">{config.jobDescription || "Standard interview context."}</p>
                        </div>
                    </div>
                </div>
            ))
          }
      </div>
    </div>
  );
};
