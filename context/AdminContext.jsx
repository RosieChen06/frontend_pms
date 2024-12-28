import { createContext, useEffect, useState } from "react"
import axios from "axios"
import {toast } from 'react-toastify';

export const AdminContext = createContext()

const AdminContextProvider = (props) =>{

    const [rider, setRider] = useState([])
    const [data, setData] = useState([])
    const [state, setState] = useState(false)
    
    const getDB = async () => {
        try{
            const {data} = await axios.get('http://localhost:4000/api/admin/all-rider')
            if(data.success){
                setRider(data.riders)
                console.log(rider)
            }else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error(data.message)
        }
    }

    const fetchData = async () => {
        try{
            const response = await axios.get('https://script.google.com/macros/s/AKfycbz1MfB3vVV3hiXH7D-pwdA5AiHw8rFHBghmHW5LyG0_t6wpQXIawpE7-hCJfkmGug5c3A/exec')
            setData(response.data)
            console.log(data)
            setState(true)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        getDB()
        fetchData()
    },[])

    const value = {
        getDB, rider, data, state, setData
    }

    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider