import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AdminContext } from '../../context/AdminContext'
import { BiDetail } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { FaRegSave } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { VscReport } from "react-icons/vsc";

const Home = () => {

    const {getDB, rider, data, state, setData, token} = useContext(AdminContext)
    const [isShowDetail, setIsShowDetail] = useState(false)
    const [isEdit, setIsEdit] = useState(false)

    const filterdData = data.filter((item)=>(rider.filter((i)=>(i.name===item.user_name)).filter((j)=>(j.date===item.date)).length===0) && item.user_name !=='')
    console.log(data)

    const saveRecord = async (phone, name, date) => {
        try{
            const formData = new FormData()
            formData.append('phone', phone)
            formData.append('name', name)
            formData.append('date', date)

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

    const [displayItem, setDisplayItem] = useState('')

    const displayDetail = (index) =>{
        setDisplayItem(filterdData[index])
        setIsShowDetail(true)
    }

    const [newData, setNewData] = useState({
        phone:'',
        name: '',
        date:'',
        is_garantee:'',
        epod:'',
        is_service_bonus: '',
        is_online_bonus: ''
    })

    const editDetail = (phone, name, date, is_garantee, epod, is_service_bonus, is_online_bonus) => {
        setNewData({
            phone:phone,
            name: name,
            date: date,
            is_garantee: is_garantee,
            epod: epod,
            is_service_bonus: is_service_bonus,
            is_online_bonus: is_online_bonus
        })
        console.log(newData)
        setIsEdit(true)
    }

    const saveEditedData = (epod) =>{
        setData(data.map((item)=>{
            return item.user_name===newData.name && item.date===newData.date?
            {...item, epod:epod}:item
        }))
        setIsEdit(false)
    }

  return state && (
    <div className='flex flex-col pl-8 w-2/3 md:w-5/6 pr-4 h-full overflow-hidden'>  
        <div>

        </div>
        {isShowDetail? 
            <div className='absolute bg-white w-[81%] h-[86.5vh] rounded-lg p-2 mt-3'> 
                <div className='border-l-2 border-gray-300 pl-4'>
                    <div className='flex justify-between'>
                        <p className='text-lg font-bold'>Detail</p>
                        <button className='mr-5' onClick={()=>setIsShowDetail(false)}><IoClose /></button>  
                    </div>
                    <p className='mt-4 text-sm text-gray-700'>Rider Name: {displayItem.user_name}</p>
                    <div className='flex justify-between'>
                        <p className='text-sm text-gray-700'>Date: {displayItem.date.slice(0,10)}</p>
                        <div className='text-sm flex flex-row gap-6 mr-5'>
                            <p className={displayItem.is_garantee==="o"?'border-l-4 border-green-400 pl-2':'border-l-4 border-red-600 pl-2'}>保底獎勵</p>
                            <p className={displayItem.is_online_bonus==="o"?'border-l-4 border-green-400 pl-2':filterdData[0].is_online_bonus==="尚未結算"?'border-l-4 border-gray-400 pl-2':'border-l-4 border-red-600 pl-2'}>上線獎勵</p>
                        </div>
                    </div>
                </div>
                <div className='bg-[#f8f9fd] h-[80%] mt-4 rounded-lg overflow-scroll px-5 py-4'>
                    <div className={displayItem.sp2_1_serve_type==="指定"?'border-l-4 border-green-400 pl-4 rounded-lg bg-white p-2':'border-l-4 border-yellow-400 pl-4 rounded-lg bg-white p-2'}>
                        <div className='flex justify-between pr-2'>    
                            <p className='font-bold'>{displayItem.sp2_1}</p>
                            <p className={displayItem.is_service_bonus==="o"?'border-l-4 border-green-400 pl-2':filterdData[0].is_service_bonus==="△"?'border-l-4 border-yellow-400 pl-2':'border-l-4 border-red-600 pl-2'}>服務獎勵</p>
                        </div>
                        <p className='text-sm font-semibold mt-4'>1. 門市清空</p>
                        <div className='w-full overflow-scroll'>
                            <table className="table-fixed w-full min-w-[730px] text-left mt-3">
                                <tr>
                                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">項目</p>
                                    </th>
                                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">數量(異常)</p>
                                    </th>
                                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">保底獎勵</p>
                                    </th>
                                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">服務獎勵</p>
                                    </th>
                                    {token==='admin'?'':
                                        <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">我要回報</p>
                                    </th>
                                    }
                                </tr>
                                <tr class="hover:bg-slate-50">
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">應配貨量(異常)</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">{displayItem.sp2_1_remain_delivering_qty}</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800"></p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800"></p>
                                    </td>
                                    {token==='admin'?'':                                   
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800"><VscReport className='text-xl'/></p>
                                    </td>
                                    }
                                </tr>
                                <tr class="hover:bg-slate-50">
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">個人總配送量</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">{displayItem.sp2_1_delivered_cnt}</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800"></p>
                                    </td>
                                    {token==='admin'?'':                                   
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800"><VscReport className='text-xl'/></p>
                                    </td>
                                    }
                                </tr>
                                <tr class="hover:bg-slate-50">
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">門市總配送量</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">{displayItem.sp2_1_clened_ttl_cnt}</p>
                                    </td>
                                    <td className="p-4 border-b border-slate-200">
                                        <p className="block text-sm text-slate-800"></p>
                                    </td>
                                    <td className="p-4 border-b border-slate-200">
                                        <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                                    </td>
                                    {token==='admin'?'':                                   
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800"><VscReport className='text-xl'/></p>
                                    </td>
                                    }
                                </tr>
                            </table>
                        </div>
                        <p className='text-sm font-semibold mt-8'>2. 取件流程正確率</p>
                        <div className='w-full overflow-scroll'>
                            <table className="table-fixed w-full min-w-[730px] text-left mt-3">
                                <tr>
                                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">項目</p>
                                    </th>
                                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">結果</p>
                                    </th>
                                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">保底獎勵</p>
                                    </th>
                                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">服務獎勵</p>
                                    </th>
                                    {token==='admin'?'':
                                        <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">我要回報</p>
                                    </th>
                                    }
                                </tr>
                                <tr class="hover:bg-slate-50">
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">Smart Inbound</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">{displayItem.smart_inbound}</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                                    </td>
                                    {token==='admin'?'':                                   
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800"><VscReport className='text-xl'/></p>
                                    </td>
                                    }
                                </tr>
                                <tr class="hover:bg-slate-50">
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">Appsheet滯留包裹</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">{displayItem.appsheet}</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800"></p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                                    </td>
                                    {token==='admin'?'':                                   
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800"><VscReport className='text-xl'/></p>
                                    </td>
                                    }
                                </tr>
                                <tr class="hover:bg-slate-50">
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">EPOD</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">{displayItem.epod}</p>
                                    </td>
                                    <td className="p-4 border-b border-slate-200">
                                        <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                                    </td>
                                    <td className="p-4 border-b border-slate-200">
                                        <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                                    </td>
                                    {token==='admin'?'':                                   
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800"><VscReport className='text-xl'/></p>
                                    </td>
                                    }
                                </tr>
                            </table>
                        </div>
                        <p className='text-sm font-semibold mt-8'>3. 是否接受當日承攬任務</p>
                        <div className='w-full overflow-scroll'>
                            <table className="table-fixed w-full text-left min-w-[730px] mt-3">
                                <tr>
                                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">項目</p>
                                    </th>
                                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">結果</p>
                                    </th>
                                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">保底獎勵</p>
                                    </th>
                                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">服務獎勵</p>
                                    </th>
                                    {token==='admin'?'':
                                        <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">我要回報</p>
                                    </th>
                                    }
                                </tr>
                                <tr class="hover:bg-slate-50">
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">承攬時間</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">{displayItem.smart_inbound}</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                                    </td>
                                    {token==='admin'?'':                                   
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800"><VscReport className='text-xl'/></p>
                                    </td>
                                    }
                                </tr>
                                <tr class="hover:bg-slate-50">
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800"><span className='font-bold'>當週</span>完成承攬任務天數比例</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">{displayItem.appsheet}</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800"></p>
                                    </td>
                                    {token==='admin'?'':                                   
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800"><VscReport className='text-xl'/></p>
                                    </td>
                                    }
                                </tr>
                            </table>
                        </div>
                    </div>
                    {displayItem.sp2_2_serve_type==="-"?'':           
                        <div className={displayItem.sp2_2_serve_type==="指定"?'border-l-4 border-green-400 pl-4 rounded-lg bg-white p-2 mt-4':'border-l-4 border-yellow-400 pl-4 rounded-lg bg-white p-2 mt-4'}>
                            <p className='font-bold'>{displayItem.sp2_2}</p>
                            <div className='w-full overflow-scroll'>
                            <table className="table-fixed w-full min-w-[730px] text-left mt-3">
                                <tr>
                                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">項目</p>
                                    </th>
                                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">數量(異常)</p>
                                    </th>
                                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">保底獎勵</p>
                                    </th>
                                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">服務獎勵</p>
                                    </th>
                                    {token==='admin'?'':
                                        <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">我要回報</p>
                                    </th>
                                    }
                                </tr>
                                <tr class="hover:bg-slate-50">
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">應配貨量(異常)</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">{displayItem.sp2_1_remain_delivering_qty}</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800"></p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800"></p>
                                    </td>
                                    {token==='admin'?'':                                   
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800"><VscReport className='text-xl'/></p>
                                    </td>
                                    }
                                </tr>
                                <tr class="hover:bg-slate-50">
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">個人總配送量</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">{displayItem.sp2_1_delivered_cnt}</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800"></p>
                                    </td>
                                    {token==='admin'?'':                                   
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800"><VscReport className='text-xl'/></p>
                                    </td>
                                    }
                                </tr>
                                <tr class="hover:bg-slate-50">
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">門市總配送量</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">{displayItem.sp2_1_clened_ttl_cnt}</p>
                                    </td>
                                    <td className="p-4 border-b border-slate-200">
                                        <p className="block text-sm text-slate-800"></p>
                                    </td>
                                    <td className="p-4 border-b border-slate-200">
                                        <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                                    </td>
                                    {token==='admin'?'':                                   
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800"><VscReport className='text-xl'/></p>
                                    </td>
                                    }
                                </tr>
                            </table>
                        </div>
                        <p className='text-sm font-semibold mt-8'>2. 取件流程正確率</p>
                        <div className='w-full overflow-scroll'>
                            <table className="table-fixed w-full min-w-[730px] text-left mt-3">
                                <tr>
                                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">項目</p>
                                    </th>
                                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">結果</p>
                                    </th>
                                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">保底獎勵</p>
                                    </th>
                                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">服務獎勵</p>
                                    </th>
                                    {token==='admin'?'':
                                        <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">我要回報</p>
                                    </th>
                                    }
                                </tr>
                                <tr class="hover:bg-slate-50">
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">Smart Inbound</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">{displayItem.smart_inbound}</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                                    </td>
                                    {token==='admin'?'':                                   
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800"><VscReport className='text-xl'/></p>
                                    </td>
                                    }
                                </tr>
                                <tr class="hover:bg-slate-50">
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">Appsheet滯留包裹</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">{displayItem.appsheet}</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800"></p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                                    </td>
                                    {token==='admin'?'':                                   
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800"><VscReport className='text-xl'/></p>
                                    </td>
                                    }
                                </tr>
                                <tr class="hover:bg-slate-50">
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">EPOD</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">{displayItem.epod}</p>
                                    </td>
                                    <td className="p-4 border-b border-slate-200">
                                        <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                                    </td>
                                    <td className="p-4 border-b border-slate-200">
                                        <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                                    </td>
                                    {token==='admin'?'':                                   
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800"><VscReport className='text-xl'/></p>
                                    </td>
                                    }
                                </tr>
                            </table>
                        </div>
                        <p className='text-sm font-semibold mt-8'>3. 是否接受當日承攬任務</p>
                        <div className='w-full overflow-scroll'>
                            <table className="table-fixed w-full text-left min-w-[730px] mt-3">
                                <tr>
                                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">項目</p>
                                    </th>
                                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">結果</p>
                                    </th>
                                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">保底獎勵</p>
                                    </th>
                                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">服務獎勵</p>
                                    </th>
                                    {token==='admin'?'':
                                        <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">我要回報</p>
                                    </th>
                                    }
                                </tr>
                                <tr class="hover:bg-slate-50">
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">承攬時間</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">{displayItem.smart_inbound}</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                                    </td>
                                    {token==='admin'?'':                                   
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800"><VscReport className='text-xl'/></p>
                                    </td>
                                    }
                                </tr>
                                <tr class="hover:bg-slate-50">
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800"><span className='font-bold'>當週</span>完成承攬任務天數比例</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">{displayItem.appsheet}</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800"></p>
                                    </td>
                                    {token==='admin'?'':                                   
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800"><VscReport className='text-xl'/></p>
                                    </td>
                                    }
                                </tr>
                            </table>
                        </div>
                        </div>
                    }
                    {displayItem.sp2_3_serve_type==="-"?'':           
                        <div className={displayItem.sp2_3_serve_type==="指定"?'border-l-4 border-green-400 pl-4 rounded-lg bg-white p-2 mt-4':'border-l-4 border-yellow-400 pl-4 rounded-lg bg-white p-2 mt-4'}>
                            <p className='font-bold'>{displayItem.sp2_2}</p>
                            <p className='text-sm font-semibold mt-4'>1. 門市清空 :</p>
                            <div className='w-full overflow-scroll'>
                            <table className="table-fixed w-full min-w-[730px] text-left mt-3">
                                <tr>
                                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">項目</p>
                                    </th>
                                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">數量(異常)</p>
                                    </th>
                                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">保底獎勵</p>
                                    </th>
                                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">服務獎勵</p>
                                    </th>
                                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">我要回報</p>
                                    </th>
                                </tr>
                                <tr class="hover:bg-slate-50">
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">應配貨量(異常)</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">{displayItem.sp2_1_remain_delivering_qty}</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800"></p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800"></p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800"><VscReport className='text-xl'/></p>
                                    </td>
                                </tr>
                                <tr class="hover:bg-slate-50">
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">個人總配送量</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">{displayItem.sp2_1_delivered_cnt}</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800"></p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800"><VscReport className='text-xl'/></p>
                                    </td>
                                </tr>
                                <tr class="hover:bg-slate-50">
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">門市總配送量</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">{displayItem.sp2_1_clened_ttl_cnt}</p>
                                    </td>
                                    <td className="p-4 border-b border-slate-200">
                                        <p className="block text-sm text-slate-800"></p>
                                    </td>
                                    <td className="p-4 border-b border-slate-200">
                                        <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                                    </td>
                                    <td className="p-4 border-b border-slate-200">
                                        <p className="block text-sm text-slate-800"><VscReport className='text-xl'/></p>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <p className='text-sm font-semibold mt-8'>2. 取件流程正確率</p>
                        <div className='w-full overflow-scroll'>
                            <table className="table-fixed w-full min-w-[730px] text-left mt-3">
                                <tr>
                                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">項目</p>
                                    </th>
                                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">結果</p>
                                    </th>
                                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">保底獎勵</p>
                                    </th>
                                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">服務獎勵</p>
                                    </th>
                                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">我要回報</p>
                                    </th>
                                </tr>
                                <tr class="hover:bg-slate-50">
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">Smart Inbound</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">{displayItem.smart_inbound}</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800"><VscReport className='text-xl'/></p>
                                    </td>
                                </tr>
                                <tr class="hover:bg-slate-50">
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">Appsheet滯留包裹</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">{displayItem.appsheet}</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800"></p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800"><VscReport className='text-xl'/></p>
                                    </td>
                                </tr>
                                <tr class="hover:bg-slate-50">
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">EPOD</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">{displayItem.epod}</p>
                                    </td>
                                    <td className="p-4 border-b border-slate-200">
                                        <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                                    </td>
                                    <td className="p-4 border-b border-slate-200">
                                        <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                                    </td>
                                    <td className="p-4 border-b border-slate-200">
                                        <p className="block text-sm text-slate-800"><VscReport className='text-xl'/></p>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <p className='text-sm font-semibold mt-8'>3. 是否接受當日承攬任務</p>
                        <div className='w-full overflow-scroll'>
                            <table className="table-fixed w-full text-left min-w-[730px] mt-3">
                                <tr>
                                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">項目</p>
                                    </th>
                                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">結果</p>
                                    </th>
                                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">保底獎勵</p>
                                    </th>
                                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">服務獎勵</p>
                                    </th>
                                    <th class="p-4 border-b border-slate-300 bg-slate-50">
                                        <p class="block text-sm font-normal leading-none text-slate-500">我要回報</p>
                                    </th>
                                </tr>
                                <tr class="hover:bg-slate-50">
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">承攬時間</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">{displayItem.smart_inbound}</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800"><VscReport className='text-xl'/></p>
                                    </td>
                                </tr>
                                <tr class="hover:bg-slate-50">
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800"><span className='font-bold'>當週</span>完成承攬任務天數比例</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800">{displayItem.appsheet}</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800"></p>
                                    </td>
                                    <td class="p-4 border-b border-slate-200">
                                        <p class="block text-sm text-slate-800"><VscReport className='text-xl'/></p>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        </div>
                    }
                </div> 
            </div>
            :''
        }
        {isEdit? 
            <div className='absolute bg-white w-[81%] h-[86%] rounded-lg p-2 mt-3'> 
                <div className='border-l-2 border-gray-300 pl-4'>
                    <div className='flex justify-between'>
                        <p className='text-lg font-bold'>Edit</p>
                        <div className='flex flex-row gap-4 pr-5'>
                            <button className='px-4 py-1 rounded-lg bg-gray-200' onClick={()=>setIsEdit(false)}>Cancel</button>
                            <button className='px-4 py-1 rounded-lg bg-green-200' onClick={()=>saveEditedData(newData.epod)}>Save</button>
                        </div>
                    </div>
                    <p className='mt-4 text-sm text-gray-700'>Rider Name: {newData.user_name}</p>
                    <div className='flex justify-between'>
                        <p className='text-sm text-gray-700'>Date: {newData.date.slice(0,10)}</p>
                        <div className='text-sm flex flex-row gap-6 mr-5'>
                            <select type='text' value={newData.is_garantee} onChange={e=>setNewData(prev =>({...prev, is_garantee: e.target.value}))}>
                                <option value='o'>o</option>
                                <option value='x'>x</option>
                                <option value='-'>-</option>
                            </select>
                            <p className={displayItem.is_service_bonus==="o"?'border-l-4 border-green-400 pl-2':filterdData[0].is_service_bonus==="△"?'border-l-4 border-yellow-400 pl-2':'border-l-4 border-red-600 pl-2'}>服務獎勵</p>
                            <p className={displayItem.is_online_bonus==="o"?'border-l-4 border-green-400 pl-2':filterdData[0].is_online_bonus==="尚未結算"?'border-l-4 border-gray-400 pl-2':'border-l-4 border-red-600 pl-2'}>上線獎勵</p>
                        </div>
                    </div>
                </div>
                <div className='bg-[#f8f9fd] h-[86%] mt-4 rounded-lg px-5 py-4'>
                    <div className={displayItem.sp2_1_serve_type==="指定"?'border-l-4 border-green-400 pl-4 rounded-lg bg-white p-2':'border-l-4 border-yellow-400 pl-4 rounded-lg bg-white p-2'}>
                        <p className='font-bold'>{displayItem.sp2_1}</p>
                        <p className='text-sm font-semibold mt-4'>1. 門市清空 :</p>
                        <p className='text-sm'>Remain Delivering Count:</p>
                        <p className='text-sm'>Onhold Count:</p>
                        <p className='text-sm'>Total Delivered:</p>
                        <p className='text-sm'>Personal Delivered:</p> 
                        <hr className='my-4' />
                        <p className='text-sm font-semibold mt-4'>2. 取件流程正確率 :</p>
                        <p className='text-sm'>Smart Inbound:</p>
                        <p className='text-sm'>Appsheet滯留包裹:</p> 
                        <input type='text' value={newData.epod} onChange={e=>setNewData(prev =>({...prev, epod: e.target.value}))}></input>
                        <hr className='my-4' />
                        <p className='text-sm font-semibold mt-4'>3. 是否接受當日承攬任務 :</p>
                        <p className='text-sm'>承攬開始時間:</p>
                    </div>
                </div>
            </div>:''
        }
        <div className='w-[82%] grid grid-cols-5 bg-white p-3 rounded-lg mb-4 text-center mt-4'>
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
                    <div className='w-[82%] grid grid-cols-5 bg-white p-3 mb-2 mr-8'>
                        <p>{item.date.slice(0,10)}</p>
                        <p>{item.user_name}</p>
                        <p>{item.is_garantee}</p>
                        <p>{item.is_service_bonus}</p>
                        <p>{item.is_online_bonus}</p>
                    </div>
                    <div className='flex flex-row gap-4'>
                        <button onClick={()=>displayDetail(index)} className='bg-white p-3 rounded-full'><BiDetail /></button>
                        <button onClick={()=>editDetail(item.rider_phone_num, item.user_name, item.date, item.is_garantee, item.epod)} className='bg-white p-3 rounded-full'><FaRegEdit /></button>
                        <button onClick={()=>saveRecord(item.rider_phone_num, item.user_name, item.date)} className='bg-white p-3 rounded-full'><FaRegSave /></button>
                    </div>
                </div> 
                ))
            }
        </div>
    </div>
  )
}

export default Home