import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const [searchFilter, setSearchFilter] = useState({
        title: '',
        location: '',
    })

    const [isSearched, setIsSearched] = useState(false);

    const [jobs, setJobs]= useState([]); 
    
    const[showRecruiterLogin, setShowRecruiterLogin] = useState(false);
    // Assuming you might want to manage jobs in context

    // Function to fetch jobs
    const fetchJobs = async () =>{
        setJobs(jobsData)
    }
     
     useEffect (()=>{
        fetchJobs();
     },[])

    const value = {
       setIsSearched,searchFilter, setSearchFilter, isSearched,
       jobs, setJobs,
       showRecruiterLogin, setShowRecruiterLogin
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};