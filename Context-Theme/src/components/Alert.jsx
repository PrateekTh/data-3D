function Alert( {alert} ) {
    // console.log("Got alert:" , alert)
    if(alert) {
        return ( 
    <div className='absolute p-3 px-4 my-2 bg-inherit font-semibold text-purple-500 text-sm font-mono border-2 
    border-purple-500 dark:text-purple-400 dark:border-purple-400'>
        <p>{alert}</p>
    </div> )
    } else return null;
}

export default Alert;