
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Info, Check } from 'lucide-react';
import { Footer } from '../components/Footer';

// --- DATA STRUCTURES ---

interface Problem {
  id: string;
  title: string;
  description: string;
  bullets: string[];
}

interface Subtopic {
  id: string;
  title: string;
  problems: Problem[];
}

interface Topic {
  id: string;
  title: string;
  subtopics: Subtopic[];
}

// Updated Data Structure based on specific requirements
const SYSTEM_DESIGN_TOPICS: Topic[] = [
  {
    id: 'media',
    title: 'Media Distribution and Content Delivery Systems',
    subtopics: [
      { 
        id: 'spotify', 
        title: 'Design Spotify', 
        problems: [
          {
            id: 's1',
            title: 'Backend for Music Streaming',
            description: "Develop Spotify's backend to support seamless music streaming across devices, even in constrained networks.",
            bullets: [
              'Efficient data streaming protocols (HLS/DASH)',
              'Low latency transfer and buffering strategies',
              'Data compression techniques and adaptive bitrate streaming'
            ]
          },
          {
            id: 's2',
            title: 'Real-time Collaborative Playlist',
            description: 'Build a system for real-time collaborative playlist editing on Spotify.',
            bullets: [
              'Real-time synchronization (WebSockets/Long Polling)',
              'Scalable editing features with Operational Transformation or CRDTs',
              'Conflict resolution strategies for simultaneous edits'
            ]
          },
          {
            id: 's3',
            title: 'Offline Mode Management',
            description: 'Implement a system on Spotify that allows users to efficiently manage offline playlists and tracks.',
            bullets: [
              'Data synchronization and local storage management',
              'Offline data access security (DRM)',
              'User-friendly interface for storage management'
            ]
          }
        ]
      },
      { 
        id: 'youtube', 
        title: 'Design YouTube', 
        problems: [
          {
            id: 'yt1',
            title: 'Video Upload & Transcoding',
            description: 'Design the video upload pipeline for YouTube to handle massive scale and various video formats.',
            bullets: [
              'Chunked upload for reliability and resumability',
              'Distributed video transcoding pipeline (DAG workflow)',
              'Generating multiple resolutions and adaptive bitrate manifests'
            ]
          },
          {
            id: 'yt2',
            title: 'Content Delivery Network (CDN)',
            description: 'Architect a CDN strategy to serve video content with minimal latency globally.',
            bullets: [
              'Edge caching strategies and cache eviction policies',
              'Load balancing traffic to nearest data centers',
              'Handling "thundering herd" problem for viral videos'
            ]
          },
          {
            id: 'yt3',
            title: 'View Count Architecture',
            description: 'Design a system to count video views accurately and efficiently at YouTube scale.',
            bullets: [
              'Handling high write throughput (sharding counters)',
              'Approximate counting vs Exact counting for analytics vs billing',
              'Preventing fraud and spam views'
            ]
          }
        ] 
      },
      { 
        id: 'netflix', 
        title: 'Design Netflix', 
        problems: [
          {
            id: 'nf1',
            title: 'Global Content Ingestion',
            description: 'Design the pipeline for ingesting high-quality studio masters and preparing them for global streaming.',
            bullets: [
              'Automated quality control (QC) and inspection',
              'Localization (subtitles, audio dubs) workflow management',
              'Encoding optimization (per-title encoding)'
            ]
          },
          {
            id: 'nf2',
            title: 'Open Connect (Custom CDN)',
            description: 'Architect a custom CDN appliance system to pre-position content closer to ISPs.',
            bullets: [
              'Predictive content placement algorithms',
              'Hardware optimization for high throughput streaming',
              'Steering traffic based on network health and ISP peering'
            ]
          },
          {
            id: 'nf3',
            title: 'Personalized Homepage',
            description: 'Design the backend to generate a personalized homepage for millions of users upon login.',
            bullets: [
              'Machine Learning inference at scale for row generation',
              'Pre-computation vs Real-time ranking trade-offs',
              'A/B testing infrastructure for UI layouts'
            ]
          }
        ] 
      },
      { 
        id: 'tiktok', 
        title: 'Design TikTok', 
        problems: [
           {
            id: 'tk1',
            title: 'Video Feed Recommendation',
            description: 'Design the backend for TikToks main feed to serve infinite personalized video streams with minimal latency.',
            bullets: [
                'Recommendation engine architecture',
                'Video pre-loading and caching strategies',
                'Handling heavy write throughput from user interactions'
            ]
           },
           {
            id: 'tk2',
            title: 'Video Editing & Effects',
            description: 'Architect the client-side and server-side processing for applying filters and effects to videos.',
            bullets: [
                'Client-side rendering optimization (OpenGL/Metal)',
                'Syncing audio with video frames precisely',
                'Uploading and processing raw footage vs processed footage'
            ]
           },
           {
            id: 'tk3',
            title: 'Viral Content Distribution',
            description: 'Ensure system stability when a video goes viral and receives millions of concurrent views.',
            bullets: [
                'Hot partitioning issues in databases',
                'Aggressive caching strategies for viral content',
                'CDN bandwidth optimization'
            ]
           }
        ] 
      },
      { 
        id: 'hulu', 
        title: 'Design Hulu', 
        problems: [
          {
            id: 'hu1',
            title: 'Live TV Streaming Infrastructure',
            description: 'Design a system to ingest live satellite feeds and stream them to users over the internet.',
            bullets: [
              'Low latency HLS/DASH streaming',
              'Transcoding live feeds in real-time',
              'Handling ad-breaks in live streams (SCTE-35 markers)'
            ]
          },
          {
            id: 'hu2',
            title: 'Server-Side Ad Insertion (SSAI)',
            description: 'Implement a dynamic ad insertion system that stitches ads directly into the video stream.',
            bullets: [
              'Personalized ad selection in real-time',
              'Manifest manipulation for seamless playback',
              'Tracking ad impressions accurately'
            ]
          },
          {
            id: 'hu3',
            title: 'Cloud DVR System',
            description: 'Architect a Cloud DVR feature allowing users to record live TV programs.',
            bullets: [
              'Write-optimized storage for recording streams',
              'Shared asset storage vs Private copy compliance',
              'Managing storage quotas and retention policies'
            ]
          }
        ] 
      }
    ]
  },
  {
    id: 'real-time',
    title: 'Real-Time Event Handling',
    subtopics: [
      { 
        id: 'facebook', 
        title: 'Design Facebook', 
        problems: [
          {
            id: 'fb1',
            title: 'Real-Time News Feed Generation',
            description: "Design the backend for Facebook's News Feed to deliver real-time updates from friends and followed pages with low latency.",
            bullets: [
              'Feed generation strategies (Fan-out on write vs Fan-out on read)',
              'Handling "hot" celebrity users effectively',
              'Integration with ranking service for feed ordering'
            ]
          },
          {
            id: 'fb2',
            title: 'Live Comments & Reactions',
            description: "Architect a system to handle millions of concurrent comments and reactions during a Facebook Live event.",
            bullets: [
              'High-throughput ingestion of events',
              'Real-time broadcasting to millions of viewers (Pub/Sub)',
              'Throttling and prioritization strategies for UI updates'
            ]
          },
          {
            id: 'fb3',
            title: 'Facebook Messenger',
            description: "Design a scalable real-time chat application supporting 1:1 and Group chats with read receipts and online status.",
            bullets: [
              'Real-time message delivery using WebSockets/MQTT',
              'Efficient storage for chat history (HBase/Cassandra)',
              'Handling user presence and offline message synchronization'
            ]
          }
        ]
      },
      { 
        id: 'chat', 
        title: 'Design WhatsApp', 
        problems: [
          {
            id: 'wa1',
            title: 'End-to-End Encryption',
            description: 'Design the key exchange and message encryption mechanism for a secure chat application.',
            bullets: [
              'Public/Private key management',
              'Double Ratchet algorithm implementation',
              'Forward secrecy and break-in recovery'
            ]
          },
          {
            id: 'wa2',
            title: 'Media Sharing Architecture',
            description: 'Handle the upload and download of images, videos, and documents in a chat environment.',
            bullets: [
              'Blob storage optimization (CDN + Regional Buckets)',
              'Generating and syncing thumbnails',
              'Deduplication of viral media content'
            ]
          },
          {
            id: 'wa3',
            title: 'Last Seen & Status Updates',
            description: 'Implement a presence system to show "Online", "Last Seen", and ephemeral status updates.',
            bullets: [
              'Heartbeat mechanisms for online status',
              'Optimizing status fan-out for user contacts',
              'Privacy controls and data retention'
            ]
          }
        ] 
      },
      { 
        id: 'uber', 
        title: 'Design Uber', 
        problems: [
          {
            id: 'ub1',
            title: 'Driver Location Tracking',
            description: 'Design a system to ingest and process high-frequency GPS location updates from drivers.',
            bullets: [
              'Handling thousands of write requests per second',
              'Geospatial indexing (Quadtree vs S2 Geometry)',
              'Interpolation and map matching for smooth rendering'
            ]
          },
          {
            id: 'ub2',
            title: 'Rider-Driver Matchmaking',
            description: 'Architect the dispatch system to match a rider with the nearest available driver efficiently.',
            bullets: [
              'Geospatial search for nearby drivers',
              'Locking strategies to prevent double booking',
              'Ranking and dispatching algorithms'
            ]
          },
          {
            id: 'ub3',
            title: 'Dynamic Surge Pricing',
            description: 'Implement a real-time surge pricing engine based on supply and demand in a specific area.',
            bullets: [
              'Aggregating demand and supply metrics in real-time',
              'Defining hexagonal zones (H3) for pricing',
              'Consistency of price for user session'
            ]
          }
        ] 
      }
    ]
  },
  {
    id: 'async',
    title: 'Asynchronous Computing and Data Processing',
    subtopics: [
      { 
        id: 'email', 
        title: 'Design Email System', 
        problems: [
          {
            id: 'em1',
            title: 'Mail Transfer & Delivery',
            description: 'Design the core infrastructure for sending and receiving emails reliably.',
            bullets: [
              'SMTP protocol implementation details',
              'Queueing mechanisms for outgoing mail',
              'Handling MX record lookups and DNS resolution'
            ]
          },
          {
            id: 'em2',
            title: 'Mailbox Storage Architecture',
            description: 'Architect a storage system for email that supports immutability of content but mutability of metadata (read/unread).',
            bullets: [
              'Compression and de-duplication of attachments',
              'Partitioning strategies for user mailboxes',
              'Indexing for metadata retrieval'
            ]
          },
          {
            id: 'em3',
            title: 'Full-Text Search',
            description: 'Design a search engine allowing users to search through gigabytes of email history instantly.',
            bullets: [
              'Inverted index construction and updates',
              'Tokenization and language processing',
              'Ranking search results by relevance'
            ]
          }
        ] 
      },
      { 
        id: 'pipeline', 
        title: 'Design Data Pipeline', 
        problems: [
          {
            id: 'dp1',
            title: 'Event Ingestion System',
            description: 'Design a system to ingest millions of events per second from various sources.',
            bullets: [
              'Using distributed logs (Kafka/Pulsar)',
              'Partitioning strategies for ordering and throughput',
              'Handling backpressure and producer failures'
            ]
          },
          {
            id: 'dp2',
            title: 'Stream Processing Architecture',
            description: 'Architect a real-time stream processing layer for aggregation and transformation.',
            bullets: [
              'Windowing techniques (Tumbling vs Sliding)',
              'Handling late-arriving data (Watermarks)',
              'State management in stream processors (Flink/Spark)'
            ]
          },
          {
            id: 'dp3',
            title: 'Data Lake Organization',
            description: 'Design the storage layout for a Data Lake to enable efficient querying.',
            bullets: [
              'Columnar file formats (Parquet/Avro)',
              'Partitioning strategy (Time-based vs Key-based)',
              'Compaction of small files'
            ]
          }
        ] 
      },
      { 
        id: 'scheduler', 
        title: 'Design Task Scheduler', 
        problems: [
          {
            id: 'ts1',
            title: 'Priority Job Queue',
            description: 'Create a task scheduler capable of prioritizing and handling different types of jobs asynchronously.',
            bullets: [
              'Dynamic prioritization of tasks',
              'Scalability to handle thousands of jobs',
              'Robust error handling and retry policies'
            ]
          },
          {
            id: 'ts2',
            title: 'Distributed Cloud Scheduler',
            description: 'Manage tasks distributed across multiple servers in a cloud environment.',
            bullets: [
              'Leader election for scheduler coordination',
              'Partitioning tasks across worker nodes',
              'Handling node failures and re-assignment'
            ]
          },
          {
            id: 'ts3',
            title: 'Delayed Execution System',
            description: 'Implement a system to schedule and execute tasks at specific times or after defined delays.',
            bullets: [
              'Time-wheel or Heap-based timer implementation',
              'Persistence of scheduled tasks',
              'Precision of execution timing'
            ]
          }
        ] 
      },
      { 
        id: 'logs', 
        title: 'Design Log Processing', 
        problems: [
          {
            id: 'lp1',
            title: 'Distributed Log Collection',
            description: 'Design a system to collect logs from thousands of microservices running in containers.',
            bullets: [
              'Sidecar pattern for log shipping (Fluentd/Vector)',
              'Structured vs Unstructured logging',
              'Handling network partitions during log shipping'
            ]
          },
          {
            id: 'lp2',
            title: 'Real-time Log Analysis',
            description: 'Architect a system to detect error spikes or anomalies in logs in real-time.',
            bullets: [
              'Pattern matching on streams',
              'Alerting infrastructure',
              'Sliding window aggregation for error rates'
            ]
          },
          {
            id: 'lp3',
            title: 'Log Search & Archival',
            description: 'Design the storage and retrieval system for logs with variable retention policies.',
            bullets: [
              'Indexing strategy (Elasticsearch/Loki)',
              'Hot-Warm-Cold storage tiering',
              'Cost optimization for high-volume logs'
            ]
          }
        ] 
      },
      { 
        id: 'notification', 
        title: 'Design Notification System', 
        problems: [
          {
            id: 'ns1',
            title: 'Multi-Channel Delivery',
            description: 'Design a system to send notifications via SMS, Email, and Push Notifications.',
            bullets: [
              'Abstraction layer for different providers (Twilio, SendGrid, FCM)',
              'Failover strategies for providers',
              'Priority queues for transactional vs marketing messages'
            ]
          },
          {
            id: 'ns2',
            title: 'User Preferences & Settings',
            description: 'Implement a preference center allowing users to opt-in/out of specific notification types.',
            bullets: [
              'Storing granular user preferences',
              'Checking preferences with low latency before sending',
              'Handling "Do Not Disturb" schedules'
            ]
          },
          {
            id: 'ns3',
            title: 'Rate Limiting & Deduplication',
            description: 'Prevent users from being spammed by duplicate or excessive notifications.',
            bullets: [
              'Sliding window rate limiting per user',
              'Deduplication logic for identical events',
              'Batching updates into a single summary notification'
            ]
          }
        ] 
      }
    ]
  },
  {
    id: 'financial',
    title: 'Financial Transactions and Marketplaces',
    subtopics: [
      { 
        id: 'payment', 
        title: 'Design Payment Gateway', 
        problems: [
          {
            id: 'pg1',
            title: 'Idempotency & Reliability',
            description: 'Ensure that a payment request is processed exactly once, even in the face of network failures.',
            bullets: [
              'Implementing idempotency keys',
              'Handling timeout responses from banks',
              'Transactional state management'
            ]
          },
          {
            id: 'pg2',
            title: 'Payment Routing System',
            description: 'Design a smart router to select the best acquiring bank based on success rates and fees.',
            bullets: [
              'Real-time success rate monitoring',
              'Rule-based routing engine',
              'Fallback mechanisms for failed transactions'
            ]
          },
          {
            id: 'pg3',
            title: 'Reconciliation System',
            description: 'Build a system to verify that internal ledgers match the bank statements.',
            bullets: [
              'Ingesting daily settlement files',
              'Automated matching algorithms',
              'Handling discrepancies and refunds'
            ]
          }
        ] 
      },
      { 
        id: 'stock', 
        title: 'Design Stock Exchange', 
        problems: [
          {
            id: 'se1',
            title: 'Order Matching Engine',
            description: 'Design the core engine that matches buy and sell orders with microsecond latency.',
            bullets: [
              'Limit Order Book data structures',
              'FIFO vs Pro-Rata matching algorithms',
              'Single-threaded vs Concurrent architecture trade-offs'
            ]
          },
          {
            id: 'se2',
            title: 'Market Data Dissemination',
            description: 'Architect a system to broadcast real-time price updates to thousands of subscribers.',
            bullets: [
              'Multicast protocols (UDP) for speed',
              'Handling slow consumers',
              'Sequence numbers for packet loss detection'
            ]
          },
          {
            id: 'se3',
            title: 'Risk Management System',
            description: 'Implement real-time checks to ensure traders have sufficient margin before accepting orders.',
            bullets: [
              'Low-latency balance checking',
              'Position tracking in real-time',
              'Circuit breakers for market volatility'
            ]
          }
        ] 
      }
    ]
  },
  {
    id: 'distributed',
    title: 'Designing Distributed Systems Infrastructure',
    subtopics: [
      { 
        id: 'aws', 
        title: 'Design AWS', 
        problems: [
          {
            id: 'aws1',
            title: 'Elastic Compute Scaling',
            description: 'Design AWS’s elastic compute scaling to handle sudden spikes in demand while optimizing costs.',
            bullets: [
              'Dynamic resource allocation',
              'Cost-efficiency strategies',
              'Minimization of cold-start latency'
            ]
          },
          {
            id: 'aws2',
            title: 'Multi-tenant Isolation',
            description: 'Implement a system in AWS to ensure isolation and security within multi-tenant architectures.',
            bullets: [
              'Hypervisor level isolation (Firecracker)',
              'Network namespaces and VPCs',
              'Noisy neighbor mitigation'
            ]
          },
          {
            id: 'aws3',
            title: 'S3 Object Storage',
            description: 'Architect a highly durable and available object storage service like S3.',
            bullets: [
              'Erasure coding for durability',
              'Consistent hashing for data distribution',
              'Handling metadata at scale'
            ]
          }
        ] 
      },
      { 
        id: 'gcp', 
        title: 'Design Google Cloud', 
        problems: [
          {
            id: 'gcp1',
            title: 'Global Load Balancer',
            description: 'Design a global software-defined load balancer that routes traffic to the nearest healthy datacenter.',
            bullets: [
              'Anycast IP addressing',
              'Health checking at scale',
              'Traffic splitting and canary deployments'
            ]
          },
          {
            id: 'gcp2',
            title: 'Cloud Spanner (Distributed DB)',
            description: 'Understand and design a globally distributed database with strong consistency.',
            bullets: [
              'TrueTime API and synchronized clocks',
              'Paxox/Raft consensus across regions',
              'Synchronous replication trade-offs'
            ]
          },
          {
            id: 'gcp3',
            title: 'Pub/Sub Messaging',
            description: 'Architect a global messaging service that guarantees at-least-once delivery.',
            bullets: [
              'Decoupling publishers and subscribers',
              'Message persistence and storage',
              'Scalable pull/push delivery mechanisms'
            ]
          }
        ] 
      },
      { 
        id: 'azure', 
        title: 'Design Azure', 
        problems: [
          {
            id: 'az1',
            title: 'Cosmos DB',
            description: 'Design a multi-model database service offering multiple consistency levels.',
            bullets: [
              'Tunable consistency models (Strong to Eventual)',
              'Global distribution and replication',
              'Partition management'
            ]
          },
          {
            id: 'az2',
            title: 'Azure Functions (Serverless)',
            description: 'Design a serverless compute platform that scales to zero.',
            bullets: [
              'Event-driven triggers',
              'Container orchestration for short-lived tasks',
              'State management in stateless functions (Durable Functions)'
            ]
          },
          {
            id: 'az3',
            title: 'Active Directory (IAM)',
            description: 'Architect a centralized identity management system for enterprise environments.',
            bullets: [
              'OAuth2 and OIDC protocols',
              'Directory replication and consistency',
              'Federated identity management'
            ]
          }
        ] 
      },
      { 
        id: 'ibm', 
        title: 'Design IBM Cloud', 
        problems: [
          {
            id: 'ibm1',
            title: 'Hybrid Cloud Orchestration',
            description: 'Architect a solution to manage workloads across on-premise mainframes and public cloud.',
            bullets: [
              'Secure connectivity (Direct Link)',
              'Container portability (OpenShift)',
              'Unified control plane'
            ]
          },
          {
            id: 'ibm2',
            title: 'Bare Metal Provisioning',
            description: 'Design a system to provision physical servers automatically for customers.',
            bullets: [
              'PXE boot and OS image deployment',
              'Network configuration automation',
              'Hardware inventory management'
            ]
          },
          {
            id: 'ibm3',
            title: 'Quantum Computing Access',
            description: 'Design a cloud interface to queue and execute jobs on quantum processors.',
            bullets: [
              'Job scheduling for scarce resources',
              'Result retrieval and error correction',
              'Secure access to quantum hardware'
            ]
          }
        ] 
      },
      { 
        id: 'lock', 
        title: 'Design Distributed Lock', 
        problems: [
          {
            id: 'dl1',
            title: 'Lock Manager Architecture',
            description: 'Design a distributed lock manager (DLM) to coordinate access to shared resources.',
            bullets: [
              'Lease mechanisms and timeouts',
              'Fencing tokens to prevent zombie writes',
              'Using consensus (ZooKeeper/Etcd) for state'
            ]
          },
          {
            id: 'dl2',
            title: 'Deadlock Detection',
            description: 'Implement a mechanism to detect and resolve deadlocks in a distributed environment.',
            bullets: [
              'Wait-for graphs',
              'Timeout-based deadlock breaking',
              'Centralized vs Decentralized detection'
            ]
          },
          {
            id: 'dl3',
            title: 'Redis-based Locking (Redlock)',
            description: 'Analyze and design a locking algorithm using Redis instances.',
            bullets: [
              'Quorum-based acquisition',
              'Clock drift handling',
              'Failure recovery scenarios'
            ]
          }
        ] 
      },
      { 
        id: 'kv', 
        title: 'Design Key-Value Store', 
        problems: [
          {
            id: 'kv1',
            title: 'Data Partitioning',
            description: 'Design a partitioning strategy to distribute data evenly across nodes.',
            bullets: [
              'Consistent Hashing',
              'Virtual nodes to handle hot spots',
              'Rebalancing data when nodes join/leave'
            ]
          },
          {
            id: 'kv2',
            title: 'Replication & Consistency',
            description: 'Implement a replication strategy to ensure high availability and durability.',
            bullets: [
              'Leader-Follower vs Leaderless replication',
              'Quorum reads and writes (N, R, W)',
              'Conflict resolution (Vector Clocks vs LWW)'
            ]
          },
          {
            id: 'kv3',
            title: 'Storage Engine',
            description: 'Design the internal storage engine for a write-heavy key-value store.',
            bullets: [
              'LSM Trees vs B-Trees',
              'Memtable, WAL, and SSTables',
              'Bloom filters for read optimization'
            ]
          }
        ] 
      }
    ]
  },
  {
    id: 'misc',
    title: 'Microservices & API Infrastructure',
    subtopics: [
      { 
        id: 'api', 
        title: 'Design APIs and Integration', 
        problems: [
          {
            id: 'api1',
            title: 'API Gateway',
            description: 'Design an API Gateway to act as a single entry point for a microservices architecture.',
            bullets: [
              'Request routing and composition',
              'Authentication and Authorization offloading',
              'Rate limiting and Throttling'
            ]
          },
          {
            id: 'api2',
            title: 'Service Discovery',
            description: 'Implement a service discovery mechanism for dynamic microservices.',
            bullets: [
              'Client-side vs Server-side discovery',
              'Health checking and registration',
              'DNS-based vs Registry-based solutions'
            ]
          },
          {
            id: 'api3',
            title: 'Distributed Tracing',
            description: 'Design a system to trace requests as they propagate through multiple microservices.',
            bullets: [
              'Trace ID propagation',
              'Span collection and aggregation',
              'Sampling strategies to reduce overhead'
            ]
          }
        ] 
      },
      { 
        id: 'iam', 
        title: 'Design Identity and Access Management', 
        problems: [
          {
            id: 'p1',
            title: 'Unified Identity Management System',
            description: 'Develop a unified identity management system across multiple cloud platforms to ensure secure and streamlined access control.',
            bullets: [
              'Efficient integration of identity providers and service platforms',
              'Minimization of authentication and authorization latency',
              'High availability and robust failover mechanisms for identity services'
            ]
          },
          {
            id: 'p2',
            title: 'Cross-Cloud Identity Synchronization',
            description: 'Implement a cross-cloud identity synchronization system to ensure seamless user access and identity verification across different cloud platforms.',
            bullets: [
              'Real-time synchronization of user identities and permissions',
              'Consistency and integrity of identity data across multiple cloud providers',
              'Rapid recovery and failover capabilities to maintain access control during outages'
            ]
          },
          {
            id: 'p3',
            title: 'Centralized Identity Management Protocol',
            description: 'Implement a centralized identity management protocol across multiple cloud services to enhance security and streamline access controls.',
            bullets: [
              'Secure authentication and authorization mechanisms for inter-service communication',
              'Scalable identity management to support an increasing number of services',
              'Comprehensive observability of authentication and authorization transactions'
            ]
          }
        ]
      }
    ]
  }
];

