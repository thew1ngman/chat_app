import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Guard = ({ children }) => {
    const navigate = useNavigate();
    
    const checkSession = () => {
        axios.post("/session-check").then(res => {
            const auth = res.data.isAuthenticated;
            if (!auth) return navigate("/login");
            return navigate("/chat");
        }).catch(err => {
            console.log(err);
            return navigate("/login");
        });
    }

    useEffect(() => checkSession(), []);
    
    return children;
}

export default Guard;