import React, { useState, useEffect } from 'react';
import UserContextProvider from './context/UserContextProvider'
import { ThemeProvider } from './context/ThemeContext.js'
import './App.css'
import Home from './components/Home'
import Header from './components/Header.jsx';

function App() {
	
	const [themeMode, setThemeMode] = useState('dark');
	const lightTheme = () => {setThemeMode('light');}
	const darkTheme = () => {setThemeMode('dark');}
	
	
	useEffect(() => {
		document.querySelector('html').classList.remove("light", "dark");
		document.querySelector('html').classList.add(themeMode);
	}, [themeMode]);
	return (
		<>
			<div className='duration-200 flex-col w-full h-full items-center main-body min-h-screen bg-zinc-200 bg-opacity-90 dark:bg-zinc-900 dark:bg-opacity-90 text-zinc-700 dark:text-white m-0'>
				<ThemeProvider value={{themeMode, lightTheme, darkTheme}}>
					<UserContextProvider>
							<Header />
							<Home/>
					</UserContextProvider>
				</ThemeProvider>
			</div>
		</>
	)
}

export default App
