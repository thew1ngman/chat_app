import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeChange from "@_components/ThemeChange";
import { sleep } from "@_utils/helper";

const Login = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    /**
     * @param {React.BaseSyntheticEvent} e
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await sleep(5000);
        setLoading(false);
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
                        <h2 className="card-title bg-primary light:text-neutral-300 dark:text-neutral-200 p-4">
                            Sign in to Chat App!
                        </h2>
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
                            <button type="submit" className="btn btn-primary ml-auto mr-4 w-24">
                                {!loading ? (
                                    <span>Sign in</span>
                                ) : (
                                    <span className="loading loading-spinner loading-sm"></span>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
