import { getCookie, sleep } from "@_utils/helper";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const notify = (type, message) => toast[type](message);

const CreateUser = () => {
    const navigate = useNavigate();
    const form = useRef(null);
    const [userInputData, setUserInputData] = useState({
        email: "",
        password: "",
        name: "",
        role: "USER",
    });

    const [loading, setLoading] = useState();

    const handleChange = (e) => {
        setUserInputData({ ...userInputData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        axios.post("/create-user", userInputData).then(res => {
            const [user, error] = res.data;

            if (error) notify(error.type, error.message);
            if (user) notify('success', 'User successfully created!');
            setLoading(false);
        }).catch(err => {
            notify( 'error', err.message)
            setLoading(false);
        });

        form.current.reset();
    }

    useEffect(() => {
        const role = getCookie('role');
        if (role != 'admin') navigate('/chat');
    }, []);

    return (
        <div className="w-full p-8 grid place-items-center overflow-auto">
            <form ref={form} onSubmit={handleSubmit} className="overflow-hidden rounded-xl shadow-lg bg-base-100">
                <h2 className="text-lg font-medium py-3 px-6 bg-primary text-white flex items-center gap-2">
                    <span className="inline-block">Create User</span>
                </h2>
                <div className="p-6 space-y-4">
                    <div className="form-control w-full">
                        <input
                            onChange={handleChange}
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="input input-bordered w-full max-w-xs"
                            required
                        />
                    </div>
                    <div className="form-control w-full">
                        <input
                            onChange={handleChange}
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="input input-bordered w-full max-w-xs"
                            required
                        />
                    </div>
                    <div className="form-control w-full">
                        <input
                            onChange={handleChange}
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="input input-bordered w-full max-w-xs"
                            required
                        />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <select
                            required
                            className="select select-bordered"
                            name="role"
                            onChange={handleChange}
                            value={userInputData.role}>
                            <option value="USER">[Role] User</option>
                            <option value="ADMIN">[Role] Admin</option>
                        </select>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="btn btn-primary w-full flex items-center mt-6">
                            {
                                loading ? <Spinner /> : <span>Create</span>
                            }
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreateUser;

const Spinner = () => <span className="loading loading-spinner loading-sm"></span>