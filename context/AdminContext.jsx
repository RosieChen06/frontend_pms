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
    const [isEdit, setIsEdit] = useState(false)
    const [isWeekEdit, setIsWeekEdit] = useState(false)
    const [isResolve, setIsResolve] = useState('report')
    const [riderData, setRiderData] = useState(false)
    const [riderWeekData, setRiderWeekData] = useState(false)
    const [isSpQualify, setSpIsQualify] = useState(false)
    const [displayMainItem, setDisplayMainItem] =useState([])
    const [displayOnlineMainItem, setDisplayOnlineMainItem] =useState([])
    const [isRawFilter, setRawFilter] = useState(false)
    const [riderRawList, setRiderRawList] = useState(false)
    const [dayRawList, setDayRawList] = useState(false)
    const [isShowData, setIsShowData] = useState(false)
    const [isShowMenu, setIsShowMenu] = useState(false)
    const [uploadItem, setUploadItem] = useState([])
    const [isMassiveUpload, setIsMassiveUpload] = useState(false)

    console.log(token)

    const getDB = async () => {
        const formData = new FormData()
        formData.append('ta', token)
        try{
            const {data} = await axios.post('https://backend-pms.vercel.app/api/admin/all-rider', formData)
            if(data.success){
                setRider(data.riders)
                }
            else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error(data.message)
        }
    }

    const getWeekDB = async () => {
    const formData = new FormData()
    formData.append('ta', token)
    try{
        const {data} = await axios.get('https://backend-pms.vercel.app/api/admin/week-data', formData)
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
            }
        catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchData()
    },[])

    useEffect(()=>{
        getDB()
        getWeekDB()
    },[rider])

    const value = {
        getDB, rider, data, state, setData, 
        setToken, token, userEmail, riderData, setRiderData, riderWeekData, setRiderWeekData,
        setUserEmail, isShowAdminDetail, setIsShowAdminDetail, 
        weekData, setWeekData, getWeekDB, onlineData, setOnlineData,
        isEdit, setIsEdit, isResolve, setIsResolve,isWeekEdit, setIsWeekEdit,
        isSpQualify, setSpIsQualify, displayMainItem, setDisplayMainItem,
        displayOnlineMainItem, setDisplayOnlineMainItem, isRawFilter, setRawFilter,
        riderRawList, setRiderRawList, dayRawList, setDayRawList, isShowData, setIsShowData,
        isShowMenu, setIsShowMenu, uploadItem, setUploadItem, isMassiveUpload, setIsMassiveUpload
        
    }

    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider
