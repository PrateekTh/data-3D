import React, {useContext, useState} from 'react'
import UserContext from '../context/UserContext'
import Card from './Card'
import Login from './Login'

function Profile() {
    const {user} = useContext(UserContext)
    const [file, setFile] = useState([]);
    
    if (!user) return <div><Login setFile={setFile}/></div>
    
    return (
    <>
        <div className='p-2'>
            {console.log(file)}
            <Card file={file}/>
        </div>
    </>)
}

export default Profile