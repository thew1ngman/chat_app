import { create } from "zustand";
import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_AXIOS_BASE_URL, {
    autoConnect: false,
});

const useChatStore = create((set) => ({
    chats: [],
    currentDestination: { id: null, isGroupChat: false },
    storeChat: (payload) =>
        set((state) => ({
            chats: [...state.chats, payload],
        })),
    setCurrentDestinationData: (payload) => set(() => ({ currentDestination: payload })),
    clearChats: () => set(() => ({ contacts: [] })),
}));

export default useChatStore;
