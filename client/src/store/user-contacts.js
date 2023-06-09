import { subscribeWithSelector } from "zustand/middleware";
import { uniqueObjectsArray } from "@_utils/helper";
import { create } from "zustand";

const useUserContactStore = create(
    subscribeWithSelector((set) => ({
        contacts: [],
        storeContact: (payload) =>
            set((state) => {
                const newArr = uniqueObjectsArray([...state.contacts, ...payload], "id");
                return { contacts: newArr };
            }),
        deleteContact: (db_id) =>
            set((state) => {
                return { contacts: state.contacts.filter((c) => c.db_id !== db_id) };
            }),
        clearContacts: () => set(() => ({ contacts: [] })),
    }))
);

export default useUserContactStore;
