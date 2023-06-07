const UserCard = ({userData}) => {
    return ( 
        <div className="p-4 rounded-md shadow-md bg-base-100 flex items-center ga-2">
            <div className="avatar">
                <div className="w-24 rounded-full">
                    <img src={`https://api.dicebear.com/6.x/initials/svg?seed=${userData.name}`} alt="avatar" />
                </div>
            </div>
        </div>
     );
}
 
export default UserCard;