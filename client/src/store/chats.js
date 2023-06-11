import { create } from "zustand";
import { io } from "socket.io-client";
import { uniqueObjectsArray } from "@_utils/helper";

export const socket = io(import.meta.env.VITE_AXIOS_BASE_URL, {
    autoConnect: false,
});

const useChatStore = create((set) => ({
    chats: [],
    currentDestination: { id: null, isGroupChat: false },
    storeChat: (payload) =>
        set((state) => {
            return {
                chats: uniqueObjectsArray([...state.chats, payload], "uuid"),
            };
        }),
    setCurrentDestinationData: (payload) => set(() => ({ currentDestination: payload })),
    clearChats: () => set(() => ({ contacts: [] })),
}));

export default useChatStore;
