import useUserContactStore from "@_store/user-contacts";
import { getCookie, toastNotify } from "@_utils/helper";
import { EllipsisVerticalIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import axios from "axios";

const UserCard = ({ userData, atContactList, userHandler }) => {
    const { id, name, email } = userData;
    const storeContact = useUserContactStore(state => state.storeContact)

    const openDropdown = (e) => {
        e.preventDefault();
    }

    //TODO: create a global store for user's contact list

    const addToContactList = (e) => {
        e.preventDefault();

        axios.post('/add-user-contact', {
            userId: getCookie('user.id'),
            contactUserId: userData.id
        }).then(res => {
            const [contact, extraData] = res.data;
            toastNotify(extraData.type, extraData.message);
            if (contact != null) {
                storeContact(contact)
                userHandler(null);
            };
        }).catch(err => {
            toastNotify('error', err.message);
        });
    }

    const DotsButton = () => (
        <button className="w-10 h-10 rounded-full hover:bg-base-200 flex ml-auto items-center justify-center" onClick={openDropdown}>
            <EllipsisVerticalIcon className="w-6 h-6" />
        </button>
    )

    const AddButton = () => (
        <button onClick={addToContactList} title="Add to Contacts" className="w-10 h-10 rounded-full hover:bg-base-200 flex ml-auto items-center justify-center">
            <PlusSmallIcon className="w-6 h-6" />
        </button>
    )

    return (
        <div className="px-4 py-2.5 rounded-lg bg-base-100 flex items-center gap-3 border-2 border-base-200">
            <div className="avatar">
                <div className="w-10 rounded-full">
                    <img src={`https://api.dicebear.com/6.x/thumbs/svg?&backgroundColor=1EAE98&seed=${name}`} alt="avatar" />
                </div>
            </div>
            <div className="space-y-0.5">
                <div className="text-sm">
                    {name} { id == getCookie('user.id') && <span className="text-xs font-bold text-primary">YOU</span>}
                </div>
                <div className="text-xs text-base-content">{email}</div>
            </div>
            {atContactList ? <DotsButton /> : <AddButton />}
        </div>
    );
}

export default UserCard;