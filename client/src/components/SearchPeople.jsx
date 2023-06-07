import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { sleep, toastNotify } from "@_utils/helper";
import { useRef, useState } from "react";
import axios from "axios";

const SearchPeople = () => {
    const [loading, setLoading] = useState(false);
    const [inputEmail, setInputEmail] = useState('');
    const searchForm = useRef(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (inputEmail.length < 3) return toastNotify('error', 'Please enter email.')
        
        setLoading(true);
        await sleep(3000);
        axios.post('/search-user', { email: inputEmail })
            .then(res => {
                const [ user, extraData ] = res.data;

                if (!user) toastNotify(extraData.type, extraData.message);
                
                setLoading(false);
                searchForm.current.reset();
            })
            .catch(err => {
                console.log(err)
                searchForm.current.reset();
            });
    }
    
    return (
        <>
            <button className="btn btn-primary btn-outline w-full capitalize" onClick={() => window.search_modal.showModal()}>
                Search People
                <MagnifyingGlassIcon className="w-5 h-5 stroke-2" />
            </button>
            <dialog id="search_modal" className="modal">
                <form onSubmit={handleSearch} className="modal-box" ref={searchForm}>
                    <div className="flex gap-2 items-center">
                        <input
                            onChange={e => setInputEmail(e.target.value)}
                            type="email"
                            name="search"
                            id="search"
                            placeholder="Search by Email"
                            className="input input-primary w-full input-bordered"
                        />
                        <button type="submit" className="btn btn-primary w-24">
                            {loading ? <span className="loading loading-spinner"></span> : 'Search'}
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
        </>
    );
}

export default SearchPeople;