import SearchPeople from "./SearchPeople";

const SideList = ({ name, data, children }) => {
    return (
        <section className="h-full block bg-base-200 w-72 shrink-0 grow-0">
            <h2 className="mx-2 px-4 h-[52.5px] flex items-center justify-between border-b-2 border-b-base-100 font-medium text-content">
                <span>{ name }</span> 
                {name.toLowerCase() == 'chats' && <SearchPeople />}
            </h2>
            <div className="p-2">
                { children }
            </div>
        </section>
    );
};

export default SideList;