export const SystemDesignInterview: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<Subtopic | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic);
    setStep(2);
  };

  const handleSubtopicSelect = (subtopic: Subtopic) => {
    setSelectedSubtopic(subtopic);
    setStep(3);
  };

  const handleProblemSelect = (problem: Problem) => {
    setSelectedProblem(problem);
  };

  const handleStart = () => {
    if (!selectedProblem || !selectedTopic || !selectedSubtopic) return;

    navigate('/interview', {
      state: {
        role: 'System Design Engineer',
        round: 'System Design',
        difficulty: 'Hard',
        duration: 45,
        company: 'System Design Mock',
        interviewer: 'john',
        // Structured context for the specialized layout
        systemDesignContext: {
            topic: selectedTopic.title,
            subtopic: selectedSubtopic.title,
            problemTitle: selectedProblem.title,
            problemDesc: selectedProblem.description,
            requirements: selectedProblem.bullets
        },
        // Fallback text for the AI System Instruction
        jobDescription: `
          System Design Interview.
          Topic: ${selectedTopic.title} -> ${selectedSubtopic.title}
          Problem: ${selectedProblem.description}
          
          Key Requirements:
          ${selectedProblem.bullets.join('\n')}
        `
      }
    });
  };

  const handleBack = () => {
    if (step === 1) navigate('/');
    else if (step === 2) {
      setStep(1);
      setSelectedTopic(null);
    } else if (step === 3) {
      setStep(2);
      setSelectedSubtopic(null);
      setSelectedProblem(null);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col transition-colors duration-300">
      <div className="flex-1">
        <div className="max-w-6xl mx-auto px-6 py-12">
          
          {/* Header */}
          <div className="mb-10 text-center">
             <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-3">Mock Interview For System Design Engineer</h1>
             <p className="text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
               Sharpen your system design thinking and interview skills with realistic mock interviews tailored for aspiring system design engineers. Prepare effectively for your next system design interview and land your dream role.
             </p>
          </div>

          {/* Stepper */}
          <div className="flex justify-center mb-12">
             <div className="flex items-center gap-4 text-sm font-medium">
                
                {/* Step 1 */}
                <button 
                  onClick={() => { setStep(1); setSelectedTopic(null); setSelectedSubtopic(null); setSelectedProblem(null); }}
                  className={`flex items-center gap-2 ${step >= 1 ? 'text-purple-600 dark:text-purple-400' : 'text-zinc-400'}`}
                >
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-purple-600 text-white' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'}`}>1</div>
                   <span>Select Interview</span>
                </button>

                <ChevronRight size={16} className="text-zinc-300 dark:text-zinc-700" />

                {/* Step 2 */}
                <button 
                  onClick={() => { if (step > 2) { setStep(2); setSelectedSubtopic(null); setSelectedProblem(null); }}}
                  disabled={step < 2}
                  className={`flex items-center gap-2 ${step >= 2 ? 'text-purple-600 dark:text-purple-400' : 'text-zinc-400'}`}
                >
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-purple-600 text-white' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'}`}>2</div>
                   <span>Select Subtopic</span>
                </button>

                <ChevronRight size={16} className="text-zinc-300 dark:text-zinc-700" />

                {/* Step 3 */}
                <div className={`flex items-center gap-2 ${step >= 3 ? 'text-purple-600 dark:text-purple-400' : 'text-zinc-400'}`}>
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-purple-600 text-white' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'}`}>3</div>
                   <span>Select Problem</span>
                </div>

             </div>
          </div>

          {/* --- STEP 1: SELECT TOPIC --- */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
               <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-6">Select Interview</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {SYSTEM_DESIGN_TOPICS.map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => handleTopicSelect(topic)}
                      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 h-32 flex items-center justify-center text-center hover:border-purple-500 dark:hover:border-purple-500 hover:shadow-lg transition-all group"
                    >
                      <span className="font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors text-lg">
                        {topic.title}
                      </span>
                    </button>
                  ))}
               </div>
            </div>
          )}

          {/* --- STEP 2: SELECT SUBTOPIC --- */}
          {step === 2 && selectedTopic && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
               <div className="flex items-center gap-4 mb-6">
                 <button onClick={handleBack} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"><ArrowLeft size={20}/></button>
                 <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">Select Subtopic</h2>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {selectedTopic.subtopics.map((subtopic) => (
                    <button
                      key={subtopic.id}
                      onClick={() => handleSubtopicSelect(subtopic)}
                      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 h-24 flex items-center justify-center text-center hover:border-purple-500 dark:hover:border-purple-500 hover:shadow-lg transition-all group"
                    >
                      <span className="font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {subtopic.title}
                      </span>
                    </button>
                  ))}
               </div>
            </div>
          )}

          {/* --- STEP 3: SELECT PROBLEM --- */}
          {step === 3 && selectedSubtopic && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
               <div className="flex items-center gap-4 mb-2">
                 <button onClick={handleBack} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"><ArrowLeft size={20}/></button>
                 <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">Select a problem from the list below <Info className="inline ml-2 text-zinc-400" size={16}/></h2>
               </div>
               <p className="text-zinc-500 mb-8 ml-12">Provide a design architecture in the next step. (You should practice with high level function design and detailed solution design.)</p>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  {selectedSubtopic.problems.length > 0 ? (
                    selectedSubtopic.problems.map((problem) => (
                      <div 
                        key={problem.id}
                        onClick={() => handleProblemSelect(problem)}
                        className={`cursor-pointer rounded-xl p-6 border transition-all relative ${
                          selectedProblem?.id === problem.id 
                          ? 'bg-purple-50 dark:bg-purple-900/10 border-purple-500 ring-1 ring-purple-500 shadow-md' 
                          : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-purple-300 dark:hover:border-purple-700'
                        }`}
                      >
                        {selectedProblem?.id === problem.id && (
                          <div className="absolute top-4 right-4 text-purple-600 bg-purple-100 dark:bg-purple-900 rounded-full p-1">
                            <Check size={14} strokeWidth={3} />
                          </div>
                        )}
                        <h4 className="font-bold text-zinc-900 dark:text-white mb-2 text-lg">{problem.title}</h4>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-4 font-medium leading-relaxed text-sm">
                          {problem.description}
                        </p>
                        <ul className="space-y-2">
                          {problem.bullets.map((bullet, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                              <span className="mt-1.5 w-1 h-1 bg-zinc-400 rounded-full shrink-0"></span>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-12 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                       <p className="text-zinc-500">More problems coming soon for this subtopic.</p>
                       <p className="text-zinc-400 text-sm mt-2">Try "Real-Time Event Handling" -> "Design Facebook" or "Designing Distributed Systems" -> "Design AWS" for a demo.</p>
                    </div>
                  )}
               </div>

               <div className="flex justify-center">
                  <button 
                    onClick={handleStart}
                    disabled={!selectedProblem}
                    className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-12 py-3.5 rounded-lg font-bold shadow-xl shadow-purple-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 uppercase tracking-wide"
                  >
                    START PRACTICE
                  </button>
               </div>
            </div>
          )}

        </div>
      </div>
      <Footer />
    </div>
  );
};
