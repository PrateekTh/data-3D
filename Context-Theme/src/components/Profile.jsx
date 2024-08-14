import React, {useContext} from 'react'
import UserContext from '../context/UserContext'
import Card from './Card'
import Login from './Login'

function Profile() {
    const {user} = useContext(UserContext)
    
    if (!user) return <div><Login/></div>

    return (
    <>
        <div className='p-2'>
            <Card />
        </div>
    </>)
}

export default Profile