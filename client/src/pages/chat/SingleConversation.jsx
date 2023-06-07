import { MagnifyingGlassIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import ChatInputBox from "@_components/ChatInputBox";
import ChatHistory from "@_components/ChatHistory";
import SideList from "@_components/SideList"
import { sleep } from "@_utils/helper";
import { useState } from "react";
import axios from "axios";

const SingleConversation = () => {
    const [loading, setLoading] = useState(false);
    const [inputEmail, setInputEmail] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post('/search-user', { email: inputEmail })
            .then(res => {
                console.log(res.data)
                setLoading(false);
            })
            .catch(err => console.log(err));
    }
    
    return (
        <div className="w-full flex">
            <SideList name="Chats">
                <button className="btn btn-primary btn-outline w-full capitalize" onClick={()=>window.search_modal.showModal()}>
                    Search People
                    <MagnifyingGlassIcon className="w-5 h-5 stroke-2" />
                </button>
                <dialog id="search_modal" className="modal">
                    <form onSubmit={handleSearch} className="modal-box">
                        <div className="flex gap-2 items-center">
                            <input
                                onChange={e => setInputEmail(e.target.value)} 
                                type="search" 
                                name="search" 
                                id="search" 
                                placeholder="Search by Email"
                                className="input input-primary w-full input-bordered" 
                            />
                            <button type="submit" className="btn btn-primary w-24">
                                { loading ? <span className="loading loading-spinner"></span> : 'Search'}
                            </button>
                        </div>
                        <div className="divider"></div>
                        <div>
                            <span className="text-neutral-content block text-center">Results</span>
                        </div>
                    </form>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </SideList>
            <div className="w-full py-2.5 px-3 flex flex-col justify-between gap-4">
                <ChatHistory />
                <ChatInputBox />
            </div>
        </div>
    );
}

export default SingleConversation;