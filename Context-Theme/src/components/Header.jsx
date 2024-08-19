import React from 'react';
import ThemeBtn from './ThemeBtn.jsx';

function Header() {
    return ( 
        <div className="flex flex-wrap">
            <div className="w-full">
                <div className="p-4 flex mb-4 bg-white border-0 border-b-2 border-zinc-400 dark:border-zinc-300 dark:bg-black"> 
                    <h1 className='main-head font-mono text-5xl py-2'>//. 3Data .//</h1>
                    <div className="w-full max-w-10 ml-auto mr-2 my-auto"><ThemeBtn /></div>
                </div>
            </div>
        </div>
    );
}

export default Header;