import { UserGroupIcon, Cog6ToothIcon, ChatBubbleLeftRightIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline"
import { NavLink } from "react-router-dom";

const links = [
    { link: "conversations", name: "Chats", icon: <ChatBubbleLeftIcon className="h-7 w-7" aria-hidden="true"/>},
    { link: "group-conversations", name: "Chat Groups", icon: <ChatBubbleLeftRightIcon className="h-7 w-7" aria-hidden="true"/>},
    { link: "contacts", name: "Contacts", icon: <UserGroupIcon className="h-7 w-7" aria-hidden="true"/>},
    // { link: "/settings", name: "Settings", icon: <Cog6ToothIcon className="h-7 w-7" aria-hidden="true"/>},
];

const Sidenav = () => {
    return ( 
        <aside className="h-full bg-base-100">
            <ul className="h-full flex flex-col">
                {
                    links.map((link, index) => (
                        <li key={index}>
                            <NavLink 
                                to={link.link} 
                                data-tip={link.name}
                                className={({ isActive }) => {
                                    const active  = isActive? 'bg-primary text-white' : 'hover:bg-base-200 bg-base-100';
                                    return `block p-4 tooltip tooltip-right ${active}`
                                }}
                            >
                                {link.icon}
                            </NavLink>
                        </li>
                    ))
                }
            </ul>
        </aside>
     );
}
 
export default Sidenav;