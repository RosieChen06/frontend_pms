import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { UserContext } from '../../context/UserContext'
import { FaCheck } from "react-icons/fa";
import { toast } from 'react-toastify';

const Filter = ({filterData, setRiderSubmitFilterConfirm, setDateSubmitFilterConfirm}) => {

    const {rider} = useContext(AdminContext)
    const {riderList,setRiderList,  dayList, setDayList, 
        submitDataFilter, setSubmitDataFilter, setSubmitFilter, dateFilterPreview, setDateFilterPreview, riderFilterPreview, setRiderFilterPreview} = useContext(UserContext)

    const getFilterList = (type) => {
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

    setRiderList(riderresult)

    let dateresult = datelist.filter(function(element, index, arr){
    return arr.indexOf(element) === index;
    });
    setDayList(dateresult)
    if(type==='dateAllCheck'){
        setDateFilterPreview(dateresult)
        return
    }
    if(type==='dateAllCancel'){
        setDateFilterPreview([])
        return
    }
    if(type==='riderAllCheck'){
        setRiderFilterPreview(riderresult)
        return
    }
    if(type==='riderAllCancel'){
        setRiderFilterPreview([])
        return
    }
    }

    useEffect(()=>{
    getFilterList('na')
    },[filterData])

    const dateSelect = (date) =>{
        if(dateFilterPreview.includes(date)){
            setDateFilterPreview(prev=> prev.filter((item)=> item !== date))
        }else{
            setDateFilterPreview(prev =>[...prev, date])
        }
    }

    const riderSelect = (rider) =>{
        if(riderFilterPreview.includes(rider)){
            setRiderFilterPreview(prev=> prev.filter((item)=> item !== rider))
        }else{
            setRiderFilterPreview(prev =>[...prev, rider])
        }
    }

    const isFilterEmpty = () => {
        if(riderFilterPreview.length === 0 && dateFilterPreview.length === 0){
            toast.error('請選擇篩選項目')
        }else{
            setDateSubmitFilterConfirm(dateFilterPreview)
            setRiderSubmitFilterConfirm(riderFilterPreview)
            setSubmitFilter(false)
        }
    }

    console.log(dateFilterPreview)

  return (
    <div className='absolute bg-white w-[63%] md:w-[81%] h-[78%] flex flex-row top-32 rounded-lg p-2 mt-3 ml-0 gap-4'>
        <div className='flex flex-col hover:bg-slate-100 rounded-md p-2 w-1/3'>
            <p className='mb-2'>配送日期</p>
            <input type='text' className='rounded-sm mb-4 h-12 border-2 border-slate-300 p-2' placeholder='請輸入欲查詢日期'></input>
            <hr />
            <div className='flex flex-row mt-3 gap-3'>
                <button className='text-xs p-1 px-5 bg-blue-100 rounded-full' onClick={()=>getFilterList('dateAllCheck')}>全選</button>
                <button className='text-xs p-1 px-5 bg-red-100 rounded-full' onClick={()=>getFilterList('dateAllCancel')}>取消全選</button>
            </div>
            {dayList?
                <div className='mt-4 flex flex-col gap-2 h-full overflow-scroll'>
                {dayList.map((item)=>(
                    <div className='flex flex-row justify-between items-center cursor-pointer' onClick={()=>dateSelect(item)}>
                        <p className={dateFilterPreview.includes(item)?'font-bold':'text-gray-600'}>{item}</p>
                        {dateFilterPreview.includes(item)?<FaCheck />:''}
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
                <button className='text-xs p-1 px-5 bg-blue-100 rounded-full' onClick={()=>getFilterList('riderAllCheck')}>全選</button>
                <button className='text-xs p-1 px-5 bg-red-100 rounded-full' onClick={()=>getFilterList('riderAllCancel')}>取消全選</button>
            </div>
            {riderList?
            <div className='mt-4 flex flex-col gap-2 h-full overflow-scroll'>
                {riderList.map((item)=>(
                    <div className='flex flex-row justify-between items-center cursor-pointer' onClick={()=>riderSelect(item)}>
                        <p className={riderFilterPreview.includes(item)?'font-bold':'text-gray-600'}>{item}</p>
                        {riderFilterPreview.includes(item)?<FaCheck />:''}
                    </div>
                ))}
            </div>:''}
        </div>
        <div className='flex flex-col rounded-md p-2 w-1/3'>
            <button className='mb-2 w-full bg-[#004e76] p-2 rounded-sm text-white' onClick={()=>isFilterEmpty()}>確認篩選</button>
            <button className='mb-2 w-full bg-white p-2 rounded-sm text-[#004e76] border-[#004e76] border-2 hover:text-white hover:border-red-600 hover:bg-red-600' onClick={()=>setSubmitFilter(false)}>取消篩選</button>
        </div>
    </div>
  )
}

export default Filter

