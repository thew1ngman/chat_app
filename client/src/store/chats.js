import { create } from 'zustand';

const useChatStore = create(set => ({
    chats: [],
    storeChat: (payload) => set(state => ({
        chats: [...state.chats, payload]
    }))
}));

export default useChatStore;