import useUserContactStore from "@_store/user-contacts";
import ChatInputBox from "@_components/ChatInputBox";
import ContactList from "@_components/ContactList";
import ChatHistory from "@_components/ChatHistory";
import SideList from "@_components/SideList";
import { getCookie } from "@_utils/helper";
import { useEffect } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";

const SingleConversation = () => {
    const { contacts, storeContact } = useUserContactStore();
    
    const getUserContacts = () => {
        axios
            .post("/get-user-contacts", { userId: getCookie("user.id") })
            .then((res) => {
                const [userContacts, extraData] = res.data;
                
                if (userContacts == null) console.error(extraData.message);
                const mapped = userContacts.map(contact => {
                    contact.user.db_id = contact.id;
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
        <div className="w-full flex">
            <SideList name="Chats">
                <ContactList contacts={contacts} />
            </SideList>
            <Outlet />
        </div>
    );
};

export default SingleConversation;
