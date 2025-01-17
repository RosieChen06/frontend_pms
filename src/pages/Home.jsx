import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AdminContext } from '../../context/AdminContext'
import { BiDetail } from "react-icons/bi";
import { FaRegSave } from "react-icons/fa";
import List from '../components/List';
import Detail from '../components/Detail';

const Home = () => {

    const {getDB, rider, data, state, token, isShowAdminDetail, setIsShowAdminDetail, weekData, setWeekData} = useContext(AdminContext)
    const [displayMainItem, setDisplayMainItem] =useState([])
    const [displayOnlineItem, setDisplayOnlineItem] =useState([])

    const filterdData = data.filter((item)=>(rider.filter((i)=>(i.name===item.user_name)).filter((j)=>(j.date===new Date(item.date).toLocaleDateString())).length===0) && item.user_name !=='')

    const saveRecord = async (index, name, weeknum) => {
        const weekDataforSave = weekData.filter((item)=>(item.name===name && item.weeknum===weeknum))
        try{
            const formData = new FormData()
            formData.append('phone', filterdData[index].rider_phone_num)
            formData.append('name', filterdData[index].user_name)
            formData.append('date', new Date(filterdData[index].date).toLocaleDateString())
            formData.append('sp2_1', filterdData[index].sp2_1)
            formData.append('sp2_1_serve_type', filterdData[index].sp2_1_serve_type)
            formData.append('sp2_1_onhold', filterdData[index].sp2_1_onhold)
            formData.append('sp2_1_remaindelivering', filterdData[index].sp2_1_remain_delivering_qty)
            formData.append('sp2_1_sop', filterdData[index].smart_inbound)
            formData.append('sp2_1_appsheet', filterdData[index].appsheet)
            formData.append('sp2_2', filterdData[index].sp2_2)
            formData.append('sp2_2_serve_type', filterdData[index].sp2_2_serve_type)
            formData.append('sp2_2_onhold', filterdData[index].sp2_2_onhold)
            formData.append('sp2_2_remaindelivering', filterdData[index].sp2_2_remain_delivering_qty)
            formData.append('sp2_2_sop', filterdData[index].smart_inbound)
            formData.append('sp2_2_appsheet', filterdData[index].appsheet)
            formData.append('sp2_3', filterdData[index].sp2_3)
            formData.append('sp2_3_serve_type', filterdData[index].sp2_3_serve_type)
            formData.append('sp2_3_onhold', filterdData[index].sp2_3_onhold)
            formData.append('sp2_3_remaindelivering', filterdData[index].sp2_3_remain_delivering_qty)
            formData.append('sp2_3_sop', filterdData[index].smart_inbound)
            formData.append('sp2_3_appsheet', filterdData[index].appsheet)
            formData.append('sp2_attendance', filterdData[index].attendance_record)
            formData.append('epod', filterdData[index].epod)
            formData.append('ttl_delivered', weekDataforSave[0].ttl_delivered)
            formData.append('ttl_worksday', weekDataforSave[0].ttl_worksday)
            formData.append('ttl_workday_weekend', weekDataforSave[0].ttl_workday_weekend)
            formData.append('seq', weekDataforSave[0].seq)
            formData.append('epod_lost', weekDataforSave[0].epod_lost)
            formData.append('weeknum', weekDataforSave[0].weeknum)
            formData.append('uncleanCnt', weekDataforSave[0].uncleanCnt)

            const {data} = await axios.post('http://localhost:4000/api/admin/add-data',formData)

            if(data.success){
                toast.success(data.message)
                getDB()
            }else{
                toast.error(data.message)
            }

        }catch(error){
            console.log(error)
        }
    }
    const displayDetail = (name, date, weeknum) =>{
        setDisplayMainItem(filterdData.filter((item)=>(item.name===name && new Date(item.date).toLocaleDateString()===date))[0])
        setDisplayOnlineItem(weekData.filter((item)=>(item.name===name && parseInt(item.weeknum)===weeknum))[0])
        setIsShowAdminDetail(true)
        console.log(displayMainItem)
        console.log(displayOnlineItem)
    }

    // const [newData, setNewData] = useState({
    //     name: '',
    //     date: '',
    //     is_garantee: '',
    //     is_service_bonus: '',
    //     is_online_bonus: '',
    //     sp2_1: '',
    //     sp2_1_remaindelivering: '',
    //     sp2_1_clened_ttl_cnt: '',
    //     sp2_1_delivered_cnt: '',
    //     sp2_1_serve_type: '',
    //     sp2_2: '',
    //     sp2_2_remaindelivering: '',
    //     sp2_2_clened_ttl_cnt: '',
    //     sp2_2_delivered_cnt: '',
    //     sp2_2_serve_type: '',
    //     sp2_3: '',
    //     sp2_3_remaindelivering: '',
    //     sp2_3_clened_ttl_cnt: '',
    //     sp2_3_delivered_cnt: '',
    //     sp2_3_serve_type: '',
    //     epod:'',
    //     appsheet:''
    // })

    // const editDetail = (name, date) => {
    //     const selectedData = filterdData.filter((item)=>(
    //         item.user_name===name && item.date===date
    //     ))
    //     setNewData({
    //         name: selectedData[0].user_name,
    //         date: selectedData[0].date,
    //         is_garantee: selectedData[0].is_garantee,
    //         is_service_bonus: selectedData[0].is_service_bonus,
    //         is_online_bonus: selectedData[0].is_online_bonus,
    //         sp2_1: selectedData[0].sp2_1,
    //         sp2_1_remaindelivering: selectedData[0].sp2_1_remain_delivering_qty,
    //         sp2_1_clened_ttl_cnt: selectedData[0].sp2_1_clened_ttl_cnt,
    //         sp2_1_delivered_cnt: selectedData[0].sp2_1_delivered_cnt,
    //         sp2_1_serve_type: selectedData[0].sp2_1_serve_type,
    //         sp2_2: selectedData[0].sp2_2,
    //         sp2_2_remaindelivering: selectedData[0].sp2_2_remain_delivering_qty,
    //         sp2_2_clened_ttl_cnt: selectedData[0].sp2_2_clened_ttl_cnt,
    //         sp2_2_delivered_cnt: selectedData[0].sp2_2_delivered_cnt,
    //         sp2_2_serve_type: selectedData[0].sp2_2_serve_type,
    //         sp2_3: selectedData[0].sp2_3,
    //         sp2_3_remaindelivering: selectedData[0].sp2_3_remain_delivering_qty,
    //         sp2_3_clened_ttl_cnt: selectedData[0].sp2_3_clened_ttl_cnt,
    //         sp2_3_delivered_cnt: selectedData[0].sp2_3_delivered_cnt,
    //         sp2_3_serve_type: selectedData[0].sp2_3_serve_type,
    //         epod: selectedData[0].epod,
    //         appsheet: selectedData[0].appsheet
    //     })
    //     setIsEdit(true)
    // }

    // const saveEditedData = (epod) =>{
    //     setData(data.map((item)=>{
    //         return item.user_name===newData.name && item.date===newData.date?
    //         {...item, epod:epod}:item
    //     }))
    //     setIsEdit(false)
    // }

  return state && (
    <div className='flex flex-col pl-8 w-2/3 md:w-5/6 pr-4 h-full overflow-hidden'>  
        <div>

        </div>
        {isShowAdminDetail? 
            <Detail 
                token={token}
                name={displayMainItem.name}
                date={new Date(displayMainItem.date).toLocaleDateString()}
                sp2_1={displayMainItem.sp2_1}
                sp2_1_remaindelivering={displayMainItem.sp2_1_remaindelivering}
                sp2_1_ttl_delivered={displayMainItem.sp2_1_ttl_delivered}
                sp2_1_delivered={displayMainItem.sp2_1_delivered}
                sp2_1_onhold={displayMainItem.sp2_1_onhold}
                sp2_1_appsheet={displayMainItem.sp2_1_appsheet}
                sp2_1_serve_type={displayMainItem.sp2_1_serve_type}
                sp2_1_sop={displayMainItem.sp2_1_sop}
                sp2_2={displayMainItem.sp2_2}
                sp2_2_remaindelivering={displayMainItem.sp2_2_remaindelivering}
                sp2_2_ttl_delivered={displayMainItem.sp2_2_ttl_delivered}
                sp2_2_delivered={displayMainItem.sp2_2_delivered}
                sp2_2_onhold={displayMainItem.sp2_2_onhold}
                sp2_2_appsheet={displayMainItem.sp2_2_appsheet}
                sp2_2_serve_type={displayMainItem.sp2_2_serve_type}
                sp2_2_sop={displayMainItem.sp2_2_sop}
                sp2_3={displayMainItem.sp2_3}
                sp2_3_remaindelivering={displayMainItem.sp2_3_remaindelivering}
                sp2_3_ttl_delivered={displayMainItem.sp2_3_ttl_delivered}
                sp2_3_delivered={displayMainItem.sp2_3_delivered}
                sp2_3_onhold={displayMainItem.sp2_3_onhold}
                sp2_3_appsheet={displayMainItem.sp2_3_appsheet}
                sp2_3_serve_type={displayMainItem.sp2_3_serve_type}
                sp2_3_sop={displayMainItem.sp2_3_sop}
                epod={displayMainItem.epod}
                lost_cnt={displayMainItem.lost_cnt}
                weeknum={displayMainItem.weeknum}
                sp2_attendance={displayMainItem.sp2_attendance}
                epod_lost={displayOnlineItem.epod_lost}
                seq={displayOnlineItem.seq}
                ttl_delivered={displayOnlineItem.ttl_delivered}
                ttl_workday_weekend={displayOnlineItem.ttl_workday_weekend}
                ttl_worksday={displayOnlineItem.ttl_worksday}
                uncleanCnt={displayOnlineItem.uncleanCnt}
                day_report_status='raw'
                week_report_status='raw'
            />
            :''
        }
        <div className='w-[87%] grid grid-cols-5 bg-white p-3 rounded-lg mb-4 text-center mt-4'>
            <p>Date</p>
            <p>Name</p>
            <p>保底獎勵</p>
            <p>服務獎勵</p>
            <p>上線獎勵</p>
        </div>
        <div className='w-full overflow-scroll text-center'>
            {
                filterdData.map((item, index)=>(
                <div key={index} className='flex flex-row items-center w-full justify-between'>
                    <List date={new Date(item.date).toLocaleDateString()} name={item.name} is_garantee={item.is_garantee} is_service_bonus={item.is_service_bonus} is_online_bonus={item.is_online_bonus}/>
                    <div className='flex flex-row gap-4'>
                        <button onClick={()=>displayDetail(item.name, new Date(item.date).toLocaleDateString(), item.weeknum)} className='bg-white p-3 rounded-full'><BiDetail /></button>
                        {/* <button onClick={()=>editDetail(item.user_name, item.date)} className='bg-white p-3 rounded-full'><FaRegEdit /></button> */}
                        <button onClick={()=>saveRecord(index, item.name, item.weeknum)} className='bg-white p-3 rounded-full'><FaRegSave /></button>
                    </div>
                </div> 
                ))
            }
        </div>
    </div>
  )
}

export default Home