import React from 'react';
import * as dfd from "danfojs/dist/danfojs-browser/src";

function TestDataDanfo() {

    const [data, setData] = React.useState(null);
    const [temp, setTemp] = React.useState(null);

    const filename = "h_weather.csv";


    React.useEffect(() => {
        dfd.readCSV("/" + filename).then((df) => setData(df));
        console.log("Data Set");
    }, []);

    React.useEffect(()=>{
        console.log(data);
        if(data) {
            console.log(data.columns);
            setTemp(dfd.toJSON(data.head()));
        }
    }, [data])


    return ( 
    <div className='w-screen font-mono text-left text-wrap'>
        {/* {console.log(JSON.stringify(temp, null, 3))} */}
    </div>
    );
}

export default TestDataDanfo;