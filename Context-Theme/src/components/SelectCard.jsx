import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../context/UserContext';
import Alert from './Alert';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";


// gsap.registerPlugin(useGSAP);

function SelectCard({setFile}){
    const [projectName, setProjectName] = useState('');
    const [fileStatus, setFileStatus] = useState(false);
    const {setUser} = useContext(UserContext);
    const [alert, setAlert] = useState(null);
    
    useEffect(() => {
        if(alert){
            setTimeout(()=> setAlert(null), 5000)
        }
    }, [alert]);

    const handleFileChange = (e) => {
        // console.log(e.target.files[0]);
        setFile(e.target.files[0]);
        setFileStatus(true);
        // const fileReader = new FileReader();
        // fileReader.readAsText(e.target.files[0], "UTF-8");
        // fileReader.onload = e => {
        //      console.log("e.target.result", e.target.result);
        // };
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //Sanity Check for data
        if(fileStatus){
            if (projectName.length > 0) setUser({projectName});
            else setUser({projectName:"My Data"})
        }else{
            setAlert("Please select a file!");
        }   
    }

    useGSAP(
        () => {
            // gsap.from("main-left", {
            //     x: 100, 
            //     duration: 1
            // });
            let tl = gsap.timeline()

            tl.from(".main-left", {
                x:-20,
                opacity:0,
                delay:0.5,
                duration: 0.7
                
            });

            tl.from(".main-right", {
                x:20,
                opacity:0,
                duration: 0.7
            });

            tl.from(".appear-y", {
                y:5,
                opacity:0,
                delay:-0.8,
                stagger:0.2,
            })

            tl.from(".appear-x", {
                x:10,
                opacity:0,
                delay:-1.5,
                stagger:0.2,
            })
        },
        { scope: ".select-card"}
    ); 
    
    return(
        <div className='select-card p-5 lg:h-[87vh] lg:flex gap-5'>
            <div className='main-left flex-col mb-4 h-full lg:mb-0 lg:w-1/3 rounded-sm border-zinc-400 border-2 content-center text-left p-8 bg-white dark:bg-black dark:border-zinc-300'>
                <div className='appear-y icon-set flex w-full'>
                    <svg width="100px" fill='#A855F7' version="1.1" x="0px" y="0px" viewBox="0 0 100 125" xmlSpace="preserve">
                        <path d="M50.1,61.6c0.3-0.5,0.4-1.2,0.1-1.8c-0.3-0.6-0.9-0.9-1.6-0.9H11.4L35.6,2.5h49.8l-26.8,40c-0.3,0.5-0.4,1.2-0.1,1.8  c0.3,0.6,0.9,0.9,1.6,0.9h28.4L26,97.5L50.1,61.6z"/>
                    </svg>
                </div>
                <span className='appear-y text-2xl font-mono font-bold'>Get Started, <span className='text-purple-600 dark:text-purple-400'>fast.</span></span><br/>
                <div className='appear-y text-xl font-mono'>select a dataset from storage</div>
                <input className= 'appear-y rounded-md my-3 dark:text-zinc-700' 
                type='text' value={projectName}
                onChange={(e) => {setProjectName(e.target.value)}} 
                placeholder='Project Name'/> <br/>

                <input className='appear-y text-sm font-mono outline-none focus:outline-none file:py-2 file:px-6 file:rounded-sm file:border-2
                file:border-white file:text-md file:font-bold  file:text-white
                file:bg-gradient-to-r file:from-violet-800 file:to-violet-500
                hover:file:cursor-pointer hover:file:from-violet-800 hover:file:to-violet-800'
                type='file'
                accept='.csv, .json, .xlsx'
                onChange={handleFileChange}
                /> <br/><br/>

                <button onClick={handleSubmit} className='appear-y border-zinc-500 border-2 w-1/2 rounded-sm center bg-inherit dark:text-white'>Continue</button>
                <Alert alert={alert}/>
            </div>

            <div className='main-right lg:w-2/3 h-full border-zinc-400 border-2 content-center text-left rounded-sm p-6 xl:p-8 bg-white dark:bg-black dark:border-zinc-300'>
                <div>
                    <div className='font-bold text-5xl duration-300 hover:drop-shadow-[0_0.1px_3.1px_#A855F7]'>
                        Data analysis <span className='text-purple-600 dark:text-purple-400'>reimagined.</span>
                    </div>
                    <div className='font-mono text-md py-4'>
                        <span className='appear-x main-head text-md'>3Data</span> <span className='appear-x'>is a tool that allows you to create immersive and interactive 3D (and 2D) visualisations of </span><span className='appear-x font-bold'>any dataset</span>
                        <span className='appear-x'> Currently supports rendering 250k+ datapoints, in realtime, on the browser.</span><br/><br/>

                        <span className='appear-x'>This project is under development, and will be updated with more features soon ~ <br/>
                        Visit <a className='underline underline-offset-4 font-bold text-purple-600 dark:text-purple-400' href='https://github.com/PrateekTh/data-3D'>this</a> repository to learn more.</span>
                    </div>
                </div>

                <div className='pt-14'>
                    <div className='text-lg appear-y'>
                        <span className='font-bold text-2xl text-purple-600 dark:text-purple-400'>Powered by </span>
                    </div>
                    <div className='font-mono text-sm py-2'>
                        <ul>
                            <li className='appear-y'>ThreeJS, R3F </li>
                            <li className='appear-y'>React, Javascript </li>
                            <li className='appear-y'>WebGL, HTML, CSS, Tailwind </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectCard;