import { createContext, useState } from "react";

export const Context = createContext();

const AppContext = ({children}) => {

    const [userInfo, setUserInfo] = useState({
        companyName: "Zanvar Group of Industries"
    });
    
    return(
        <Context.Provider value={{
            userInfo, setUserInfo
        }}>
            {children}
        </Context.Provider>
    )
}
export default AppContext;