import SideList from "@_components/SideList";

const GroupConversation = () => {
    return ( 
        <div className="w-full flex">
            <SideList name="Groups" />
            <div className="grid place-items-center w-full">
                <h3 className="text-center text-lg">Work in Progress...</h3>
            </div>
        </div>
     );
}
 
export default GroupConversation;