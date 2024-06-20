import React, { useState, useContext } from 'react';
import UserContext from '../context/UserContext';

function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {setUser} = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        //check username/password from backend
        setUser({username, password});
    }
    return(
        <div className='viewport-container flex-col w-screen content-center'>
            <h1 className='text-3xl font-mono font-bold'>Login</h1>
            <input className= 'dark:text-zinc-700' 
            type='text' 
            value={username} 
            onChange={(e) => {setUsername(e.target.value)}} 
            placeholder='Username'/> <br/>
            
            <input className='dark:text-zinc-700'
            type='password' 
            value={password} 
            onChange={(e) => {setPassword(e.target.value)}} 
            placeholder='Password'/> <br/>

            <button onClick={handleSubmit} className='text-white'>Submit</button>
        </div>
    )
}

export default Login;