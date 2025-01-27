import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { FaCheck } from "react-icons/fa";
import { toast } from 'react-toastify';
import { AdminContext } from '../../context/AdminContext';

const Filter = ({filterData, setRiderSubmitFilterConfirm, setDateSubmitFilterConfirm, status,
    setDateFilterPreview, dateFilterPreview, setRiderFilterPreview, riderFilterPreview, setDateConfirmFilterPreview, 
    dateConfirmFilterPreview, setRiderConfirmFilterPreview, riderConfirmFilterPreview, setRiderConfirmFilterConfirm, 
    setDateConfirmFilterConfirm, setDateRawFilterPreview, dateRawFilterPreview, setRiderRawFilterPreview, 
    riderRawFilterPreview, setDateRawFilterConfirm, setRiderRawFilterConfirm
}) => {

    const {riderList,setRiderList,  dayList, setDayList, setSubmitFilter
        , dayConfirmList, setDayConfirmList, riderConfirmList, setRiderConfirmList, setConfirmFilter
    } = useContext(UserContext)

    const {setRawFilter, riderRawList, setRiderRawList, dayRawList, setDayRawList} = useContext(AdminContext)

    const getFilterList = (type, status) => {
    const riderlist = []
    const datelist = []

    for(let i=0; i<filterData.length; i++){
        let name = filterData[i].name
        let date = filterData[i].date
        riderlist.push(name)
        datelist.push(date)
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
        setDayList(dateresult)
    }else if(status==='confirm'){
        setDayConfirmList(dateresult)
    }else{
        setDayRawList(dateresult)
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
    },[filterData])

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

    const isFilterEmpty = (status) => {
        if(status==='submit'){
            if(riderFilterPreview.length === 0 && dateFilterPreview.length === 0){
                toast.error('請選擇篩選項目')
            }else{
                setDateSubmitFilterConfirm(dateFilterPreview)
                setRiderSubmitFilterConfirm(riderFilterPreview)
                setSubmitFilter(false)
            }
        }else if(status==='confirm'){
            if(riderConfirmFilterPreview.length === 0 && dateConfirmFilterPreview.length === 0){
                toast.error('請選擇篩選項目')
            }else{
                setDateConfirmFilterConfirm(dateConfirmFilterPreview)
                setRiderConfirmFilterConfirm(riderConfirmFilterPreview)
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

  return (
    <div className='absolute bg-white w-[63%] md:w-[81%] h-[78%] flex flex-row top-32 rounded-lg p-2 mt-3 ml-0 gap-4'>
        <div className='flex flex-col hover:bg-slate-100 rounded-md p-2 w-1/3'>
            <p className='mb-2'>配送日期</p>
            <input type='text' className='rounded-sm mb-4 h-12 border-2 border-slate-300 p-2' placeholder='請輸入欲查詢日期'></input>
            <hr />
            <div className='flex flex-row mt-3 gap-3'>
                <button className='text-xs p-1 px-5 bg-blue-100 rounded-full' onClick={()=>getFilterList('dateAllCheck', status)}>全選</button>
                <button className='text-xs p-1 px-5 bg-red-100 rounded-full' onClick={()=>getFilterList('dateAllCancel', status)}>取消全選</button>
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
        <div className='flex flex-col hover:bg-slate-100 rounded-md p-2 w-1/3'>
            <p className='mb-2'>騎手姓名</p>
            <input type='text' className='rounded-sm mb-4 h-12 border-2 border-slate-300 p-2' placeholder='請輸入欲查詢騎手'></input>
            <hr />
            <div className='flex flex-row mt-3 gap-3'>
                <button className='text-xs p-1 px-5 bg-blue-100 rounded-full' onClick={()=>getFilterList('riderAllCheck', status)}>全選</button>
                <button className='text-xs p-1 px-5 bg-red-100 rounded-full' onClick={()=>getFilterList('riderAllCancel', status)}>取消全選</button>
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
            <div className='mt-4 flex flex-col gap-2 h-full overflow-scroll'>
                {riderRawList.map((item)=>(
                    <div className='flex flex-row justify-between items-center cursor-pointer' onClick={()=>riderSelect(item, status)}>
                        <p className={riderRawFilterPreview.includes(item)?'font-bold':'text-gray-600'}>{item}</p>
                        {riderRawFilterPreview.includes(item)?<FaCheck />:''}
                    </div>
                ))}
            </div>:''}
        </div>
        <div className='flex flex-col rounded-md p-2 w-1/3'>
            <button className='mb-2 w-full bg-[#004e76] p-2 rounded-sm text-white' onClick={()=>isFilterEmpty(status)}>確認篩選</button>
            <button className='mb-2 w-full bg-white p-2 rounded-sm text-[#004e76] border-[#004e76] border-2 hover:text-white hover:border-red-600 hover:bg-red-600' onClick={()=>{setSubmitFilter(false); setConfirmFilter(false)}}>取消篩選</button>
        </div>
    </div>
  )
}

export default Filter

