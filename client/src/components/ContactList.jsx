import { NavLink } from "react-router-dom";
import UserCard from "./UserCard";

const ContactList = ({ contacts }) => {
    /**
     * @param {string} contactName
     * @param {number} contactID
     */
    const str = (contactID, chatId) => {
        return btoa(
            `${contactID}_${chatId}`);
    };

    return (
        <div>
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
            <ul></ul>
        </div>
    );
};

export default ContactList;
