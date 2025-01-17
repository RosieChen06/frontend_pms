import { createContext, useEffect, useState } from "react"
import axios from "axios"
import {toast } from 'react-toastify';

export const AdminContext = createContext()

const AdminContextProvider = (props) =>{

    const [rider, setRider] = useState([])
    const [data, setData] = useState([])
    const [weekData, setWeekData] = useState([])
    const [state, setState] = useState(false)
    const [token, setToken] = useState(sessionStorage.getItem('token')?sessionStorage.getItem('token'):'')
    const [userEmail, setUserEmail] = useState(sessionStorage.getItem('useremail')?sessionStorage.getItem('useremail'):'')
    const [isShowAdminDetail, setIsShowAdminDetail] = useState(false)
    const [onlineData, setOnlineData] = useState([])

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

    const getWeekDB = async () => {
        try{
            const {data} = await axios.get('http://localhost:4000/api/admin/week-data')
            if(data.success){
                setOnlineData(data.weekData)

            }else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error(data.message)
        }
    }

    const fetchData = async () => {
        try{
                const response = await axios.get('https://script.google.com/macros/s/AKfycbx-drlHbjO5h2Ks_UwTz51bX7_atvrZjMRA_SW6ZWRA7s9Mm_8Ebk_yOURZQMr4nbdz/exec')
                setData(response.data)
                const response2 = await axios.get('https://script.google.com/macros/s/AKfycbw1RwAEg0sGWUgG40s8v3lIxu_1ZEfrwub9oXka9JuzcMCX3a34fORX0UNRoFMFxxzs/exec')
                setWeekData(response2.data)
                setState(true)
                console.log(state)
            }
        catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        getDB()
        getWeekDB()
        fetchData()
    },[])

    const value = {
        getDB, rider, data, state, setData, setToken, token, userEmail, setUserEmail, isShowAdminDetail, setIsShowAdminDetail, weekData, setWeekData, getWeekDB, onlineData, setOnlineData
    }

    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider