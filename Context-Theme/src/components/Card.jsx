import { useContext } from "react";
import UserContext from "../context/UserContext";
import Viewport from "./Viewport";

export default function Card() {
    
    const {user} = useContext(UserContext);
    const tempImage = 'https://www.musiclipse.com/wp-content/uploads/2024/02/kurt-cobain-aesthetic-large-wallpaper-for-desktop-background-e1713406563867.jpg';
    return (
        <div className="duration-300 m-6 flex bg-white border border-zinc-200 rounded-lg shadow dark:bg-zinc-900 dark:border-zinc-700">
            <div className="p-4 h-full w-3/5 rounded-lg overflow-hidden" >
                {/* {<img className="rounded-lg" src={tempImage} alt="product_image1" />} */}
                <Viewport/>
            </div>

            <div className="p-5 w-2/6 content-center">
                <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                    <span className="mb-4 text-2xl font-bold text-zinc-900 dark:text-white">                        
                        {user.username}'s Dashboard
                    </span>

                    </h5>
                </a>
                <div className="items-center mt-2.5 mb-5">
                    <span className="bg-zinc-100 text-zinc-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-zinc-200 dark:text-zinc-800 ml-3">
                        Sales Forecasting
                    </span>

                </div>

                <p align ='justify' className="font-mono">
                The importance of data visualization is simple: it helps people see, interact with, and better understand data. Whether simple or complex, the right visualization can bring everyone on the same page, regardless of their level of expertise.
                </p>
                <button href="#" className=" m-4 text-white bg-zinc-700 hover:bg-zinc-800 focus:ring-4 focus:outline-none 
                focus:ring-zinc-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:focus:ring-zinc-800">
                    See Details
                </button>
            </div>
        </div>
    );
}
