import React from "react";
import { useNavigate } from "react-router-dom";
import ThemeChange from "@_components/ThemeChange";

const Login = () => {
    const navigate = useNavigate();
    
    /**
     * @param {React.BaseSyntheticEvent} e
     */
    const handleSubmit = (e) => {
        console.log(e.type, "clicked!");
        
        e.preventDefault();
        navigate("/chat");
    };

    return (
        <>
            <div className="p-4 flex justify-end">
                <ThemeChange />
            </div>
            <div className="w-screen h-full grid place-items-center overflow-hidden pb-20">
                <div className="card w-96 bg-base-100 shadow-xl overflow-hidden">
                    <div className="card-body p-0">
                        <h2 className="card-title bg-primary light:text-neutral-300 dark:text-neutral-200 p-4">Sign in to Chat App!</h2>
                        <form
                            onSubmit={handleSubmit}
                            className="card-actions flex flex-col items-center px-4 pb-6 pt-6 gap-6"
                        >
                            <input
                                type="text"
                                placeholder="Username"
                                className="input input-bordered w-full max-w-xs focus:outline-primary"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="input input-bordered w-full max-w-xs focus:outline-primary"
                            />
                            <button type="submit" className="btn btn-primary ml-auto mr-4">
                                Sign in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
