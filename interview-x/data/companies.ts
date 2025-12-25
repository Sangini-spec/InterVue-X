
export interface CompanyQuestion {
  id: string;
  question: string;
  role: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  frequency: 'High' | 'Medium';
}

export interface CompanyProfile {
  id: string;
  name: string;
  logo: string; // URL or text placeholder
  brandColor: string;
  description: string;
  location: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    youtube?: string;
    instagram?: string;
    website?: string;
  };
  questions: CompanyQuestion[];
}

export const COMPANIES: CompanyProfile[] = [
  {
    id: 'nvidia',
    name: 'NVIDIA',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Nvidia_logo.svg/512px-Nvidia_logo.svg.png',
    brandColor: 'bg-[#76B900]',
    description: 'NVIDIA is the pioneer of GPU-accelerated computing. We specialize in products and platforms for the large, growing markets of gaming, professional visualization, data center, and automotive.',
    location: 'Santa Clara, California',
    socials: {
      linkedin: 'https://www.linkedin.com/company/nvidia',
      twitter: 'https://twitter.com/nvidia',
      youtube: 'https://www.youtube.com/user/nvidia',
      instagram: 'https://www.instagram.com/nvidia',
      website: 'https://www.nvidia.com'
    },
    questions: [
      {
        id: 'n1',
        question: "Explain the architectural differences between a CPU and a GPU. When would you prioritize one over the other?",
        role: "Hardware/Systems Engineer",
        difficulty: "Medium",
        topic: "Computer Architecture",
        frequency: "High"
      },
      {
        id: 'n2',
        question: "What is the Near-Far effect in wireless communication and how does power control mitigate it in CDMA?",
        role: "Hardware Design Engineer",
        difficulty: "Hard",
        topic: "Wireless Comm",
        frequency: "High"
      },
      {
        id: 'n3',
        question: "Implement a CUDA kernel to perform matrix multiplication. How do you optimize for memory coalescing?",
        role: "GPU Software Engineer",
        difficulty: "Hard",
        topic: "CUDA/C++",
        frequency: "High"
      },
      {
        id: 'n4',
        question: "Describe the concept of Setup and Hold time in digital circuits. What happens if these are violated?",
        role: "ASIC Engineer",
        difficulty: "Medium",
        topic: "Digital Logic",
        frequency: "Medium"
      },
      {
        id: 'n5',
        question: "Explain the keyword 'volatile' in C. How is it useful in embedded systems programming?",
        role: "Embedded Engineer",
        difficulty: "Medium",
        topic: "C/Embedded",
        frequency: "High"
      },
      {
        id: 'n6',
        question: "How would you debug a race condition in a multi-threaded application running on a GPU?",
        role: "System Software Engineer",
        difficulty: "Hard",
        topic: "OS/Concurrency",
        frequency: "Medium"
      },
      {
        id: 'n7',
        question: "Tell me about a time you had to innovate to solve a technical problem where standard solutions failed.",
        role: "All Roles",
        difficulty: "Easy",
        topic: "Behavioral",
        frequency: "High"
      }
    ]
  },
  {
    id: 'netflix',
    name: 'Netflix',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/512px-Netflix_2015_logo.svg.png',
    brandColor: 'bg-[#E50914]',
    description: 'Netflix is the world\'s leading streaming entertainment service. We entertain the world with TV series, documentaries, feature films and mobile games across a wide variety of genres and languages.',
    location: 'Los Gatos, California',
    socials: {
      linkedin: 'https://www.linkedin.com/company/netflix',
      twitter: 'https://twitter.com/netflix',
      youtube: 'https://www.youtube.com/netflix',
      instagram: 'https://www.instagram.com/netflix',
      website: 'https://www.netflix.com'
    },
    questions: [
      {
        id: 'nf1',
        question: "Design a video streaming service like Netflix. Focus on content delivery network (CDN) and latency minimization.",
        role: "System Design",
        difficulty: "Hard",
        topic: "Distributed Systems",
        frequency: "High"
      },
      {
        id: 'nf2',
        question: "How would you design a recommendation system to suggest movies based on user history using Collaborative Filtering?",
        role: "Machine Learning Engineer",
        difficulty: "Hard",
        topic: "ML/AI",
        frequency: "High"
      },
      {
        id: 'nf3',
        question: "Explain the concept of 'Chaos Engineering'. Why is it critical for microservices at Netflix scale?",
        role: "SRE / Backend",
        difficulty: "Medium",
        topic: "Reliability",
        frequency: "Medium"
      },
      {
        id: 'nf4',
        question: "Netflix Culture: Tell me about a time you gave difficult feedback to a peer. How was it received?",
        role: "All Roles",
        difficulty: "Medium",
        topic: "Culture/Behavioral",
        frequency: "High"
      },
      {
        id: 'nf5',
        question: "Design a Rate Limiter to prevent API abuse. What algorithm would you use (Token Bucket vs Leaky Bucket)?",
        role: "Backend Engineer",
        difficulty: "Medium",
        topic: "System Design",
        frequency: "High"
      },
      {
        id: 'nf6',
        question: "How does A/B testing work for UI changes? How do you determine statistical significance?",
        role: "Full Stack / Data",
        difficulty: "Medium",
        topic: "Product/Data",
        frequency: "Medium"
      },
      {
        id: 'nf7',
        question: "Explain the difference between Strong Consistency and Eventual Consistency. Which one does Netflix use for 'My List' vs 'Billing'?",
        role: "Database Engineer",
        difficulty: "Hard",
        topic: "Databases",
        frequency: "Medium"
      }
    ]
  },
  {
    id: 'jpmorgan',
    name: 'JPMorgan Chase',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/JPMorgan_Chase.svg/1200px-JPMorgan_Chase.svg.png',
    brandColor: 'bg-[#117ACA]',
    description: 'JPMorgan Chase & Co. is a leading global financial services firm with assets of $3.7 trillion and operations worldwide.',
    location: 'New York, NY',
    socials: {
      linkedin: 'https://www.linkedin.com/company/jpmorganchase',
      twitter: 'https://twitter.com/jpmorgan',
      website: 'https://www.jpmorganchase.com'
    },
    questions: [
      {
        id: 'jp1',
        question: "Given a stream of integers, how would you efficiently calculate the running median using Heaps?",
        role: "Software Engineer",
        difficulty: "Medium",
        topic: "Algorithms",
        frequency: "High"
      },
      {
        id: 'jp2',
        question: "Explain the difference between ACID properties in databases and the CAP theorem. Which is more important for a payment ledger?",
        role: "Backend Engineer",
        difficulty: "Medium",
        topic: "Databases",
        frequency: "High"
      },
      {
        id: 'jp3',
        question: "How do you detect a cycle in a linked list? (Floyd’s Cycle-Finding Algorithm)",
        role: "Associate",
        difficulty: "Easy",
        topic: "Data Structures",
        frequency: "High"
      },
      {
        id: 'jp4',
        question: "How does a HashMap work internally in Java? What happens during a collision?",
        role: "Java Developer",
        difficulty: "Medium",
        topic: "Java Internals",
        frequency: "High"
      },
      {
        id: 'jp5',
        question: "Describe a situation where you had to manage a conflict with a stakeholder or client.",
        role: "All Roles",
        difficulty: "Medium",
        topic: "Behavioral",
        frequency: "High"
      },
      {
        id: 'jp6',
        question: "What is the difference between Monolithic and Microservices architecture? How would you handle transactions in Microservices (Saga Pattern)?",
        role: "System Architect",
        difficulty: "Hard",
        topic: "System Design",
        frequency: "Medium"
      },
      {
        id: 'jp7',
        question: "Write a program to reverse a string without using any built-in functions.",
        role: "Analyst",
        difficulty: "Easy",
        topic: "Coding Basics",
        frequency: "High"
      }
    ]
  },
  {
    id: 'hcl',
    name: 'HCLTech',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/HCL_Tech_logo_2022.svg/800px-HCL_Tech_logo_2022.svg.png',
    brandColor: 'bg-[#005CA9]',
    description: 'HCLTech is a global technology company, home to more than 223,000 people across 60 countries, delivering industry-leading capabilities centered around digital, engineering, and cloud.',
    location: 'Noida, India',
    socials: {
      linkedin: 'https://www.linkedin.com/company/hcltech',
      twitter: 'https://twitter.com/hcltech',
      youtube: 'https://www.youtube.com/user/hcltech',
      website: 'https://www.hcltech.com'
    },
    questions: [
      {
        id: 'hcl1',
        question: "Explain the concept of Polymorphism in Java with a real-world example (Compile-time vs Runtime).",
        role: "Java Developer",
        difficulty: "Easy",
        topic: "OOPs",
        frequency: "High"
      },
      {
        id: 'hcl2',
        question: "What are the different states of a Thread in Java? How do wait() and sleep() differ?",
        role: "Software Engineer",
        difficulty: "Medium",
        topic: "Multi-threading",
        frequency: "Medium"
      },
      {
        id: 'hcl3',
        question: "Difference between abstract class and interface. When would you use one over the other?",
        role: "Developer",
        difficulty: "Easy",
        topic: "Java/C#",
        frequency: "High"
      },
      {
        id: 'hcl4',
        question: "Explain the Left Outer Join vs Inner Join in SQL with an example.",
        role: "Database Developer",
        difficulty: "Easy",
        topic: "SQL",
        frequency: "High"
      },
      {
        id: 'hcl5',
        question: "What is the Virtual DOM in React and how does it improve performance?",
        role: "Frontend Developer",
        difficulty: "Medium",
        topic: "React",
        frequency: "Medium"
      },
      {
        id: 'hcl6',
        question: "Tell me about a project where you faced a tight deadline. How did you handle it?",
        role: "All Roles",
        difficulty: "Easy",
        topic: "Behavioral",
        frequency: "High"
      },
      {
        id: 'hcl7',
        question: "What are the primary differences between C and C++?",
        role: "C++ Developer",
        difficulty: "Easy",
        topic: "Programming Basics",
        frequency: "High"
      }
    ]
  },
  {
    id: 'cognizant',
    name: 'Cognizant',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Cognizant_logo_2022.svg/512px-Cognizant_logo_2022.svg.png',
    brandColor: 'bg-[#0033A0]',
    description: 'Cognizant engineers modern businesses. We help our clients modernize technology, reimagine processes and transform experiences so they can stay ahead in our fast-changing world.',
    location: 'Teaneck, New Jersey',
    socials: {
      linkedin: 'https://www.linkedin.com/company/cognizant',
      website: 'https://www.cognizant.com'
    },
    questions: [
      {
        id: 'cog1',
        question: "Write a SQL query to find the second highest salary from an Employee table.",
        role: "Database Analyst",
        difficulty: "Easy",
        topic: "SQL",
        frequency: "High"
      },
      {
        id: 'cog2',
        question: "What is the difference between REST and SOAP web services? Which format does each use?",
        role: "Web Developer",
        difficulty: "Medium",
        topic: "Web Services",
        frequency: "High"
      },
      {
        id: 'cog3',
        question: "Explain the MVC (Model-View-Controller) architecture.",
        role: "Full Stack",
        difficulty: "Easy",
        topic: "Architecture",
        frequency: "Medium"
      },
      {
        id: 'cog4',
        question: "What is Agile Methodology? Explain the difference between Scrum and Waterfall.",
        role: "Project Manager/Dev",
        difficulty: "Easy",
        topic: "Process",
        frequency: "High"
      },
      {
        id: 'cog5',
        question: "Write a Python function to check if a string is a Palindrome.",
        role: "GenC Developer",
        difficulty: "Easy",
        topic: "Coding",
        frequency: "High"
      },
      {
        id: 'cog6',
        question: "How do you handle exceptions in Java? Explain try, catch, throw, throws, and finally.",
        role: "Java Developer",
        difficulty: "Easy",
        topic: "Java",
        frequency: "High"
      },
      {
        id: 'cog7',
        question: "Describe a time you worked in a team. What role did you play?",
        role: "HR Round",
        difficulty: "Easy",
        topic: "Behavioral",
        frequency: "High"
      }
    ]
  },
  {
    id: 'wipro',
    name: 'Wipro',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Wipro_Primary_Logo_Color_RGB.svg/512px-Wipro_Primary_Logo_Color_RGB.svg.png',
    brandColor: 'bg-[#B1005D]',
    description: 'Wipro Limited is a leading technology services and consulting company focused on building innovative solutions that address clients\' most complex digital transformation needs.',
    location: 'Bangalore, India',
    socials: {
      linkedin: 'https://www.linkedin.com/company/wipro',
      twitter: 'https://twitter.com/wipro',
      website: 'https://www.wipro.com'
    },
    questions: [
      {
        id: 'wip1',
        question: "What is the difference between Call by Value and Call by Reference in C++?",
        role: "Project Engineer",
        difficulty: "Easy",
        topic: "C++",
        frequency: "High"
      },
      {
        id: 'wip2',
        question: "Explain the concept of Normalization in DBMS. What are 1NF, 2NF, and 3NF?",
        role: "Backend Engineer",
        difficulty: "Medium",
        topic: "Database",
        frequency: "High"
      },
      {
        id: 'wip3',
        question: "How does Garbage Collection work in Java? Can we force it?",
        role: "Java Developer",
        difficulty: "Medium",
        topic: "Java Internals",
        frequency: "Medium"
      },
      {
        id: 'wip4',
        question: "What are the four pillars of Object-Oriented Programming (OOP)?",
        role: "Fresher",
        difficulty: "Easy",
        topic: "OOPs",
        frequency: "High"
      },
      {
        id: 'wip5',
        question: "Write a program to generate the Fibonacci series up to N terms.",
        role: "Project Engineer",
        difficulty: "Easy",
        topic: "Coding",
        frequency: "High"
      },
      {
        id: 'wip6',
        question: "Explain the difference between 'final', 'finally', and 'finalize' in Java.",
        role: "Java Developer",
        difficulty: "Medium",
        topic: "Java",
        frequency: "High"
      },
      {
        id: 'wip7',
        question: "Are you willing to relocate? How do you handle working under pressure?",
        role: "HR Round",
        difficulty: "Easy",
        topic: "Behavioral",
        frequency: "High"
      }
    ]
  }
];
