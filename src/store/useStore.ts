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

// Sample user data for testing
const sampleUsers = [
  {
    id: '1',
    email: 'demo@example.com',
    password: 'demo123',
    name: 'Demo User',
    points: 1500
  },
  {
    id: '2',
    email: 'sarah@example.com',
    password: 'sarah123',
    name: 'Sarah Johnson',
    points: 2500
  }
];

export const useStore = create<Store>((set) => ({
  user: null,
  items: [],
  messages: [],
  setUser: (user) => set({ user }),
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  updateItem: (item) => set((state) => ({
    items: state.items.map((i) => (i.id === item.id ? item : i))
  })),
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message]
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
  logout: () => set({ user: null })
}));