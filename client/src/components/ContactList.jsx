import { NavLink } from "react-router-dom";
import UserCard from "./UserCard";

/**
 * @param {Object} props
 * @param {Array} props.contacts
 * @param {Array} props.requests
 */
const ContactList = ({ contacts, requests }) => {
    /**
     * @param {string} contactName
     * @param {number} contactID
     */
    const str = (contactID, chatId) => {
        return btoa(`${contactID}_${chatId}`);
    };

    const isInContacList = (id) => {
        return contacts.find(contact => contact.id === id);
    }

    return (
        <div>
            <h3 className="text-center text-sm opacity-50 mt-2 mb-2.5">Contacts</h3>
            <ul className="flex flex-col mt-2 gap-2">
                {contacts.map((contact, index) => (
                    <li key={index}>
                        <NavLink
                            to={str(contact.id, contact.chatId)}
                            className={({ isActive }) => {
                                const active = isActive
                                    ? "bg-gradient-to-r from-primary/20 via-primary/20 to-secondary/10 "
                                    : "hover:bg-base-100 ";
                                return `${active}w-full block rounded-lg`;
                            }}
                        >
                            <UserCard contactUserData={contact} atContactList={true} />
                        </NavLink>
                    </li>
                ))}
            </ul>
            <div className="divider my-2 w-4/12 mx-auto"></div>
            <h3 className="text-center text-sm opacity-50 mt-2 mb-2.5">Requests</h3>
            <ul className="flex flex-col mt-2 gap-2">
                {requests?.map((request, index) => {
                    if (isInContacList(request.origin_user.id)) return null;
                    return (
                        <li key={index}>
                            <UserCard contactUserData={request.origin_user} atContactRequests={true} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ContactList;
