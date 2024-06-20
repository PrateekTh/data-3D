import React from 'react';
import useTheme from '../context/ThemeContext';

export default function ThemeBtn() {
    
    const {themeMode, lightTheme, darkTheme} = useTheme();

    const OnChangeTheme = (e) => {
        const darkModeStatus = e.currentTarget.checked;
        if(darkModeStatus){
            darkTheme();
        } else{
            lightTheme();
        }
    }
    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                value=""
                className="sr-only peer"
                onChange={OnChangeTheme}
                checked = {themeMode === 'dark'}
            />
            
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-black dark:peer-focus:ring-white 
            rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] 
            after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 
            after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-zinc-700"></div>
        </label>
    );
}