import React from 'react';
import UserContext from './UserContext';

const UserContextProvider = ({children}) => {
    const [user, setUser] = React.useState(null);
    const [dataset, setDataset] = React.useState([]);
    return(
        <UserContext.Provider value={{user, setUser, dataset, setDataset}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;