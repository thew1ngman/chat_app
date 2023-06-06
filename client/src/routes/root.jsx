import { Navigate, createBrowserRouter } from "react-router-dom";
import SingleConversation from "@_pages/chat/SingleConversation";
import GroupConversation from "@_pages/chat/GroupConversation";
import CreateUser from "@_pages/chat/CreateUser";
import Contacts from "@_pages/chat/Contacts";
import Guard from "@_components/Guard";
import Login from "@_pages/Login";
import Chat from "@_pages/Chat";
import Root from "@_pages/Root";

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
                    },
                    {
                        path: "create-user",
                        element: <CreateUser />
                    }
                ],
            }
        ]
    },
])

export default router