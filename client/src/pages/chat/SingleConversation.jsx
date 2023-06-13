import useUserContactStore from "@_store/user-contacts";
import ContactList from "@_components/ContactList";
import SideList from "@_components/SideList";
import { getCookie } from "@_utils/helper";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const SingleConversation = () => {
    const { contacts, storeContact } = useUserContactStore();
    
    const getUserContacts = () => {
        axios
            .post("/get-user-contacts", { userId: getCookie("user.id") })
            .then((res) => {
                const [userContacts, extraData] = res.data;
                
                if (userContacts == null) console.error(extraData.message);
                const mapped = userContacts.map(contact => {
                    contact.user.contactListId = contact.id;
                    contact.user.chatId = contact.chatId;
                    return contact.user;
                })
                storeContact(mapped);
            })
            .catch((err) => console.error(err.message));
    };

    useEffect(() => {
        getUserContacts();
    }, []);

    return (
        <div className="h-full flex w-full">
            <SideList name="Chats">
                <ContactList contacts={contacts} />
            </SideList>
            <Outlet />
        </div>
    );
};

export default SingleConversation;
