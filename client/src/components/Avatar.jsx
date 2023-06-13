const Avatar = ({ name }) => {
    return (
        <div className="avatar">
            <div className="w-9 h-9 rounded-full">
                <img
                    src={`https://api.dicebear.com/6.x/thumbs/svg?&backgroundColor=1EAE98&seed=${name}`}
                    alt="avatar"
                />
            </div>
        </div>
    );
};

export default Avatar;
