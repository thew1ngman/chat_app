import { EllipsisVerticalIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

const UserCard = ({ userData, atContactList }) => {
    const { name, email } = userData;

    const openDropdown = (e) => {
        e.preventDefault();
    }

    const DotsButton = () => (
        <button className="w-10 h-10 rounded-full hover:bg-base-200 flex ml-auto items-center justify-center" onClick={openDropdown}>
            <EllipsisVerticalIcon className="w-6 h-6" />
        </button>
    )

    const AddButton = () => (
        <button className="w-10 h-10 rounded-full hover:bg-base-200 flex ml-auto items-center justify-center" onClick={openDropdown}>
            <PlusSmallIcon className="w-6 h-6" />
        </button>
    )

    return (
        <div className="px-4 py-2.5 rounded-lg bg-base-100 flex items-center gap-3 border-2 border-base-200">
            <div className="avatar">
                <div className="w-10 rounded-full">
                    <img src={`https://api.dicebear.com/6.x/thumbs/svg?backgroundType=gradientLinear&backgroundColor=1EAE98&seed=${name}`} alt="avatar" />
                </div>
            </div>
            <div className="space-y-0.5">
                <div className="text-sm">{name}</div>
                <div className="text-xs text-base-content">{email}</div>
            </div>
            { atContactList ? <DotsButton /> : <AddButton /> }
        </div>
    );
}

export default UserCard;