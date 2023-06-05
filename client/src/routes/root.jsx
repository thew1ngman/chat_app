import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "@_pages/Login";
import Chat from "@_pages/Chat";
import Root from "@_pages/Root";
import Guard from "@_components/Guard";
import SingleConversation from "@_pages/chat/SingleConversation";
import GroupConversation from "@_pages/chat/GroupConversations";
import Contacts from "@_pages/chat/Contacts";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                element: <Navigate to="login" />
            },
            {
                path: "login",
                element: <Guard> <Login /> </Guard>
            },
            {
                path: "chat",
                element: <Guard> <Chat /> </Guard>,
                children: [
                    {
                        index: true,
                        element: <Navigate to="conversations" />
                    },
                    {
                        path: "conversations",
                        element: <SingleConversation />
                    },
                    {
                        path: "group-conversations",
                        element: <GroupConversation />
                    },
                    {
                        path: "contacts",
                        element: <Contacts />
                    }
                ],
            }
        ]
    },
])

export default router