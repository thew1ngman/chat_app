import { Outlet } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import axios from "axios";

// set defaults for axios
axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

const Root = () => {
    return (
        <>
            <Toaster />
            <Outlet />
        </>
     );
}

export default Root;