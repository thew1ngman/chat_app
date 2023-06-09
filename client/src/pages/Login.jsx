import ThemeChange from "@_components/ThemeChange";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toastNotify } from "@_utils/helper";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [creds, setCreds] = useState({ email: "", password: "" });
    // const [loginError, setLoginError] = useState(false);
    const [errorData, setErrorData] = useState(false);

    const form = useRef(null);

    /**
     * @param {React.BaseSyntheticEvent} e
     */
    const changeHandler = (e) => {
        if (errorData) setErrorData(false);
        setCreds({ ...creds, [e.target.type]: e.target.value });
    };

    /**
     * @param {React.BaseSyntheticEvent} e
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (creds.email === "" || creds.password === "") return setLoginError(true);

        setLoading(true);
        axios
            .post("/login", creds)
            .then((response) => {
                const data = response.data;

                if (data.isAuthenticated) {
                    // console.log(data);
                    setLoading(false);
                    navigate("/chat");
                }
                if (data.type === "error" || !data.isAuthenticated) {
                    console.log(data.type);
                    toastNotify("error", data.message);
                    setErrorData(true);
                    setLoading(false);
                    // setLoginError(true);
                    setCreds({ email: "", password: "" });
                    form.current.reset();
                }
            })
            .catch((error) => {
                toastNotify("error", error.message);
                setLoading(false);
                // setLoginError(true);
                setCreds({ email: "", password: "" });
                form.current.reset();
            });
    };
    

    return (
        <div className="h-screen overflow-hidden">
            <div className="p-4 flex justify-end">
                <ThemeChange />
            </div>
            <div className="w-screen h-full grid place-items-center pb-32">
                <div className="card w-96 bg-base-100 shadow-xl overflow-hidden">
                    <div className="card-body p-0">
                        <h2 className="card-title bg-primary light:text-neutral-300 dark:text-neutral-200 p-4">
                            Sign in to Chat App!
                        </h2>
                        <form
                            ref={form}
                            onSubmit={handleSubmit}
                            className="card-actions flex flex-col items-center px-4 pb-6 pt-6 gap-6"
                        >
                            <input
                                type="email"
                                placeholder="Email"
                                onChange={changeHandler}
                                required
                                className={`input w-full max-w-xs input-bordered focus:outline-primary`}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                onChange={changeHandler}
                                required
                                className={`input w-full max-w-xs input-bordered focus:outline-primary`}
                            />
                            <div className="flex justify-between px-4 items-center w-full">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-primary w-24 disabled:cursor-not-allowed ml-auto"
                                >
                                    {!loading ? (
                                        <span>Sign in</span>
                                    ) : (
                                        <span className="loading loading-spinner loading-sm"></span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
