import { create } from "zustand";

const useChatStore = create((set) => ({
    chats: [],
    storeChat: (payload) =>
        set((state) => ({
            chats: [...state.chats, payload],
        })),
    clearChats: () => set(() => ({ contacts: [] })),
}));

export default useChatStore;
