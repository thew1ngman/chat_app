import useUserContactStore from "@_store/user-contacts";
import { conversationIdFormat, getCookie, toastNotify } from "@_utils/helper";
import { EllipsisVerticalIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Avatar from "./Avatar";

const UserCard = ({ contactUserData, atContactList, atContactRequests, userHandler }) => {
    const { id, name, email, _count } = contactUserData;
    const { storeContact, deleteContact, contacts } = useUserContactStore((state) => state);
    
    const addToContactList = (e) => {
        e.preventDefault();

        axios
            .post("/add-user-contact", {
                userId: getCookie("user.id"),
                contactUserId: contactUserData.id,
            })
            .then((res) => {
                const [contact, extraData] = res.data;

                if (extraData.type === "error") {
                    toastNotify(extraData.type, extraData.message);
                }
                if (contact != null) {
                    storeContact([{ ...contact.user, contactListId: contact.id }]);
                    console.log(contacts);
                    if (!atContactRequests) userHandler(null);
                }
            })
            .catch((err) => {
                toastNotify("error", err.message);
            });
    };

    const deleteFromContactList = (e) => {
        e.preventDefault();

        axios
            .delete("/delete-user-contact", {
                data: {
                    contactListId: contactUserData.contactListId,
                    conversationId: conversationIdFormat(getCookie("user.id"), contactUserData.id),
                },
            })
            .then((res) => {
                const [_, extraData] = res.data;
                if (extraData.type === "error") {
                    toastNotify(extraData.type, extraData.message);
                }
                deleteContact(contactUserData.contactListId);
                window.location.pathname = "/chat/conversations"; // useNavigate breaks the dropdown
            })
            .catch((err) => {
                toastNotify("error", err.message);
            });
    };

    const DotsButton = () => (
        <div className="dropdown">
            <label
                tabIndex={0}
                className="w-10 h-10 rounded-full hover:bg-base-200 flex ml-auto items-center justify-center"
            >
                <EllipsisVerticalIcon className="w-6 h-6" />
            </label>
            <ul tabIndex={0} className="dropdown-content z-50 menu p-2 shadow-lg bg-base-100 rounded-box w-52">
                <li>
                    <button className="hover:bg-error/30" onClick={deleteFromContactList}>
                        Delete
                    </button>
                </li>
                <li>
                    <span>. . .</span>
                </li>
            </ul>
        </div>
    );

    const AddButton = () => (
        <button
            onClick={addToContactList}
            title="Add to Contacts"
            className="w-10 h-10 rounded-full hover:bg-primary/25 flex ml-auto items-center justify-center"
        >
            <PlusSmallIcon className="w-6 h-6" />
        </button>
    );

    return (
        <div className="px-4 py-2.5 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Avatar name={name} />
                <div className="space-y-0.5">
                    <div className="text-sm space-x-1.5">
                        <span>{name}</span>
                        {id == getCookie("user.id") && <span className="text-xs font-bold text-primary">YOU</span>}
                        {(atContactRequests && _count.chatlines) && <span className="inline-block text-xs font-bold bg-error rounded-full text-base-200 h-2.5 w-2.5"></span>}
                    </div>
                    {!atContactList && <div className="text-xs text-base-content">{email}</div>}
                </div>
            </div>
            {atContactList ? <DotsButton /> : <AddButton />}
        </div>
    );
};

export default UserCard;
