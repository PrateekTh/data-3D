import React, { useState, useContext } from 'react';
import UserContext from '../context/UserContext';

function SelectCard({setFile}){
    const [projectName, setProjectName] = useState('');
    const [fileStatus, setFileStatus] = useState(false);
    const {setUser} = useContext(UserContext);

    const handleFileChange = (e) => {

        console.log(e.target.files[0]);
        setFile(e.target.files[0]);

        setFileStatus(true);

        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            // console.log("e.target.result", e.target.result);
        };

        //send to a huggingface inference API and set a data card result
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        //Sanity Check for data
        
        if(fileStatus){
            setUser({projectName});
        }else{
            alert("Please select a file!");
        }
        
    }
    return(
        <div className='m-10 md:flex gap-10'>
            <div className='viewport-container flex-col lg:w-1/3 rounded-sm border-zinc-400 border-2 content-center text-left p-10 bg-white dark:bg-black dark:border-zinc-300'>
                <span className='text-3xl font-mono font-bold'>Get Started, <span className='text-purple-500'>fast.</span></span><br/>
                <div className='text-2xl mb-2 font-mono'>select a dataset from storage</div>
                <input className= 'rounded-md m-2 dark:text-zinc-700' 
                type='text' 
                value={projectName} 
                onChange={(e) => {setProjectName(e.target.value)}} 
                placeholder='Project Name'/> <br/>

                <input className='text-sm font-mono outline-none focus:outline-none file:py-3 file:px-6 file:mx-2 file:rounded-md file:border-2
                file:border-white file:text-md file:font-bold  file:text-white
                file:bg-gradient-to-r file:from-violet-800 file:to-violet-500
                hover:file:cursor-pointer hover:file:from-violet-800 hover:file:to-violet-800'
                type='file'
                onChange={handleFileChange}
                /> <br/><br/>

                <button onClick={handleSubmit} className='text-white'>Submit</button>
            </div>
            <div className='lg:w-2/3 border-zinc-400 border-2 content-center text-left rounded-sm p-10 bg-white dark:bg-black dark:border-zinc-300'>
                <div>
                    <div className='font-bold text-6xl'>
                        Reshaping your data, <span className='text-purple-500'>literally.</span>
                    </div>
                    <div className='font-mono text-lg py-4'>
                        <span className='main-head text-xl'>3Data</span> is a tool that allows you to create immersive and interactive 3D (and 2D) visualisations of <span className='font-bold'>any</span> dataset.
                        Currently supports more than 100k datapoints (in realtime on any browser), beyond which the device GPU is the benchmark. <br/> <br/>

                        Visit <span className='underline underline-offset-4 font-bold'>this</span> repository for a tutorial or source code.
                    </div>
                </div>

                <div className='py-4'>
                    <div className='text-lg'>
                        <span className='font-bold text-3xl'>Tech Stack</span> <span className='italic'>( for nerds and curious kids )</span>
                    </div>
                    <div className='font-mono text-lg py-2'>
                        <ul>
                        <li>ThreeJS, R3F </li>
                        <li>React, Javascript </li>
                        <li>HTML, CSS, Tailwind </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectCard;