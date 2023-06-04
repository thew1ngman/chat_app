import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ThemeChange from "@_components/ThemeChange";
import { sleep } from "@_utils/helper";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [creds, setCreds] = useState({ email: "", password: "" });
    const [loginError, setLoginError] = useState(false);
    const [errorData, setErrorData] = useState(false);

    const form = useRef(null);

    /**
     * @param {React.BaseSyntheticEvent} e
     */
    const changeHandler = (e) => {
        if (errorData) setErrorData(false);
        setCreds({...creds, [e.target.type]: e.target.value });
    }

    /**
     * @param {React.BaseSyntheticEvent} e
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (creds.email === "" || creds.password === "") return setLoginError(true);
        
        setLoading(true);
        await sleep(1500);
        axios.post('/login', creds).then((response) => {
            const data = response.data;
            console.log(data)

            if (data.isAuthenticated) {
                setLoading(false);
                navigate('/chat');
            }
            if (data.error === 'Invalid credentials!' || !data.isAuthenticated) {
                setErrorData(true);
                setLoading(false);
                setLoginError(true);
                setCreds({ email: "", password: "" });
                form.current.reset();
            }
        }).catch((error) => {
            console.log(error);
            setLoading(false);
            setLoginError(true);
            setCreds({ email: "", password: "" });
            form.current.reset();
        });
    }

    return (
        <>
            <div className="p-4 flex justify-end">
                <ThemeChange />
            </div>
            <div className="w-screen h-full grid place-items-center overflow-hidden pb-24">
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
                                <p className="text-error">{errorData ? "Invalid credentials!" : ""}</p>
                                <button type="submit" disabled={loading} className="btn btn-primary w-24 disabled:cursor-not-allowed">
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
        </>
    );
};

export default Login;
