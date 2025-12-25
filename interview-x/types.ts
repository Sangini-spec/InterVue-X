export enum MessageRole {
  USER = 'user',
  MODEL = 'model',
  SYSTEM = 'system'
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: Date;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'Junior' | 'Mid' | 'Senior';
  techStack: string[];
}
