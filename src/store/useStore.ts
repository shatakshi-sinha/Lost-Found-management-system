import { create } from 'zustand';
import { User, Item, Message } from '../types';

interface Store {
  user: User | null;
  items: Item[];
  messages: Message[];
  setUser: (user: User | null) => void;
  addItem: (item: Item) => void;
  updateItem: (item: Item) => void;
  addMessage: (message: Message) => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const sampleItems: Item[] = [
  {
    id: '1',
    title: 'Lost iPhone 14 Pro',
    description:
      'Lost my iPhone 14 Pro (Space Gray) near Central Park. Has a black case with a distinctive red stripe. Last seen near the fountain area.',
    location: 'Central Park, New York',
    category: 'Electronics',
    date: '2024-02-15',
    status: 'lost',
    imageUrl: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd',
    userId: '1',
    securityQuestions: [
      { question: 'What is the phone wallpaper?', answer: 'sunset' },
      {
        question: 'What is the last 4 digits of the phone number?',
        answer: '5678',
      },
    ],
  },
  {
    id: '2',
    title: 'Found MacBook Pro',
    description:
      'Found a MacBook Pro (13-inch, Space Gray) at Starbucks on 5th Avenue. Has several tech stickers on the cover.',
    location: 'Starbucks, 5th Avenue',
    category: 'Electronics',
    date: '2024-02-16',
    status: 'found',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
    userId: '2',
    securityQuestions: [
      {
        question: 'What is one of the stickers on the laptop?',
        answer: 'react',
      },
      { question: 'What color is the laptop case?', answer: 'black' },
    ],
  },
  {
    id: '3',
    title: 'Lost Engagement Ring',
    description:
      'Lost my engagement ring at Times Square. Its a white gold ring with a princess cut diamond. Extremely sentimental value.',
    location: 'Times Square, New York',
    category: 'Jewelry',
    date: '2024-02-17',
    status: 'lost',
    imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15',
    userId: '1',
    securityQuestions: [
      { question: 'What is engraved inside the ring?', answer: 'forever' },
      { question: 'What is the carat size?', answer: '1.5' },
    ],
  },
];

const sampleUsers = [
  {
    id: '1',
    email: 'demo@example.com',
    password: 'demo123',
    name: 'Demo User',
    points: 1500,
  },
  {
    id: '2',
    email: 'sarah@example.com',
    password: 'sarah123',
    name: 'Sarah Johnson',
    points: 2500,
  },
];

export const useStore = create<Store>((set) => ({
  user: null,
  items: sampleItems,
  messages: [],
  setUser: (user) => set({ user }),
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  updateItem: (item) =>
    set((state) => ({
      items: state.items.map((i) => (i.id === item.id ? item : i)),
    })),
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  login: (email: string, password: string) => {
    const user = sampleUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      set({ user: userWithoutPassword });
      return true;
    }
    return false;
  },
  logout: () => set({ user: null }),
}));
