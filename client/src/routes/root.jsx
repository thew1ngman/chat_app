import { Navigate, createBrowserRouter } from "react-router-dom";
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
                element: <Login />
            },
            {
                path: "chat",
                element: <Chat />
            }
        ]
    },
])

export default router