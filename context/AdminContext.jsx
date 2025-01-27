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
    const [riderData, setRiderData] = useState({
        riderId: '',
        name: '',
        date: '',
        sp2_1: '',
        sp2_1_remaindelivering: '',
        sp2_1_onhold: '',
        sp2_1_delivered: '',
        sp2_1_serve_type: '',
        sp2_1_appsheet: '',
        sp2_1_sop: '',
        sp2_2: '',
        sp2_2_remaindelivering: '',
        sp2_2_onhold: '',
        sp2_2_delivered: '',
        sp2_2_serve_type: '',
        sp2_2_appsheet: '',
        sp2_2_sop: '',
        sp2_3: '',
        sp2_3_remaindelivering: '',
        sp2_3_onhold: '',
        sp2_3_delivered: '',
        sp2_3_serve_type: '',
        sp2_3_appsheet: '',
        sp2_3_sop: '',
        sp2_attendance: '',
        admincomment:'',
        image:'',
        lost_cnt: '',
        epod: '',
    })

    const [riderWeekData, setRiderWeekData] = useState({
        riderId: '',
        name: '',
        weeknum: '',
        uncleanCnt: '',
        comment: '',
        reportItem: '',
        ttl_delivered: '',
        ttl_worksday_weekend: '',
        seq: '',
        epod_lost: '',
    })

    const [isSpQualify, setSpIsQualify] = useState(false)
    const [displayMainItem, setDisplayMainItem] =useState([])
    const [displayOnlineMainItem, setDisplayOnlineMainItem] =useState([])
    const [isRawFilter, setRawFilter] = useState(false)
    const [riderRawList, setRiderRawList] = useState(false)
    const [dayRawList, setDayRawList] = useState(false)

    const getDB = async () => {
        try{
            const {data} = await axios.get('http://localhost:4000/api/admin/all-rider')
            if(data.success){
                setRider(data.riders)
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
        setToken, token, userEmail, 
        setUserEmail, isShowAdminDetail, setIsShowAdminDetail, 
        weekData, setWeekData, getWeekDB, onlineData, setOnlineData,
        isEdit, setIsEdit,riderData, setRiderData, isResolve, setIsResolve,
        riderWeekData, setRiderWeekData,isWeekEdit, setIsWeekEdit,
        isSpQualify, setSpIsQualify, displayMainItem, setDisplayMainItem,
        displayOnlineMainItem, setDisplayOnlineMainItem, isRawFilter, setRawFilter,
        riderRawList, setRiderRawList, dayRawList, setDayRawList
    }

    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider