import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "@_pages/Login";
import Chat from "@_pages/Chat";
import Root from "@_pages/Root";
import Guard from "@_components/Guard";

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
                element: <Guard> <Chat /> </Guard>
            }
        ]
    },
])

export default router