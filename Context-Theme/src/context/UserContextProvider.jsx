import React from 'react';
import UserContext from './UserContext';

const UserContextProvider = ({children}) => {
    const [user, setUser] = React.useState(null);
    const [data, setData] = React.useState([]);
    return(
        <UserContext.Provider value={{user, setUser, data, setData}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;