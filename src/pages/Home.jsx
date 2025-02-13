import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AdminContext } from '../../context/AdminContext'
import List from '../components/List';
import Detail from '../components/Detail';
import { FaFilter } from "react-icons/fa6";
import Filter from '../components/Filter';
import { MdOutlineAdsClick } from "react-icons/md";
import { UserContext } from '../../context/UserContext';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css'
import { Paginator } from 'primereact/paginator';
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";

const Home = () => {

    const {rider, data, state, token, isShowAdminDetail, displayMainItem, isMassiveUpload, setIsMassiveUpload,
        displayOnlineMainItem, isRawFilter, setRawFilter, weekData, getDB, isShowMenu, uploadItem, setUploadItem} = useContext(AdminContext)  
    const {setDateInput, setRiderInput} = useContext(UserContext) 
    const [dateRawFilterPreview, setDateRawFilterPreview] = useState([])
    const [riderRawFilterPreview, setRiderRawFilterPreview] = useState([])
    const [dateRawFilterConfirm, setDateRawFilterConfirm] = useState([])
    const [riderRawFilterConfirm, setRiderRawFilterConfirm] = useState([])
    const [filterRawData, setFilterRawData] = useState([])
    
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

        for(let i=0;i<filterRawData.slice(homeFirst,homeFirst+homeRows).length;i++){

          const weekDataforSave = weekData.filter((item)=>(item.name===filterRawData.slice(homeFirst,homeFirst+homeRows)[i].name && item.weeknum===filterRawData.slice(homeFirst,homeFirst+homeRows)[i].weeknum))

          const getallData={
            phone: filterRawData.slice(homeFirst,homeFirst+homeRows)[i].phone,
            name: filterRawData.slice(homeFirst,homeFirst+homeRows)[i].name,
            date: new Date(filterRawData.slice(homeFirst,homeFirst+homeRows)[i].date).toLocaleDateString(),
            is_garantee: filterRawData.slice(homeFirst,homeFirst+homeRows)[i].is_garantee,
            sp2_1: filterRawData.slice(homeFirst,homeFirst+homeRows)[i].sp2_1,
            sp2_1_is_servicce_bonus: filterRawData.slice(homeFirst,homeFirst+homeRows)[i].sp2_1_is_servicce_bonus,
            sp2_1_serve_type: filterRawData.slice(homeFirst,homeFirst+homeRows)[i].sp2_1_serve_type,
            sp2_1_onhold: filterRawData.slice(homeFirst,homeFirst+homeRows)[i].sp2_1_onhold,
            sp2_1_remaindelivering: filterRawData.slice(homeFirst,homeFirst+homeRows)[i].sp2_1_remaindelivering,
            sp2_1_ttl_delivered: filterRawData.slice(homeFirst,homeFirst+homeRows)[i].sp2_1_ttl_delivered,
            sp2_1_assign_delivered: filterRawData.slice(homeFirst,homeFirst+homeRows)[i].sp2_1_assign_delivered,
            sp2_1_delivered: filterRawData.slice(homeFirst,homeFirst+homeRows)[i].sp2_1_delivered,
            sp2_1_sop: filterRawData.slice(homeFirst,homeFirst+homeRows)[i].sp2_1_sop,
            sp2_1_appsheet: filterRawData.slice(homeFirst,homeFirst+homeRows)[i].sp2_1_appsheet,
            sp2_2: filterRawData.slice(homeFirst,homeFirst+homeRows)[i].sp2_2,
            sp2_2_is_servicce_bonus: filterRawData.slice(homeFirst,homeFirst+homeRows)[i].sp2_2_is_servicce_bonus,
            sp2_2_serve_type: filterRawData.slice(homeFirst,homeFirst+homeRows)[i].sp2_2_serve_type,
            sp2_2_onhold: filterRawData.slice(homeFirst,homeFirst+homeRows)[i].sp2_2_onhold,
            sp2_2_remaindelivering: filterRawData.slice(homeFirst,homeFirst+homeRows)[i].sp2_2_remaindelivering,
            sp2_2_ttl_delivered: filterRawData.slice(homeFirst,homeFirst+homeRows)[i].sp2_2_ttl_delivered,
            sp2_2_assign_delivered: filterRawData.slice(homeFirst,homeFirst+homeRows)[i].sp2_2_assign_delivered,
            sp2_2_delivered: filterRawData.slice(homeFirst,homeFirst+homeRows)[i].sp2_2_delivered,
            sp2_2_sop: filterRawData.slice(homeFirst,homeFirst+homeRows)[i].sp2_2_sop,
            sp2_2_appsheet: filterRawData.slice(homeFirst,homeFirst+homeRows)[i].sp2_2_appsheet,
            sp2_3: filterRawData.slice(homeFirst,homeFirst+homeRows)[i].sp2_3,
            sp2_3_is_servicce_bonus: filterRawData.slice(homeFirst,homeFirst+homeRows)[i].sp2_3_is_servicce_bonus,
            sp2_3_serve_type: filterRawData.slice(homeFirst,homeFirst+homeRows)[i].sp2_3_serve_type,
            sp2_3_onhold: filterRawData.slice(homeFirst,homeFirst+homeRows)[i].sp2_3_onhold,
            sp2_3_remaindelivering: filterRawData.slice(homeFirst,homeFirst+homeRows)[i].sp2_3_remaindelivering,
            sp2_3_ttl_delivered: filterRawData.slice(homeFirst,homeFirst+homeRows)[i].sp2_3_ttl_delivered,
            sp2_3_assign_delivered: filterRawData.slice(homeFirst,homeFirst+homeRows)[i].sp2_3_assign_delivered,
            sp2_3_delivered: filterRawData.slice(homeFirst,homeFirst+homeRows)[i].sp2_3_delivered,
            sp2_3_sop: filterRawData.slice(homeFirst,homeFirst+homeRows)[i].sp2_3_sop,
            sp2_3_appsheet: filterRawData.slice(homeFirst,homeFirst+homeRows)[i].sp2_3_appsheet,
            sp2_attendance: filterRawData.slice(homeFirst,homeFirst+homeRows)[i].sp2_attendance,
            epod: filterRawData.slice(homeFirst,homeFirst+homeRows)[i].epod,
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
    
            const {data} = await axios.post('https://backend-pms.vercel.app/api/admin/massive-upload',formData)
    
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

    const [homeFirst, setHomeFirst] = useState(0);
    const [homeRows, setHomeRows] = useState(50);

    const onPageChange = (event) => {
        setHomeFirst(event.first);
        setHomeRows(event.rows);
        console.log(event)
    }
  
    return state && (
    <div className='w-full sm:w-[80%] h-[96%] overflow-hidden rounded-lg p-2 ml-0 sm:ml-4'> 
        <div className='w-full flex justify-between mt-3 items-center gap-2'>
            <div className={isMassiveUpload?'flex flex-row gap-4 min-w-[350px]':'flex flex-col md:flex-row gap-2 md:gap-4 w-[600%]'}>
                {isShowAdminDetail?'':isRawFilter?'':
                <div className='text-sm sm:text-md flex flex-row gap-2 cursor-pointer items-center p-2 bg-[#004e76] text-white rounded-md min-w-[70px]' onClick={()=>{setRawFilter(true); setDateInput(''); setRiderInput('');}}>
                    <FaFilter />
                    <button>篩選</button>
                </div>}
                {isShowAdminDetail?'':isRawFilter?'':
                <div className='text-sm'>
                    {!isMassiveUpload?
                    <div className='flex flex-row gap-2 items-center p-2 bg-blue-600 text-white rounded-md'>
                        <MdOutlineAdsClick />
                        {uploadItem.length>0?
                            <button>上傳中...</button>:
                            <button onClick={()=>{setIsMassiveUpload(true); addUploadItem();}}>批量上傳</button>
                        }
                    </div>:
                    <div className='text-sm sm:text-md flex flex-row gap-2 items-center p-2 bg-orange-600 text-white rounded-md min-w-[300px]'>
                        <div className='flex flex-row items-center gap-2'>
                            <ImCross />
                            <button onClick={()=>{setIsMassiveUpload(false); setUploadItem([])}}>取消上傳</button>
                        </div>
                        <hr className='rotate-90 w-4'/>
                        <div className='flex flex-row items-center gap-2'>
                            <FaCheck />
                            <button onClick={()=>{massiveRecordUpload(); setIsMassiveUpload(false);}}>確認上傳</button>
                        </div>
                        <hr className='rotate-90 w-4'/>
                        <p>{uploadItem.length} 筆</p>
                    </div>
                    }
                </div>}
            </div>
            {isShowAdminDetail?'':isRawFilter?'':isShowMenu?'':
            <div className='flex-row w-[1050%] justify-end items-center h-8 flex'>
                <div className='hidden lg:block sm:flex'>
                    <Paginator className='bg-slate-50' first={homeFirst} rows={homeRows} totalRecords={filterRawData.length} onPageChange={onPageChange} />
                </div>
                {isMassiveUpload?'':
                    <div className="card block max-w-[220px] lg:hidden">
                    <Paginator className='bg-slate-50 text-[12px] px-1' first={homeFirst} rows={homeRows} totalRecords={filterRawData.length} onPageChange={onPageChange} template={{ layout: 'PrevPageLink CurrentPageReport NextPageLink' }} />
                </div>}
            </div>
            }
        </div>
        {isRawFilter?<Filter filterData={filterdData} status='raw' setDateRawFilterPreview={setDateRawFilterPreview} dateRawFilterPreview={dateRawFilterPreview} 
        setRiderRawFilterPreview={setRiderRawFilterPreview} riderRawFilterPreview={riderRawFilterPreview} setDateRawFilterConfirm={setDateRawFilterConfirm}
        setRiderRawFilterConfirm={setRiderRawFilterConfirm} dateRawFilterConfirm={dateRawFilterConfirm} riderRawFilterConfirm={riderRawFilterConfirm}/>:''}
        {isShowAdminDetail?
            <Detail 
                token={token}
                name={displayMainItem.name}
                ch_name={displayMainItem.name_ch}
                date={new Date(displayMainItem.date).toLocaleDateString()}
                is_garantee={displayMainItem.is_garantee}
                sp2_1={displayMainItem.sp2_1}
                sp2_1_is_servicce_bonus={displayMainItem.sp2_1_is_servicce_bonus}
                sp2_1_remaindelivering={displayMainItem.sp2_1_remaindelivering}
                sp2_1_ttl_delivered={displayMainItem.sp2_1_ttl_delivered}
                sp2_1_delivered={displayMainItem.sp2_1_delivered}
                sp2_1_assign_delivered={displayMainItem.sp2_1_assign_delivered}
                sp2_1_onhold={displayMainItem.sp2_1_onhold}
                sp2_1_appsheet={displayMainItem.sp2_1_appsheet}
                sp2_1_serve_type={displayMainItem.sp2_1_serve_type}
                sp2_1_sop={displayMainItem.sp2_1_sop}
                sp2_2={displayMainItem.sp2_2}
                sp2_2_is_servicce_bonus={displayMainItem.sp2_2_is_servicce_bonus}
                sp2_2_remaindelivering={displayMainItem.sp2_2_remaindelivering}
                sp2_2_ttl_delivered={displayMainItem.sp2_2_ttl_delivered}
                sp2_2_delivered={displayMainItem.sp2_2_delivered}
                sp2_2_assign_delivered={displayMainItem.sp2_2_assign_delivered}
                sp2_2_onhold={displayMainItem.sp2_2_onhold}
                sp2_2_appsheet={displayMainItem.sp2_2_appsheet}
                sp2_2_serve_type={displayMainItem.sp2_2_serve_type}
                sp2_2_sop={displayMainItem.sp2_2_sop}
                sp2_3={displayMainItem.sp2_3}
                sp2_3_is_servicce_bonus={displayMainItem.sp2_3_is_servicce_bonus}
                sp2_3_remaindelivering={displayMainItem.sp2_3_remaindelivering}
                sp2_3_ttl_delivered={displayMainItem.sp2_3_ttl_delivered}
                sp2_3_delivered={displayMainItem.sp2_3_delivered}
                sp2_3_assign_delivered={displayMainItem.sp2_3_assign_delivered}
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
        <div className='w-full h-full overflow-scroll mt-6'>
            <table className='table-fixed w-full min-w-[730px] text-center'>   
                {isShowMenu?'':
                <tr className='sticky top-0 z-1'>
                    <th className="p-4 border-b border-slate-300 bg-slate-50">
                        <p className="block text-sm font-normal leading-none text-slate-500">Date</p>
                    </th>
                    <th className="p-4 border-b border-slate-300 bg-slate-50">
                        <p className="block text-sm font-normal leading-none text-slate-500">Rider</p>
                    </th>
                    <th className="p-4 border-b border-slate-300 bg-slate-50">
                        <p className="block text-sm font-normal leading-none text-slate-500">保底獎勵</p>
                    </th>
                    <th className="p-4 border-b border-slate-300 bg-slate-50">
                        <p className="block text-sm font-normal leading-none text-slate-500">服務獎勵</p>
                    </th>
                    <th className="p-4 border-b border-slate-300 bg-slate-50">
                        <p className="block text-sm font-normal leading-none text-slate-500">上線獎勵</p>
                    </th>
                    <th className="p-4 border-b border-slate-300 bg-slate-50">
                        <p className="block text-sm font-normal leading-none text-slate-500">選項獎勵</p>
                    </th>
                </tr>}
                {filterRawData.slice(homeFirst,homeFirst+homeRows).map((item, index)=>(
                    <List date={new Date(item.date).toLocaleDateString()} name={item.name} is_garantee={item.is_garantee} is_service_bonus={item.is_service_bonus} is_online_bonus={weekData.filter((i)=>(i.weeknum===item.weeknum && i.name===item.name))[0].is_online_bonus} index={index} id={item._id} sp2_1_is_service_bonus={item.sp2_1_is_servicce_bonus} sp2_2_is_service_bonus={item.sp2_2_is_servicce_bonus} sp2_3_is_service_bonus={item.sp2_3_is_servicce_bonus} weeknum={item.weeknum} status='raw' filterdData={filterRawData} isMassiveUpload={isMassiveUpload} uploadItem={uploadItem} setUploadItem={setUploadItem} first={homeFirst} rows={homeRows}/>
                ))
                }
            </table>
        </div>
    </div>
  )
}

export default Home
