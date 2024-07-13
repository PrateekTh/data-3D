import React, { useState, useEffect } from 'react';
import UserContextProvider from './context/UserContextProvider'
import { ViewportDataProvider } from './context/ViewportContext.js';
import { ThemeProvider } from './context/ThemeContext.js'
import './App.css'
import Profile from './components/Profile'
import Header from './components/Header.jsx';
import TestDataDanfo from './components/TestDataDanfo.jsx';

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
			<div className='duration-200 flex-col items-center main-body min-h-screen bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-white m-0'>
				<ThemeProvider value={{themeMode, lightTheme, darkTheme}}>
					<UserContextProvider>
							<Header />
							<Profile/>
							{/* <TestDataDanfo/> */}
					</UserContextProvider>
				</ThemeProvider>
			</div>
		</>
	)
}

export default App
