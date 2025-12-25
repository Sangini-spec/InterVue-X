
export interface JobListing {
  id: string;
  role: string;
  company: string;
  location: string;
  type: 'Internship' | 'Full-time' | 'Contract';
  tags: string[];
  logoColor: string;
  description: string; // Short description for card
  investors?: string;
  aboutCompany?: string;
  aboutRole?: string;
  responsibilities?: string[];
  requirements?: string[];
  applyLink?: string;
}

export const JOBS: JobListing[] = [
  {
    id: 'cars24-ds',
    role: 'Data Science & AI Engineer',
    company: 'CARS24',
    location: 'Gurugram, On-site',
    type: 'Full-time',
    tags: ['Data Science', 'AI', 'Machine Learning'],
    logoColor: 'bg-orange-500',
    description: 'Design, build, and productionize machine learning and AI models to power CARS24’s key use cases.',
    investors: 'SoftBank, DST Global',
    aboutCompany: "CARS24 is one of the world’s largest auto-tech companies, transforming car ownership through intelligent automation and AI. Our goal is to make every milestone of car ownership—buying, maintaining, and selling—completely seamless through a powerful Super App powered by data science and ML.",
    aboutRole: "The Data Science & AI Engineer will design, build, and productionize machine learning and AI models to power CARS24’s key use cases, such as dynamic pricing, fraud detection, and personalization.",
    responsibilities: [
        "Design and deploy ML models for business-critical applications.",
        "Implement NLP and GenAI models for summarization, classification, and retrieval.",
        "Build deep learning models using TensorFlow or PyTorch.",
        "Analyze large datasets using Python (Pandas, NumPy) and visualization libraries (Matplotlib, Seaborn).",
        "Apply ML algorithms (Regression, Classification, Clustering, Tree-based models).",
        "Collaborate with engineering teams to integrate models into production environments.",
        "Query and manage data using SQL.",
        "Deploy ML systems on cloud platforms (AWS/GCP) with MLOps best practices."
    ],
    requirements: [
        "B.Tech/B.E. in Engineering (Tier-1 preferred). MBA/M.Sc. is a plus.",
        "1–3 years of hands-on data science experience.",
        "Strong Python programming and analytical background.",
        "Proficiency in TensorFlow/PyTorch and ML algorithms.",
        "Knowledge of statistics, probability, and model evaluation.",
        "Experience with SQL, cloud platforms, and production pipelines.",
        "Passion for building scalable AI-driven systems."
    ],
    applyLink: "https://careers.cars24.com/"
  },
  {
    id: '1',
    role: 'Operations Intern',
    company: 'GOODERA',
    location: 'Bangalore, On-site',
    type: 'Internship',
    tags: ['Operations', 'Management'],
    logoColor: 'bg-blue-600',
    description: 'Assist in daily operational tasks, coordinate with cross-functional teams, and support project management initiatives.',
    investors: 'Sequoia',
    aboutCompany: "Goodera is a technology platform that helps companies measure and communicate the impact of their CSR, sustainability, and volunteering initiatives.",
    aboutRole: "We are looking for an energetic Operations Intern to assist in the daily operations of our customer success team.",
    responsibilities: [
        "Assist in the planning and execution of daily operational tasks.",
        "Coordinate with cross-functional teams to ensure project timelines are met.",
        "Help in data entry and maintenance of operational databases.",
        "Prepare reports and presentations for internal meetings."
    ],
    requirements: [
        "Currently pursuing a degree in Business Administration or related field.",
        "Strong organizational and time management skills.",
        "Excellent communication and interpersonal skills.",
        "Proficiency in Microsoft Office Suite."
    ],
    applyLink: "https://goodera.com/careers"
  },
  {
    id: '2',
    role: 'Social Media Intern',
    company: 'JODO',
    location: 'Bengaluru, On-site',
    type: 'Internship',
    tags: ['Marketing', 'Social Media'],
    logoColor: 'bg-purple-600',
    description: 'Manage social media channels, create engaging content, and track analytics to grow brand presence.',
    investors: 'Tiger Global',
    aboutCompany: "Jodo is a fintech startup building payment solutions for the education sector in India. We help parents pay school fees with ease.",
    aboutRole: "Join our marketing team to boost our brand presence across social media platforms.",
    responsibilities: [
        "Create engaging content for Instagram, LinkedIn, and Twitter.",
        "Engage with our community and respond to comments/messages.",
        "Track social media analytics and report on performance."
    ],
    requirements: [
        "Passion for social media and content creation.",
        "Basic graphic design skills (Canva/Photoshop).",
        "Excellent written communication skills."
    ],
    applyLink: "https://www.jodo.in/careers"
  },
  {
    id: '3',
    role: 'Risk Execution Specialist',
    company: 'CRED',
    location: 'Bengaluru, Karnataka, Onsite',
    type: 'Full-time',
    tags: ['Risk Management', 'Fintech'],
    logoColor: 'bg-black',
    description: 'Operational risk, process design & governance. Monitor and mitigate risks in payment processing.',
    investors: 'Tiger Global',
    aboutCompany: "CRED is a members-only club that rewards individuals for their financial trustworthiness. We are a high-trust community of creditworthy individuals, merchants, and institutions.",
    aboutRole: "As a Risk Execution Specialist, you will be responsible for monitoring operational risks in our payment systems and ensuring compliance with governance frameworks.",
    responsibilities: [
        "Monitor real-time transaction flows to identify anomalies and potential fraud.",
        "Design and implement process controls to mitigate operational risks.",
        "Collaborate with product and engineering teams to build risk-resistant features.",
        "Conduct root cause analysis for operational failures and implement corrective actions.",
        "Maintain risk registers and report on key risk indicators (KRIs)."
    ],
    requirements: [
        "2-4 years of experience in Operational Risk, Fraud Management, or Trust & Safety in Fintech.",
        "Strong analytical skills and proficiency in SQL.",
        "Understanding of payment gateways, UPI, and credit card processing workflows.",
        "Ability to work in a fast-paced, high-pressure environment."
    ],
    applyLink: "https://careers.cred.club/"
  },
  {
    id: '4',
    role: 'Security Analyst Intern',
    company: 'CLOUDSEK',
    location: 'Bengaluru, On-site',
    type: 'Internship',
    tags: ['Cybersecurity', 'InfoSec'],
    logoColor: 'bg-green-600',
    description: 'Monitor security alerts, conduct vulnerability assessments, and assist in incident response.',
    investors: 'PeakXV',
    aboutCompany: "CloudSEK is an AI-driven Digital Risk Protection platform. We predict cyber threats before they occur.",
    aboutRole: "Join our security research team to analyze emerging threats and help protect our clients from digital risks.",
    responsibilities: [
        "Monitor open source intelligence (OSINT) sources for potential threats.",
        "Assist in vulnerability assessments and penetration testing of client assets.",
        "Analyze phishing campaigns and malware samples.",
        "Prepare technical reports on security incidents and findings."
    ],
    requirements: [
        "Basic understanding of networking concepts (TCP/IP, DNS, HTTP).",
        "Familiarity with security tools like Nmap, Burp Suite, or Wireshark.",
        "Knowledge of OWASP Top 10 vulnerabilities.",
        "Passion for cybersecurity and learning new technologies."
    ],
    applyLink: "https://cloudsek.com/careers/"
  },
  {
    id: '5',
    role: 'Category Executive',
    company: 'INDUSTRYBUYING',
    location: 'New Delhi',
    type: 'Full-time',
    tags: ['E-commerce', 'Sales'],
    logoColor: 'bg-orange-600',
    description: 'Manage product categories, vendor relationships, and inventory planning.',
    investors: 'Sequoia',
    aboutCompany: "Industrybuying is India's leading B2B e-commerce platform for industrial goods.",
    aboutRole: "You will own a specific product category, managing everything from vendor onboarding to pricing strategy.",
    responsibilities: [
        "Onboard new vendors and negotiate pricing and terms.",
        "Analyze category performance metrics and drive growth initiatives.",
        "Manage inventory levels to ensure product availability.",
        "Collaborate with the marketing team to run category-specific promotions."
    ],
    requirements: [
        "1-2 years of experience in category management, sales, or operations.",
        "Strong negotiation and relationship management skills.",
        "Proficiency in Excel and data analysis.",
        "Background in engineering or industrial sectors is a plus."
    ],
    applyLink: "https://www.industrybuying.com/careers/"
  },
  {
    id: '6',
    role: 'Business Analyst',
    company: 'DRIVETRAIN',
    location: 'Remote',
    type: 'Full-time',
    tags: ['SaaS', 'Analytics'],
    logoColor: 'bg-indigo-600',
    description: 'Analyze customer data to drive product adoption and retention strategies.',
    investors: 'Lightspeed',
    aboutCompany: "Drivetrain is a next-gen financial planning and analysis (FP&A) platform that helps businesses scale.",
    aboutRole: "We are looking for a Business Analyst to work closely with our founders and product team to decode customer usage patterns and financial metrics.",
    responsibilities: [
        "Build financial models and forecasts for internal strategy.",
        "Analyze customer product usage data to identify churn risks and upsell opportunities.",
        "Create dashboards using SQL and BI tools (Tableau/Looker).",
        "Work with the engineering team to ensure data integrity and tracking implementation.",
        "Translate complex data into actionable business insights."
    ],
    requirements: [
        "2+ years of experience as a Business Analyst or Data Analyst in a SaaS company.",
        "Expertise in SQL and Python for data manipulation.",
        "Strong understanding of SaaS metrics (ARR, NDR, CAC, LTV).",
        "Excellent communication skills to present findings to stakeholders."
    ],
    applyLink: "https://www.drivetrain.ai/careers"
  },
  {
    id: '7',
    role: 'Product Analyst',
    company: 'FAMAPP',
    location: 'Banglore, On-site',
    type: 'Full-time',
    tags: ['Product', 'Fintech'],
    logoColor: 'bg-yellow-500',
    description: 'Work with product managers to define requirements and analyze feature performance.',
    investors: 'YC',
    aboutCompany: "FamPay (now FamApp) is India’s first neobank for teenagers. We aim to raise a new generation of financially aware Indians.",
    aboutRole: "As a Product Analyst, you will be the eye of the product team, using data to drive decisions on features designed for GenZ.",
    responsibilities: [
        "Define and track key success metrics for new product features.",
        "Conduct A/B tests to optimize user flows and engagement.",
        "Perform funnel analysis to identify drop-off points in the user journey.",
        " Collaborate with design and engineering to implement data-driven improvements."
    ],
    requirements: [
        "1-3 years of experience in product analytics.",
        "Proficiency in tools like Mixpanel, Amplitude, or Google Analytics.",
        "Strong SQL skills.",
        "Empathy for the GenZ user demographic and understanding of consumer apps."
    ],
    applyLink: "https://fampay.in/careers"
  },
  {
    id: '8',
    role: 'Director - Solutions Consulting',
    company: 'RAZORPAY',
    location: 'Bengaluru, Karnataka, Onsite',
    type: 'Full-time',
    tags: ['Sales Engineering', 'Leadership'],
    logoColor: 'bg-blue-500',
    description: 'Lead solutions consulting for fintech clients. Strategy and technical presales leadership.',
    investors: 'YC, Lightspeed, PeakXV',
    aboutCompany: "Razorpay is India's leading payments and banking platform for businesses. We power payments for over 5 million businesses including Facebook, Ola, Zomato, Swiggy, Cred, and more.",
    aboutRole: "We are looking for a seasoned leader to head our Solutions Consulting vertical. You will lead a team of solution architects and engineers who bridge the gap between our products and enterprise client needs.",
    responsibilities: [
        "Lead and scale a high-performing team of Solution Consultants and Pre-sales Engineers.",
        "Partner with the Sales leadership to drive revenue growth through technical wins.",
        "Architect complex payment and banking solutions for large enterprise clients.",
        "Act as a technical advisor to CXOs of top-tier accounts.",
        "Provide market feedback to the Product team to influence the roadmap.",
        "Define best practices for solution design, integration, and go-live processes."
    ],
    requirements: [
        "10+ years of experience in Pre-sales, Solutions Engineering, or Technical Consulting.",
        "5+ years of experience managing and growing teams.",
        "Deep domain expertise in Fintech, Payments, or Banking (UPI, Gateways, Neobanking).",
        "Strong technical background (API integration, system architecture).",
        "Exceptional presentation and stakeholder management skills."
    ],
    applyLink: "https://razorpay.com/jobs/"
  },
  {
    id: '9',
    role: 'Visual Designer',
    company: 'MAXIM AI',
    location: 'Bangalore',
    type: 'Full-time',
    tags: ['Design', 'UI/UX'],
    logoColor: 'bg-pink-600',
    description: 'Create stunning visuals for marketing and product interfaces.',
    investors: 'Lightspeed',
    aboutCompany: "Maxim AI is an AI-powered developer platform that helps engineering teams ship software faster.",
    aboutRole: "We are looking for a Visual Designer to shape our brand identity and product aesthetics.",
    responsibilities: [
        "Design marketing assets, website visuals, and social media graphics.",
        "Collaborate with the product team on UI design systems.",
        "Maintain brand consistency across all touchpoints."
    ],
    requirements: [
        "Portfolio demonstrating strong visual design skills.",
        "Proficiency in Figma, Adobe Creative Suite.",
        "Experience with animation or motion graphics is a plus."
    ],
    applyLink: "https://www.getmaxim.ai/"
  },
  {
    id: 'frontend-maxim',
    role: 'Frontend Software Engineer',
    company: 'MAXIM AI',
    location: 'Bangalore',
    type: 'Full-time',
    tags: ['React', 'Frontend'],
    logoColor: 'bg-pink-600',
    description: 'Build responsive and high-performance user interfaces using React and TypeScript.',
    investors: 'Lightspeed',
    aboutCompany: "Maxim AI provides generative AI evaluation and observability infrastructure.",
    aboutRole: "Build the client-side infrastructure for our AI evaluation platform. You will work on complex data visualizations and interactive dashboards.",
    responsibilities: [
        "Develop scalable frontend architecture using React, Next.js, and TypeScript.",
        "Build reusable component libraries.",
        "Optimize application performance for handling large datasets.",
        "Collaborate with backend engineers to integrate APIs."
    ],
    requirements: [
        "3+ years of experience with React and modern JavaScript ecosystem.",
        "Experience with state management (Redux/Zustand) and data fetching (React Query).",
        "Knowledge of Tailwind CSS and design systems.",
        "Familiarity with AI/LLM concepts is a bonus."
    ],
    applyLink: "https://www.getmaxim.ai/"
  },
  {
    id: 'systems-data-resolve',
    role: 'Systems Software Engineer',
    company: 'DATA RESOLVE',
    location: 'On-site',
    type: 'Full-time',
    tags: ['Systems', 'C++'],
    logoColor: 'bg-blue-800',
    description: 'Develop low-level system components and security drivers.',
    investors: 'Public',
    aboutCompany: "Data Resolve Technologies is a fast-growing cyber security company focusing on Insider Threat Management and User Behavior Analytics.",
    aboutRole: "Work on the core engine of our DLP (Data Loss Prevention) agent.",
    responsibilities: [
        "Design and develop kernel-level drivers and system services in C/C++.",
        "Implement file system filters and network interceptors.",
        "Debug complex system crashes and performance issues.",
        "Ensure compatibility across different OS versions (Windows/Mac/Linux)."
    ],
    requirements: [
        "Strong proficiency in C/C++ and OS internals (Windows/Linux).",
        "Experience with multi-threading and inter-process communication.",
        "Knowledge of kernel debugging tools.",
        "Experience in security domain is preferred."
    ],
    applyLink: "https://dataresolve.com/careers/"
  },
  // Page 2
  {
    id: '10',
    role: 'Senior Software Engineer',
    company: 'NETFLIX',
    location: 'Los Gatos, CA / Remote',
    type: 'Full-time',
    tags: ['Streaming', 'Backend', 'Java'],
    logoColor: 'bg-red-600',
    description: 'Build and scale high-performance backend systems for our content delivery network. Experience with distributed systems required.',
    investors: 'Public',
    aboutCompany: "Netflix is the world's leading streaming entertainment service with over 200 million paid memberships in over 190 countries.",
    aboutRole: "Join our Core Engineering team to build the infrastructure that powers the world's entertainment.",
    responsibilities: [
        "Architect and build highly scalable distributed systems.",
        "Improve reliability and performance of our streaming control plane.",
        "Mentor junior engineers and drive technical excellence."
    ],
    requirements: [
        "5+ years of experience with Java, Spring Boot, and gRPC.",
        "Deep understanding of concurrency, caching, and database design.",
        "Experience with AWS or similar cloud platforms."
    ],
    applyLink: "https://jobs.netflix.com/"
  },
  {
    id: '11',
    role: 'Technical Lead',
    company: 'HCL TECH',
    location: 'Noida / Chennai',
    type: 'Full-time',
    tags: ['Leadership', 'Cloud', 'Java'],
    logoColor: 'bg-blue-700',
    description: 'Lead a team of developers in designing and implementing enterprise-grade cloud solutions.',
    investors: 'Public',
    aboutCompany: "HCLTech is a global technology company, home to more than 223,000 people across 60 countries, delivering industry-leading capabilities centered around digital, engineering, and cloud.",
    aboutRole: "Lead a squad of engineers delivering digital transformation projects for Fortune 500 clients.",
    responsibilities: [
        "Define technical architecture and coding standards for the team.",
        "Manage sprint planning and delivery timelines.",
        "Code reviews and technical mentorship.",
        "Interface with client stakeholders to gather technical requirements."
    ],
    requirements: [
        "8+ years of software development experience.",
        "Strong expertise in Java/J2EE and Microservices architecture.",
        "Experience with Cloud platforms (Azure/AWS).",
        "Previous experience leading a team of 5+ developers."
    ],
    applyLink: "https://www.hcltech.com/careers"
  },
  {
    id: '12',
    role: 'App Development Associate',
    company: 'ACCENTURE',
    location: 'Bangalore / Hyderabad',
    type: 'Full-time',
    tags: ['Full Stack', 'Consulting'],
    logoColor: 'bg-purple-700',
    description: 'Develop and maintain software applications. Collaborate with clients to gather requirements and deliver solutions.',
    investors: 'Public',
    aboutCompany: "Accenture is a global professional services company with leading capabilities in digital, cloud and security.",
    aboutRole: "Entry-level role for developers to work on large-scale enterprise applications.",
    responsibilities: [
        "Write clean, testable code in Java, C#, or Python.",
        "Assist in debugging and resolving production issues.",
        "Participate in Agile ceremonies.",
        "Document technical specifications."
    ],
    requirements: [
        "Bachelor's degree in Computer Science or related field.",
        "Knowledge of SDLC and Object Oriented Programming.",
        "Basic understanding of databases (SQL).",
        "Good communication skills."
    ],
    applyLink: "https://www.accenture.com/in-en/careers"
  },
  {
    id: '13',
    role: 'Systems Engineer',
    company: 'INFOSYS',
    location: 'Pune / Mysore',
    type: 'Full-time',
    tags: ['System Design', 'Maintenance'],
    logoColor: 'bg-blue-500',
    description: 'Design, develop, and test software systems. Ensure system reliability and performance.',
    investors: 'Public',
    aboutCompany: "Infosys is a global leader in next-generation digital services and consulting.",
    aboutRole: "As a Systems Engineer, you will contribute to the development lifecycle of software projects for global clients.",
    responsibilities: [
        "Implement software solutions based on detailed designs.",
        "Conduct unit testing and integration testing.",
        "Maintain and upgrade existing systems.",
        "Collaborate with cross-functional teams."
    ],
    requirements: [
        "B.E./B.Tech/MCA degree.",
        "Proficiency in at least one programming language (Java/Python/C++).",
        "Strong analytical and problem-solving skills.",
        "Willingness to learn new technologies."
    ],
    applyLink: "https://www.infosys.com/careers/"
  },
  {
    id: '14',
    role: 'Software Engineer, Early Career',
    company: 'GOOGLE',
    location: 'Mountain View / Bangalore',
    type: 'Full-time',
    tags: ['Algorithms', 'Distributed Systems'],
    logoColor: 'bg-blue-500',
    description: 'Solve complex problems in search, cloud, and AI. Strong algorithmic foundations required.',
    investors: 'Public',
    aboutCompany: "Google's mission is to organize the world's information and make it universally accessible and useful.",
    aboutRole: "Work on core Google products like Search, Gmail, Cloud, or YouTube. Focus on scale and reliability.",
    responsibilities: [
        "Design, develop, test, deploy, maintain and improve software.",
        "Manage individual project priorities, deadlines and deliverables.",
        "Collaborate with other engineers to solve complex technical problems."
    ],
    requirements: [
        "BS degree in Computer Science or equivalent practical experience.",
        "Experience with one or more general purpose programming languages including but not limited to: Java, C/C++, C#, Objective C, Python, JavaScript, or Go.",
        "Strong foundation in data structures and algorithms."
    ],
    applyLink: "https://careers.google.com/"
  },
  {
    id: '15',
    role: 'Front End Engineer',
    company: 'META',
    location: 'Menlo Park / Remote',
    type: 'Full-time',
    tags: ['React', 'UI/UX'],
    logoColor: 'bg-blue-600',
    description: 'Build intuitive and responsive user interfaces for billions of users. Expertise in React and JavaScript needed.',
    investors: 'Public',
    aboutCompany: "Meta builds technologies that help people connect, find communities, and grow businesses.",
    aboutRole: "Build the UI for Facebook, Instagram, or WhatsApp. Work with React, Relay, and GraphQL.",
    responsibilities: [
        "Implement user-facing features using React and GraphQL.",
        "Optimize applications for maximum speed and scalability.",
        "Collaborate with designers to ensure high-quality visual standards."
    ],
    requirements: [
        "3+ years of experience in frontend development.",
        "Deep understanding of JavaScript, CSS, and HTML.",
        "Experience with React and modern frontend build pipelines."
    ],
    applyLink: "https://www.metacareers.com/"
  },
  {
    id: '16',
    role: 'Autopilot Software Intern',
    company: 'TESLA',
    location: 'Palo Alto, CA',
    type: 'Internship',
    tags: ['AI', 'C++', 'Robotics'],
    logoColor: 'bg-red-700',
    description: 'Contribute to the development of autonomous driving software. Work on perception, planning, or control systems.',
    investors: 'Public',
    aboutCompany: "Tesla accelerates the world's transition to sustainable energy.",
    aboutRole: "Join the Autopilot team to work on computer vision, neural networks, and path planning for Full Self-Driving.",
    responsibilities: [
        "Develop C++ software for real-time embedded systems.",
        "Analyze field data to improve Autopilot performance.",
        "Implement and optimize algorithms for vehicle control and perception."
    ],
    requirements: [
        "Pursuing a degree in CS, Robotics, or Electrical Engineering.",
        "Strong C++ programming skills.",
        "Familiarity with CUDA, Computer Vision, or Control Theory."
    ],
    applyLink: "https://www.tesla.com/careers"
  },
  {
    id: '17',
    role: 'Cloud Solution Architect',
    company: 'MICROSOFT',
    location: 'Redmond / Bangalore',
    type: 'Full-time',
    tags: ['Azure', 'Cloud', 'Architecture'],
    logoColor: 'bg-blue-400',
    description: 'Design scalable and secure cloud solutions on Azure. Advise enterprise customers on cloud adoption.',
    investors: 'Public',
    aboutCompany: "Microsoft enables digital transformation for the era of an intelligent cloud and an intelligent edge.",
    aboutRole: "Drive high-priority customer initiatives on the Microsoft Azure Platform in collaboration with customers and the Microsoft field.",
    responsibilities: [
        "Design cloud-native architectures for enterprise customers.",
        "Provide technical leadership in cloud migration projects.",
        "Create proof-of-concepts (POCs) to demonstrate Azure capabilities."
    ],
    requirements: [
        "5+ years of experience in cloud architecture (Azure/AWS/GCP).",
        "Experience with Kubernetes, Microservices, and DevOps.",
        "Strong customer-facing communication skills."
    ],
    applyLink: "https://careers.microsoft.com/"
  },
  {
    id: '18',
    role: 'Software Development Engineer',
    company: 'AMAZON',
    location: 'Seattle / Hyderabad',
    type: 'Full-time',
    tags: ['AWS', 'E-commerce'],
    logoColor: 'bg-yellow-600',
    description: 'Design and build distributed systems for AWS or Amazon retail. Focus on scalability and operational excellence.',
    investors: 'Public',
    aboutCompany: "Amazon strives to be Earth's most customer-centric company.",
    aboutRole: "Build critical services for AWS or Amazon.com. Work on systems that handle millions of requests per second.",
    responsibilities: [
        "Design object-oriented software and build distributed systems.",
        "Operate your services in production with high availability.",
        "Drive operational excellence and code quality."
    ],
    requirements: [
        "Proficiency in Java, C++, or C#.",
        "Strong knowledge of scalable system design and data structures.",
        "Experience with SOA and web services.",
        "Obsession with customer experience."
    ],
    applyLink: "https://www.amazon.jobs/"
  }
];
