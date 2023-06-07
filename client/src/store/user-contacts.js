import { create } from "zustand"
import { subscribeWithSelector } from 'zustand/middleware'

const useUserContactStore = create(
    subscribeWithSelector(
        (set) => ({
            contacts: [],
            storeContact: (payload) => set((state) => ({
                contacts: state.contacts.push(payload)
            }))
        })
    )
);

export default useUserContactStore;