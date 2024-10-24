import React, {useContext, useState} from 'react'
import UserContext from '../context/UserContext'
import Card from './Card'
import SelectCard from './SelectCard'

function Home() {
    const {user} = useContext(UserContext)
    const [file, setFile] = useState([]);
    
    if (!user) return <SelectCard setFile={setFile}/>
    
    return (
    <>
        <div className='p-2 xl:h-[83vh]'>
            {/* {console.log(file)} */}
            <Card file={file}/>
        </div>
    </>)
}

export default Home