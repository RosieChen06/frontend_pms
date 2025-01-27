import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AdminContext } from '../../context/AdminContext'
import List from '../components/List';
import Detail from '../components/Detail';
import { FaFilter } from "react-icons/fa6";
import Filter from '../components/Filter';
import { MdOutlineAdsClick } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";

const Home = () => {

    const {rider, data, state, token, isShowAdminDetail, displayMainItem, 
        displayOnlineMainItem, isRawFilter, setRawFilter, weekData, getDB} = useContext(AdminContext)   
    const [dateRawFilterPreview, setDateRawFilterPreview] = useState([])
    const [riderRawFilterPreview, setRiderRawFilterPreview] = useState([])
    const [dateRawFilterConfirm, setDateRawFilterConfirm] = useState([])
    const [riderRawFilterConfirm, setRiderRawFilterConfirm] = useState([])
    const [filterRawData, setFilterRawData] = useState([])
    const [isMassiveUpload, setIsMassiveUpload] = useState(false)
    const [uploadItem, setUploadItem] = useState([])

    const filterdData = data.filter((item)=>(rider.filter((i)=>(i.name===item.name)).filter((j)=>(j.date===new Date(item.date).toLocaleDateString())).length===0) && item.name !=='')

    const dataList = () => {
            if(riderRawFilterConfirm.length === 0 && dateRawFilterConfirm.length === 0){
                let newData = filterdData
                setFilterRawData(newData)
            }else if(riderRawFilterConfirm.length === 0){
                let newData = filterdData.filter((item)=>(
                    dateRawFilterConfirm.includes(item.date)
                  ))
                setFilterRawData(newData)
            }else if(dateRawFilterConfirm.length === 0){
                let newData = filterdData.filter((item)=>(
                    riderRawFilterConfirm.includes(item.name)
                  ))
                setFilterRawData(newData)
            }else{
                let newData = filterdData.filter((item)=>(
                    riderRawFilterConfirm.includes(item.name) && dateRawFilterConfirm.includes(item.date)
                ))
                setFilterRawData(newData)
            }
        }
    
    useEffect(()=>{
        dataList()
    }, [dateRawFilterConfirm, riderRawFilterConfirm, rider])

    const addUploadItem = () => {
        const tempArray = []

        for(let i=0;i<filterRawData.length;i++){

          const weekDataforSave = weekData.filter((item)=>(item.name===filterRawData[i].name && item.weeknum===filterRawData[i].weeknum))
          const getallData={
            phone: filterRawData[i].phone,
            name: filterRawData[i].name,
            date: new Date(filterRawData[i].date).toLocaleDateString(),
            is_garantee: filterRawData[i].is_garantee,
            sp2_1: filterRawData[i].sp2_1,
            sp2_1_is_servicce_bonus: filterRawData[i].sp2_1_is_servicce_bonus,
            sp2_1_serve_type: filterRawData[i].sp2_1_serve_type,
            sp2_1_onhold: filterRawData[i].sp2_1_onhold,
            sp2_1_remaindelivering: filterRawData[i].sp2_1_remaindelivering,
            sp2_1_ttl_delivered: filterRawData[i].sp2_1_ttl_delivered,
            sp2_1_delivered: filterRawData[i].sp2_1_delivered,
            sp2_1_sop: filterRawData[i].sp2_1_sop,
            sp2_1_appsheet: filterRawData[i].sp2_1_appsheet,
            sp2_2: filterRawData[i].sp2_2,
            sp2_2_is_servicce_bonus: filterRawData[i].sp2_2_is_servicce_bonus,
            sp2_2_serve_type: filterRawData[i].sp2_2_serve_type,
            sp2_2_onhold: filterRawData[i].sp2_2_onhold,
            sp2_2_remaindelivering: filterRawData[i].sp2_2_remaindelivering,
            sp2_2_ttl_delivered: filterRawData[i].sp2_2_ttl_delivered,
            sp2_2_delivered: filterRawData[i].sp2_2_delivered,
            sp2_2_sop: filterRawData[i].sp2_2_sop,
            sp2_2_appsheet: filterRawData[i].sp2_2_appsheet,
            sp2_3: filterRawData[i].sp2_3,
            sp2_3_is_servicce_bonus: filterRawData[i].sp2_3_is_servicce_bonus,
            sp2_3_serve_type: filterRawData[i].sp2_3_serve_type,
            sp2_3_onhold: filterRawData[i].sp2_3_onhold,
            sp2_3_remaindelivering: filterRawData[i].sp2_3_remaindelivering,
            sp2_3_ttl_delivered: filterRawData[i].sp2_3_ttl_delivered,
            sp2_3_delivered: filterRawData[i].sp2_3_delivered,
            sp2_3_sop: filterRawData[i].sp2_3_sop,
            sp2_3_appsheet: filterRawData[i].sp2_3_appsheet,
            sp2_attendance: filterRawData[i].sp2_attendance,
            epod: filterRawData[i].epod,
            ttl_delivered: weekDataforSave[0].ttl_delivered,
            ttl_worksday: weekDataforSave[0].ttl_worksday,
            ttl_workday_weekend: weekDataforSave[0].ttl_workday_weekend,
            seq: weekDataforSave[0].seq,
            epod_lost: weekDataforSave[0].epod_lost,
            weeknum: weekDataforSave[0].weeknum,
            uncleanCnt: weekDataforSave[0].uncleanCnt,
            is_online_bonus: weekDataforSave[0].is_online_bonus,
          }
          tempArray.push(getallData)
        }
        setUploadItem(tempArray)
    }

    const massiveRecordUpload = async () => {
        try{
            const formData = new FormData()
            formData.append('dataset', JSON.stringify(uploadItem))
    
            const {data} = await axios.post('http://localhost:4000/api/admin/massive-upload',formData)
    
            if(data.success){
                toast.success(data.message)
                setUploadItem([])
                getDB()
            }else{
                toast.error(data.message)
            }
    
        }catch(error){
            console.log(error)
        }
      }
  
    return state && (
    <div className='flex flex-col pl-8 w-2/3 md:w-5/6 pr-4 h-full overflow-hidden'>  
        <div className='w-fit flex justify-end mt-3 flex-row items-center gap-2'>
            <div className='flex flex-row gap-2 items-center p-2 bg-[#004e76] text-white rounded-md'>
                <FaFilter />
                <button onClick={()=>setRawFilter(true)}>篩選</button>
            </div>
            <div>
                {!isMassiveUpload?
                <div className='flex flex-row gap-2 items-center p-2 bg-blue-600 text-white rounded-md'>
                    <MdOutlineAdsClick />
                    <button onClick={()=>{setIsMassiveUpload(true); addUploadItem();}}>批量上傳</button>
                </div>:
                <div className='flex flex-row gap-2 items-center p-2 bg-orange-600 text-white rounded-md'>
                    <div className='flex flex-row items-center gap-2'>
                        <ImCross />
                        <button onClick={()=>{setIsMassiveUpload(false); setUploadItem([])}}>取消上傳</button>
                    </div>
                    <hr className='rotate-90 w-4'/>
                    <div className='flex flex-row items-center gap-2'>
                        <FaCheck />
                        <button onClick={()=>massiveRecordUpload()}>確認上傳</button>
                    </div>
                    <hr className='rotate-90 w-4'/>
                    <p>{uploadItem.length} 筆</p>
                </div>
                }
            </div>
        </div>
        {isRawFilter?<Filter filterData={filterdData} status='raw' setDateRawFilterPreview={setDateRawFilterPreview} dateRawFilterPreview={dateRawFilterPreview} 
        setRiderRawFilterPreview={setRiderRawFilterPreview} riderRawFilterPreview={riderRawFilterPreview} setDateRawFilterConfirm={setDateRawFilterConfirm}
        setRiderRawFilterConfirm={setRiderRawFilterConfirm} dateRawFilterConfirm={dateRawFilterConfirm} riderRawFilterConfirm={riderRawFilterConfirm}/>:''}
        {isShowAdminDetail?
            <Detail 
                token={token}
                name={displayMainItem.name}
                date={new Date(displayMainItem.date).toLocaleDateString()}
                is_garantee={displayMainItem.is_garantee}
                sp2_1={displayMainItem.sp2_1}
                sp2_1_is_servicce_bonus={displayMainItem.sp2_1_is_servicce_bonus}
                sp2_1_remaindelivering={displayMainItem.sp2_1_remaindelivering}
                sp2_1_ttl_delivered={displayMainItem.sp2_1_ttl_delivered}
                sp2_1_delivered={displayMainItem.sp2_1_delivered}
                sp2_1_onhold={displayMainItem.sp2_1_onhold}
                sp2_1_appsheet={displayMainItem.sp2_1_appsheet}
                sp2_1_serve_type={displayMainItem.sp2_1_serve_type}
                sp2_1_sop={displayMainItem.sp2_1_sop}
                sp2_2={displayMainItem.sp2_2}
                sp2_2_is_servicce_bonus={displayMainItem.sp2_2_is_servicce_bonus}
                sp2_2_remaindelivering={displayMainItem.sp2_2_remaindelivering}
                sp2_2_ttl_delivered={displayMainItem.sp2_2_ttl_delivered}
                sp2_2_delivered={displayMainItem.sp2_2_delivered}
                sp2_2_onhold={displayMainItem.sp2_2_onhold}
                sp2_2_appsheet={displayMainItem.sp2_2_appsheet}
                sp2_2_serve_type={displayMainItem.sp2_2_serve_type}
                sp2_2_sop={displayMainItem.sp2_2_sop}
                sp2_3={displayMainItem.sp2_3}
                sp2_3_is_servicce_bonus={displayMainItem.sp2_3_is_servicce_bonus}
                sp2_3_remaindelivering={displayMainItem.sp2_3_remaindelivering}
                sp2_3_ttl_delivered={displayMainItem.sp2_3_ttl_delivered}
                sp2_3_delivered={displayMainItem.sp2_3_delivered}
                sp2_3_onhold={displayMainItem.sp2_3_onhold}
                sp2_3_appsheet={displayMainItem.sp2_3_appsheet}
                sp2_3_serve_type={displayMainItem.sp2_3_serve_type}
                sp2_3_sop={displayMainItem.sp2_3_sop}
                epod={displayMainItem.epod}
                lost_cnt='0'
                weeknum={displayMainItem.weeknum}
                sp2_attendance={displayMainItem.sp2_attendance}
                epod_lost={displayOnlineMainItem.epod_lost}
                seq={displayOnlineMainItem.seq}
                ttl_delivered={displayOnlineMainItem.ttl_delivered}
                ttl_workday_weekend={displayOnlineMainItem.ttl_workday_weekend}
                ttl_worksday={displayOnlineMainItem.ttl_worksday}
                uncleanCnt={displayOnlineMainItem.uncleanCnt}
                is_online_bonus={displayOnlineMainItem.is_online_bonus}
                day_report_status='raw'
                week_report_status='raw'
            />
            :''
        }
        <div className='w-full grid grid-cols-6 bg-white p-3 rounded-lg mb-4 text-center mt-4'>
            <p>Date</p>
            <p>Name</p>
            <p>保底獎勵</p>
            <p>服務獎勵</p>
            <p>上線獎勵</p>
            <p>選項</p>
        </div>
        <div className='w-full overflow-scroll text-center'>
            {
                filterRawData.map((item, index)=>(
                <div key={index} className='flex flex-row items-center w-full justify-between'>
                <div className='w-full'>
                    <List date={new Date(item.date).toLocaleDateString()} name={item.name} is_garantee={item.is_garantee} is_service_bonus={item.is_service_bonus} is_online_bonus={item.is_online_bonus} index={index} id={item._id} weeknum={item.weeknum} status='raw' filterdData={filterRawData} isMassiveUpload={isMassiveUpload} uploadItem={uploadItem} setUploadItem={setUploadItem}/>
                </div>
                </div> 
                ))
            }
        </div>
    </div>
  )
}

export default Home