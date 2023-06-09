import UserCard from "./UserCard";

const ContactList = ({ contacts }) => {
    return (
        <ul className="flex flex-col mt-2">
            {contacts.map((contact, index) => (
                <li key={index}>
                    <UserCard userData={contact} atContactList={true} />
                </li>
            ))}
        </ul>
    );
};

export default ContactList;
