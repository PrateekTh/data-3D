import { useContext } from "react";
import UserContext from "../context/UserContext";

export default function Card() {
    
    const {user} = useContext(UserContext);
    const image = 'https://www.musiclipse.com/wp-content/uploads/2024/02/kurt-cobain-aesthetic-large-wallpaper-for-desktop-background-e1713406563867.jpg';
    return (
        <div className="w-4/5 m-4 flex bg-white border border-zinc-200 rounded-lg shadow dark:bg-zinc-900 dark:border-zinc-700">
            <div className="p-4 w-4/5 rounded-lg overflow-hidden" >
                <img className="rounded-lg" src={image} alt="product_image1" />

            </div>
            <div className="p-5">
                <a href="/">
                    <h5 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                        Welcome {user.username}!
                    </h5>
                </a>
                <div className="flex items-center mt-2.5 mb-5">
                    <span className="bg-zinc-100 text-zinc-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-zinc-200 dark:text-zinc-800 ml-3">
                        Tag 1
                    </span>

                    <span className="bg-zinc-100 text-zinc-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-zinc-200 dark:text-zinc-800 ml-3">
                        Tag 2
                    </span>

                    <span className="bg-zinc-100 text-zinc-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-zinc-200 dark:text-zinc-800 ml-3">
                        Tag 3
                    </span>

                </div>
                <span className="mb-4 text-3xl font-bold text-zinc-900 dark:text-white">Dashboard</span>
                <br/>
                <button
                    href="#"
                    className=" m-4 text-white bg-zinc-700 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:focus:ring-zinc-800"
                >
                    Add to cart
                </button>
            </div>
        </div>
    );
}
