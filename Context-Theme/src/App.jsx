import React, { useState, useEffect } from 'react';
import UserContextProvider from './context/UserContextProvider'
import { ThemeProvider } from './context/ThemeContext.js'
import './App.css'
import Login from './components/Login'
import Profile from './components/Profile'
import ThemeBtn from './components/ThemeBtn.jsx';
import Card from './components/Card.jsx';

function App() {
	
	const [themeMode, setThemeMode] = useState('light');

	const lightTheme = () => {
		setThemeMode('light');
	}

	const darkTheme = () => {
		setThemeMode('dark');
	}
	
	useEffect(() => {
		document.querySelector('html').classList.remove("light", "dark");
		document.querySelector('html').classList.add(themeMode);
	}, [themeMode]);
	return (
		<>
			<div className='duration-200 main-body min-h-screen bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-white m-0'>
				<ThemeProvider value={{themeMode, lightTheme, darkTheme}}>
				<UserContextProvider>

					<div className="flex flex-wrap">
						<div className="w-full">
							<div className="p-4 flex mb-4 bg-white dark:bg-black"> 
								<h1 className='font-mono'>Eyes like the Sky</h1>
								<div className="w-full max-w-md flex justify-end mx-auto">
									<ThemeBtn />
								</div>
							</div>

							
						</div>
					</div>
					<div className='flex text-center'>
						<Profile/>
					</div>
				</UserContextProvider>
				</ThemeProvider>
			</div>
		</>
	)
}

export default App
