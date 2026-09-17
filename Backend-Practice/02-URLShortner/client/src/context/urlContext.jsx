import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const URLContext = createContext()

export const URLProvider = ({ children }) => {

    const [urls, setUrls] = useState([])
    const [inputValue, setInputValue] = useState("")
    
        return <URLContext.Provider value={{ urls, setUrls, inputValue, setInputValue }}>{children}</URLContext.Provider>
}


export const useURLContext=()=>{
    const context=useContext(URLContext)
    return context
}