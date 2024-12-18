import React, { useRef } from 'react';
import ThemeBtn from './ThemeBtn.jsx';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function Header() {
    
    const headerRef = useRef();

    useGSAP(
        () => {
            gsap.from(".head", {
                y:-10,
                opacity:0,
                duration: 1.5
            })
        },
        { scope: headerRef }
    ); 
    
    return ( 
        <div ref={headerRef} className="flex flex-wrap head-container">
            <div className="w-full head">
                <div className="p-2 flex xl:mb-4 bg-white border-0 border-b-2 border-zinc-400 dark:border-zinc-300 dark:bg-black"> 
                    <h1 className='main-head text-3xl py-1 select-none cursor-pointer' 
                    onClick={()=> window.open(window.location.hostname,"_self")}>//. 3Data .//</h1>
                    <div className="w-full max-w-10 ml-auto mr-2 my-auto"><ThemeBtn /></div>
                </div>
            </div>
        </div>
    );
}

export default Header;