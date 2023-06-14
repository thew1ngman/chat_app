import useUserContactStore from "@_store/user-contacts";
import ContactList from "@_components/ContactList";
import SideList from "@_components/SideList";
import { getCookie } from "@_utils/helper";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SingleConversation = () => {
    const { contacts, storeContact } = useUserContactStore();
    const [contactListRequests, setContactListRequests] = useState();

    const getUserContacts = () => {
        axios
            .post("/get-user-contacts", { userId: getCookie("user.id") })
            .then((res) => {
                const [userContacts, extraData] = res.data;

                if (userContacts == null) console.error(extraData.message);
                const mapped = userContacts.map((contact) => {
                    contact.user.contactListId = contact.id;
                    contact.user.chatId = contact.chatId;
                    return contact.user;
                });
                storeContact(mapped);
            })
            .catch((err) => console.error(err.message));
    };

    // TODO: DB - do not select a contact request if it already exists in contact list
    const getUserContactListRequest = () => {
        axios
            .post("/get-user-contact-list-requests", { userId: getCookie("user.id") })
            .then((res) => {
                const [data, _] = res.data;

                setContactListRequests(data);
            })
            .catch((err) => console.error(err.message));
    };

    useEffect(() => {
        getUserContactListRequest();
        getUserContacts();
    }, []);

    return (
        <div className="h-full flex w-full">
            <SideList name="Chats">
                <ContactList contacts={contacts} requests={contactListRequests} />
            </SideList>
            <Outlet />
        </div>
    );
};

export default SingleConversation;
