export interface User {
  id: string;
  email: string;
  points: number;
  name: string;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  date: string;
  status: 'lost' | 'found' | 'claimed';
  imageUrl?: string;
  userId: string;
  securityQuestions: SecurityQuestion[];
}

export interface SecurityQuestion {
  question: string;
  answer: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  itemId: string;
}