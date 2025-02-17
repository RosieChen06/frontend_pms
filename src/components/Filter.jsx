import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { FaCheck } from "react-icons/fa";
import { toast } from 'react-toastify';
import { AdminContext } from '../../context/AdminContext';
import axios from 'axios'

const Filter = ({filterData, setRiderSubmitFilterConfirm, setDateSubmitFilterConfirm, status,
    setDateFilterPreview, dateFilterPreview, setRiderFilterPreview, riderFilterPreview, setDateConfirmFilterPreview, 
    dateConfirmFilterPreview, setRiderConfirmFilterPreview, riderConfirmFilterPreview, setRiderConfirmFilterConfirm, 
    setDateConfirmFilterConfirm, setDateRawFilterPreview, dateRawFilterPreview, setRiderRawFilterPreview, 
    riderRawFilterPreview, setDateRawFilterConfirm, setRiderRawFilterConfirm, dateSubmitFilterConfirm, riderSubmitFilterConfirm,
    dateConfirmFilterConfirm, riderConfirmFilterConfirm, dateRawFilterConfirm, riderRawFilterConfirm
}) => {

    const {riderList,setRiderList,  dayList, setDayList, setSubmitFilter, dateInput, setDateInput, riderInput, setRiderInput
        , dayConfirmList, setDayConfirmList, riderConfirmList, setRiderConfirmList, setConfirmFilter, clientData, setClientData, clientConfirmData, setClientConfirmData
    } = useContext(UserContext)
    const {rider, setRawFilter, riderRawList, setRiderRawList, dayRawList, setDayRawList} = useContext(AdminContext)
    const [advancedFilter, setAdvancedFilter] = useState([])

    const getFilterList = (type, status) => {
    const riderlist = []
    const datelist = []

    if(dateInput!==''||riderInput!==''){
        if(dateInput!=='' && riderInput!==''){
            if(status==='raw'){
                const advancedFilter = filterData.filter((item)=>(
                    new Date(item.date).toLocaleDateString().startsWith(dateInput) && item.name.startsWith(riderInput)
                ))
                setAdvancedFilter(advancedFilter)
            }else{
                const advancedFilter = rider.filter((item)=>(
                    item.date.startsWith(dateInput) && item.rider.startsWith(riderInput) && item.status===status
                ))
                setAdvancedFilter(advancedFilter)
            }
        }else if(dateInput!==''){
            if(status==='raw'){
                const advancedFilter = filterData.filter((item)=>(
                    new Date(item.date).toLocaleDateString().startsWith(dateInput)
                ))
                setAdvancedFilter(advancedFilter)
            }else{
                const advancedFilter = rider.filter((item)=>(
                    item.date.startsWith(dateInput) && item.status===status
                ))
                setAdvancedFilter(advancedFilter)
            }
        }else{
            if(status==='raw'){
                const advancedFilter = filterData.filter((item)=>(
                    item.name.startsWith(riderInput)
                ))
                setAdvancedFilter(advancedFilter)
            }else{
                const advancedFilter = rider.filter((item)=>(
                    item.name.startsWith(riderInput) && item.status===status
                ))
                setAdvancedFilter(advancedFilter)
            }
        }

        for(let i=0; i<advancedFilter.length; i++){
            let name = advancedFilter[i].name
            let date = advancedFilter[i].date
            riderlist.push(name)
            datelist.push(date)
        }
    }else{
        if(status==='raw'){
            for(let i=0; i<filterData.length; i++){
                let name = filterData[i].name
                let date = new Date(filterData[i].date).toLocaleDateString()
                riderlist.push(name)
                datelist.push(date)
            }
        }else{
            const filteredRider = rider.filter((item)=>item.status===status)
            for(let i=0; i<filteredRider.length; i++){
                let name = filteredRider[i].name
                let date = filteredRider[i].date
                riderlist.push(name)
                datelist.push(date)
            }
        }
    }
    let riderresult = riderlist.filter(function(element, index, arr){
    return arr.indexOf(element) === index;
    });

    if(status==='submit'){
        setRiderList(riderresult)
    }else if(status==='confirm'){
        setRiderConfirmList(riderresult)
    }else{
        setRiderRawList(riderresult)
    }

    let dateresult = datelist.filter(function(element, index, arr){
    return arr.indexOf(element) === index;
    });

    if(status==='submit'){
        setDayList(dateresult.sort((a, b) => new Date(a) - new Date(b)))
    }else if(status==='confirm'){
        setDayConfirmList(dateresult.sort((a, b) => new Date(a) - new Date(b)))
    }else{
        setDayRawList(dateresult.sort((a, b) => new Date(a) - new Date(b)))
    }

    if(type==='dateAllCheck'){
        if(status==='submit'){
            setDateFilterPreview(dateresult)
            return
        }else if(status==='confirm'){
            setDateConfirmFilterPreview(dateresult)
            return
        }else{
            setDateRawFilterPreview(dateresult)
            return
        }
    }
    if(type==='dateAllCancel'){
        if(status==='submit'){
            setDateFilterPreview([])
            return
        }else if(status==='confirm'){
            setDateConfirmFilterPreview([])
            return
        }else{
            setDateRawFilterPreview([])
            return
        }
    }
    if(type==='riderAllCheck'){
        if(status==='submit'){
            setRiderFilterPreview(riderresult)
            return
        }else if(status==='confirm'){
            setRiderConfirmFilterPreview(riderresult)
            return
        }else{
            setRiderRawFilterPreview(riderresult)
            return
        }
    }
    if(type==='riderAllCancel'){
        if(status==='submit'){
            setRiderFilterPreview([])
            return 
        }else if(status==='confirm'){
            setRiderConfirmFilterPreview([])
            return
        }else{
            setRiderRawFilterPreview([])
            return
        }
    }
    }

    useEffect(()=>{
        getFilterList('na', status)
    },[filterData, dateInput, riderInput])

    const dateSelect = (date, status) =>{
        if(status==='submit'){
            if(dateFilterPreview.includes(date)){
                setDateFilterPreview(prev=> prev.filter((item)=> item !== date))
            }else{
                setDateFilterPreview(prev =>[...prev, date])
            }
        }else if(status==='confirm'){
            if(dateConfirmFilterPreview.includes(date)){
                setDateConfirmFilterPreview(prev=> prev.filter((item)=> item !== date))
            }else{
                setDateConfirmFilterPreview(prev =>[...prev, date])
            }
        }else{
            if(dateRawFilterPreview.includes(date)){
                setDateRawFilterPreview(prev=> prev.filter((item)=> item !== date))
            }else{
                setDateRawFilterPreview(prev =>[...prev, date])
            }
        }
    }

    const riderSelect = (rider, status) =>{
        if(status==='submit'){
            if(riderFilterPreview.includes(rider)){
                setRiderFilterPreview(prev=> prev.filter((item)=> item !== rider))
            }else{
                setRiderFilterPreview(prev =>[...prev, rider])
            }
        }else if(status==='confirm'){
            if(riderConfirmFilterPreview.includes(rider)){
                setRiderConfirmFilterPreview(prev=> prev.filter((item)=> item !== rider))
            }else{
                setRiderConfirmFilterPreview(prev =>[...prev, rider])
            }
        }else{
            if(riderRawFilterPreview.includes(rider)){
                setRiderRawFilterPreview(prev=> prev.filter((item)=> item !== rider))
            }else{
                setRiderRawFilterPreview(prev =>[...prev, rider])
            }
        }
    }

    const isFilterEmpty = async(status) => {
        if(status==='submit'){
            if(riderFilterPreview.length === 0 && dateFilterPreview.length === 0){
                toast.error('請選擇篩選項目')
            }else{
                await setDateSubmitFilterConfirm(dateFilterPreview)
                await setRiderSubmitFilterConfirm(riderFilterPreview)
                setSubmitFilter(false)
            }
        }else if(status==='confirm'){
            if(riderConfirmFilterPreview.length === 0 && dateConfirmFilterPreview.length === 0){
                toast.error('請選擇篩選項目')
            }else{
                await setDateConfirmFilterConfirm(dateConfirmFilterPreview)
                await setRiderConfirmFilterConfirm(riderConfirmFilterPreview)
                setConfirmFilter(false)
            }
        }else{
            if(riderRawFilterPreview.length === 0 && dateRawFilterPreview.length === 0){
                toast.error('請選擇篩選項目')
            }else{
                setDateRawFilterConfirm(dateRawFilterPreview)
                setRiderRawFilterConfirm(riderRawFilterPreview)
                setRawFilter(false)
            }
        }
    }

    useEffect(() => {
        findDB(dateSubmitFilterConfirm,riderSubmitFilterConfirm, 'submit');
    }, [dateSubmitFilterConfirm, riderSubmitFilterConfirm]);

    useEffect(() => {
        findDB(dateConfirmFilterConfirm, riderConfirmFilterConfirm, 'confirm');
    }, [dateConfirmFilterConfirm, riderConfirmFilterConfirm]);

    const cancelEvent = () => {
        if(status==='submit'){
            setSubmitFilter(false)
            setDateFilterPreview(dateSubmitFilterConfirm)
            setRiderFilterPreview(riderSubmitFilterConfirm)
        }else if(status==='confirm'){
            setConfirmFilter(false)
            setDateConfirmFilterPreview(dateConfirmFilterConfirm)
            setRiderConfirmFilterPreview(riderConfirmFilterConfirm)
        }else{
            setRawFilter(false)
            setDateRawFilterPreview(dateRawFilterConfirm)
            setRiderRawFilterPreview(riderRawFilterConfirm)
        }
    }

    const findDB = async(date, rider, status) => {
        const formData = new FormData()
        formData.append('dateInput', JSON.stringify(date))
        formData.append('riderInput', JSON.stringify(rider))
        formData.append('statusInput', status)

        const {data} = await axios.post('https://backend-pms.vercel.app/api/user/clientReadData',formData)
        if(status==='submit'){
            setClientData(data.clientData)
        }else if(status==='confirm'){
            setClientConfirmData(data.clientData)
        }
    }

    return (
    <div className='w-full bg-white h-full rounded-lg p-2 flex flex-col md:flex-row gap-4'>
        <div className='flex flex-row w-full md:w-2/3'>
            <div className='flex flex-col hover:bg-slate-100 rounded-md p-2 w-1/2 h-[60svh] md:h-full'>
                <p className='mb-2'>配送日期</p>
                <input type='text' className='rounded-sm text-sm mb-4 h-12 border-2 border-slate-300 p-2' placeholder='請輸入欲查詢日期' value={dateInput} onChange={(e)=>setDateInput(e.target.value)}></input>
                <hr />
                <div className='flex flex-row mt-3 gap-2 sm:gap-3'>
                    <button className='text-xs p-1 px-2 sm:px-5 bg-blue-100 rounded-full' onClick={()=>getFilterList('dateAllCheck', status)}>全選</button>
                    <button className='text-xs p-1 px-2 sm:px-5 bg-red-100 rounded-full' onClick={()=>getFilterList('dateAllCancel', status)}>取消全選</button>
                </div>
                {status!=='submit'?'':dayList?
                    <div className='mt-4 flex flex-col gap-2 h-full overflow-scroll'>
                    {dayList.map((item)=>(
                        <div className='flex flex-row justify-between items-center cursor-pointer' onClick={()=>dateSelect(item, status)}>
                            <p className={dateFilterPreview.includes(item)?'font-bold':'text-gray-600'}>{item}</p>
                            {dateFilterPreview.includes(item)?<FaCheck />:''}
                        </div>
                    ))}
                </div>:''
                }
                {status!=='confirm'?'':dayConfirmList?
                    <div className='mt-4 flex flex-col gap-2 h-full overflow-scroll'>
                    {dayConfirmList.map((item)=>(
                        <div className='flex flex-row justify-between items-center cursor-pointer' onClick={()=>dateSelect(item, status)}>
                            <p className={dateConfirmFilterPreview.includes(item)?'font-bold':'text-gray-600'}>{item}</p>
                            {dateConfirmFilterPreview.includes(item)?<FaCheck />:''}
                        </div>
                    ))}
                </div>:''
                }
                {status!=='raw'?'':dayRawList?
                    <div className='mt-4 flex flex-col gap-2 h-full overflow-scroll'>
                    {dayRawList.map((item)=>(
                        <div className='flex flex-row justify-between items-center cursor-pointer' onClick={()=>dateSelect(item, status)}>
                            <p className={dateRawFilterPreview.includes(item)?'font-bold':'text-gray-600'}>{new Date(item).toLocaleDateString()}</p>
                            {dateRawFilterPreview.includes(item)?<FaCheck />:''}
                        </div>
                    ))}
                </div>:''
                }
            </div>
            <div className='flex flex-col hover:bg-slate-100 rounded-md h-[60vh] md:h-full p-2 w-1/2'>
                <p className='mb-2'>騎手姓名</p>
                <input type='text' className='rounded-sm text-sm mb-4 h-12 border-2 border-slate-300 p-2' placeholder='請輸入欲查詢騎手' value={riderInput} onChange={(e)=>setRiderInput(e.target.value)}></input>
                <hr />
                <div className='flex flex-row mt-3 gap-2 sm:gap-3'>
                    <button className='text-xs p-1 px-2 sm:px-5 bg-blue-100 rounded-full' onClick={()=>getFilterList('riderAllCheck', status)}>全選</button>
                    <button className='text-xs p-1 px-2 sm:px-5 bg-red-100 rounded-full' onClick={()=>getFilterList('riderAllCancel', status)}>取消全選</button>
                </div>
                {status!=='submit'?'':riderList?
                <div className='mt-4 flex flex-col gap-2 h-full overflow-scroll'>
                    {riderList.map((item)=>(
                        <div className='flex flex-row justify-between items-center cursor-pointer' onClick={()=>riderSelect(item, status)}>
                            <p className={riderFilterPreview.includes(item)?'font-bold':'text-gray-600'}>{item}</p>
                            {riderFilterPreview.includes(item)?<FaCheck />:''}
                        </div>
                    ))}
                </div>:''}
                {status!=='confirm'?'':riderConfirmList?
                <div className='mt-4 flex flex-col gap-2 h-full overflow-scroll'>
                    {riderConfirmList.map((item)=>(
                        <div className='flex flex-row justify-between items-center cursor-pointer' onClick={()=>riderSelect(item, status)}>
                            <p className={riderConfirmFilterPreview.includes(item)?'font-bold':'text-gray-600'}>{item}</p>
                            {riderConfirmFilterPreview.includes(item)?<FaCheck />:''}
                        </div>
                    ))}
                </div>:''}
                {status!=='raw'?'':riderRawList?
                <div className='mt-4 flex flex-col gap-2 :h-full overflow-scroll'>
                    {riderRawList.map((item)=>(
                        <div className='flex flex-row justify-between items-center cursor-pointer' onClick={()=>riderSelect(item, status)}>
                            <p className={riderRawFilterPreview.includes(item)?'font-bold':'text-gray-600'}>{item}</p>
                            {riderRawFilterPreview.includes(item)?<FaCheck />:''}
                        </div>
                    ))}
                </div>:''}
            </div>
        </div>
        <div className='flex flex-col rounded-md p-2 w-full md:w-1/3'>
            <button className='mb-2 w-full bg-[#004e76] p-2 rounded-sm text-white' onClick={()=>isFilterEmpty(status)}>確認篩選</button>
            <button className='mb-2 w-full bg-white p-2 rounded-sm text-[#004e76] border-[#004e76] border-2 hover:text-white hover:border-red-600 hover:bg-red-600' onClick={()=>cancelEvent(status)}>取消篩選</button>
        </div>
    </div>
  )
}

export default Filter

