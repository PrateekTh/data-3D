
import UserContextProvider from './context/UserContextProvider'
import './App.css'
import Login from './components/Login'
import Profile from './components/Profile'

function App() {

	return (
		<>
			<h1>Eyes like the Sky</h1>

			<UserContextProvider>
				<Login/><br/>
				<Profile/>
			</UserContextProvider>
		</>
	)
}

export default App
