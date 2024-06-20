import React, { useState, useContext } from 'react';
import UserContext from '../context/UserContext';

function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {setUser} = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        setUser({username, password});
    }
    return(
        <div className='flex-col w-screen'>
            <h1 className='text-3xl font-mono font-bold'>Login</h1>
            <input type='text' 
            value={username} 
            onChange={(e) => {setUsername(e.target.value)}} 
            placeholder='Username'/> <br/>
            
            <input type='text' 
            value={password} 
            onChange={(e) => {setPassword(e.target.value)}} 
            placeholder='Password'/> <br/>

            <button onClick={handleSubmit} className='text-white'>Submit</button>
        </div>
    )
}

export default Login;