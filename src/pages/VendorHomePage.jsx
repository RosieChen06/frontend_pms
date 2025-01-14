import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AdminContext } from '../../context/AdminContext'
import { BiDetail } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { MdOutlineFactCheck } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import List from '../components/List';
import Detail from '../components/Detail';
import { UserContext } from '../../context/UserContext';


const VendorHomePage = () => {

    const {getDB, rider, state, token} = useContext(AdminContext)
    const {isShowDetail, setIsShowDetail, displayItem, setDisplayItem, reportForm, setReportForm} = useContext( UserContext)
    const [comment, setComment] = useState('')
    const [image1, setImage1] = useState(false)
    const [image2, setImage2] = useState(false)
    const [image3, setImage3] = useState(false)

    const filterdData = rider.filter((item)=>(
      item.status === 'submit'
    ))

    const displayDetail = (index) =>{
        setDisplayItem(filterdData[index])
        setIsShowDetail(true)
    }

    const reportItem = {
      '1':[],
      '2':[],
      '3':[]
    }

    const resetReportItem = (sp2_index, value) => {
      if(reportItem[sp2_index].indexOf(value)===-1){
        reportItem[sp2_index].push(value)
        console.log(value)
        console.log(reportItem)
      }else{
        reportItem[sp2_index].splice(reportItem[sp2_index].indexOf(value), 1)
        console.log(reportItem)
      }
    }

    const isReport = async (_id) => {

        if(reportItem['1'].length===0 && reportItem['2'].length===0 && reportItem['3'].length===0){
            toast.error('請選擇回報項目')
            return
        }
        console.log(reportItem)

        try{
            const formData = new FormData()
            formData.append('riderId', _id)
            formData.append('status', 'report')
            formData.append('reportItem', JSON.stringify(reportItem))
            formData.append('comment', comment)
            formData.append('image1', image1)
            formData.append('image2', image2)
            formData.append('image3', image3)
            formData.append('reportdatetime', new Date())
  
            const {data} = await axios.post('http://localhost:4000/api/user/report',formData)
  
            if(data.success){
                setReportForm(false);
                toast.success(data.message)
                getDB()
            }else{
                toast.error(data.message)
            }
  
        }catch(error){
            console.log(error)
        }
        reportItem['1'].length = 0;
        reportItem['2'].length = 0;
        reportItem['3'].length = 0;
        setComment('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
    }

    const isCheck = async (_id) => {
      try{
          const formData = new FormData()
          formData.append('riderId', _id)
          formData.append('status', 'confirmed')

          const {data} = await axios.post('http://localhost:4000/api/user/confirm-data',formData)

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

  return state && (
    <div className='flex flex-col pl-4 w-2/3 md:w-5/6 pr-4 h-full overflow-hidden'>  
        <div>

        </div>
        {
          reportForm?
          <div className='absolute bg-white w-[80%] h-[86%] rounded-lg p-2 mt-3'>
            <div className='border-l-2 border-gray-300 pl-4'>
              <div className='flex justify-between'>
                  <p className='text-lg font-bold'>異常回報</p>
                  <div className='flex flex-row'>
                    <button className='mr-5 px-6 py-1 bg-yellow-200 rounded-sm' onClick={()=>{setReportForm(false); reportItem['1'].length = 0;reportItem['2'].length = 0;reportItem['3'].length = 0; setComment(''); setImage1(false); setImage2(false); setImage3(false)}}>取消回報</button>  
                    <button className='mr-5 px-6 py-1 bg-green-200 rounded-sm' onClick={()=>{isReport(displayItem._id);}}>提交回報</button>  
                  </div>
              </div>
              <p className='mt-4 text-sm text-gray-700'>Rider Name:</p>
              <div className='flex justify-between'>
                  <p className='text-sm text-gray-700'>Date: </p>
              </div>
            </div>
            <div className='bg-[#f8f9fd] h-[80%] mt-4 rounded-lg overflow-scroll px-5 py-4'>
            <div className={displayItem.sp2_1_serve_type==="指定"?'border-l-4 border-green-400 pl-4 rounded-lg bg-white p-2':'border-l-4 border-yellow-400 pl-4 rounded-lg bg-white p-2'}>
              <div className='flex justify-between pr-2'>    
                  <p className='font-bold'>{displayItem.sp2_1}</p>
              </div>
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
                              <input type='checkbox' value='smart_inbound' onChange={(e)=>resetReportItem(1, e.target.value)}></input>
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
                              <input type='checkbox' value='Appsheet' onChange={(e)=>resetReportItem(1, e.target.value)}></input>
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
                              <input type='checkbox' value='EPOD' onChange={(e)=>resetReportItem(1, e.target.value)}></input>
                          </td>
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
                              <input type='checkbox' value='first_delivering_time' onChange={(e)=>resetReportItem(1, e.target.value)}></input>
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
                              <input type='checkbox' value='work&clean' onChange={(e)=>resetReportItem(1, e.target.value)}></input>
                          </td>
                          }
                      </tr>
                  </table>
              </div>
          </div>
          {displayItem.sp2_2==="-"?'':           
              <div className={displayItem.sp2_2_serve_type==="指定"?'border-l-4 border-green-400 pl-4 rounded-lg bg-white p-2 mt-4':'border-l-4 border-yellow-400 pl-4 rounded-lg bg-white p-2 mt-4'}>
                  <p className='font-bold'>{displayItem.sp2_2}</p>
              <div className='w-full overflow-scroll'>
                  <table className="table-fixed w-full min-w-[730px] text-left mt-3">
                      <tr>
                          <th className="p-4 border-b border-slate-300 bg-slate-50">
                              <p className="block text-sm font-normal leading-none text-slate-500">項目</p>
                          </th>
                          <th className="p-4 border-b border-slate-300 bg-slate-50">
                              <p className="block text-sm font-normal leading-none text-slate-500">結果</p>
                          </th>
                          <th className="p-4 border-b border-slate-300 bg-slate-50">
                              <p className="block text-sm font-normal leading-none text-slate-500">保底獎勵</p>
                          </th>
                          <th className="p-4 border-b border-slate-300 bg-slate-50">
                              <p className="block text-sm font-normal leading-none text-slate-500">服務獎勵</p>
                          </th>
                          {token==='admin'?'':
                              <th className="p-4 border-b border-slate-300 bg-slate-50">
                              <p className="block text-sm font-normal leading-none text-slate-500">我要回報</p>
                          </th>
                          }
                      </tr>
                      <tr className="hover:bg-slate-50">
                          <td className="p-4 border-b border-slate-200">
                              <p className="block text-sm text-slate-800">Smart Inbound</p>
                          </td>
                          <td className="p-4 border-b border-slate-200">
                              <p className="block text-sm text-slate-800">{displayItem.smart_inbound}</p>
                          </td>
                          <td className="p-4 border-b border-slate-200">
                              <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                          </td>
                          <td className="p-4 border-b border-slate-200">
                              <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                          </td>
                          {token==='admin'?'':                                   
                          <td className="p-4 border-b border-slate-200">
                              <input type='checkbox' value='smart_inbound' onChange={(e)=>resetReportItem(2, e.target.value)}></input>
                          </td>
                          }
                      </tr>
                      <tr className="hover:bg-slate-50">
                          <td className="p-4 border-b border-slate-200">
                              <p className="block text-sm text-slate-800">Appsheet滯留包裹</p>
                          </td>
                          <td className="p-4 border-b border-slate-200">
                              <p className="block text-sm text-slate-800">{displayItem.appsheet}</p>
                          </td>
                          <td className="p-4 border-b border-slate-200">
                              <p className="block text-sm text-slate-800"></p>
                          </td>
                          <td className="p-4 border-b border-slate-200">
                              <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                          </td>
                          {token==='admin'?'':                                   
                          <td className="p-4 border-b border-slate-200">
                              <input type='checkbox' value='Appsheet' onChange={(e)=>resetReportItem(2, e.target.value)}></input>
                          </td>
                          }
                      </tr>
                      <tr className="hover:bg-slate-50">
                          <td className="p-4 border-b border-slate-200">
                              <p className="block text-sm text-slate-800">EPOD</p>
                          </td>
                          <td className="p-4 border-b border-slate-200">
                              <p className="block text-sm text-slate-800">{displayItem.epod}</p>
                          </td>
                          <td className="p-4 border-b border-slate-200">
                              <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                          </td>
                          <td className="p-4 border-b border-slate-200">
                              <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                          </td>
                          {token==='admin'?'':                                   
                          <td className="p-4 border-b border-slate-200">
                              <input type='checkbox' value='EPOD' onChange={(e)=>resetReportItem(2, e.target.value)}></input>
                          </td>
                          }
                      </tr>
                      <tr className="hover:bg-slate-50">
                          <td className="p-4 border-b border-slate-200">
                              <p className="block text-sm text-slate-800">承攬時間</p>
                          </td>
                          <td className="p-4 border-b border-slate-200">
                              <p className="block text-sm text-slate-800">{displayItem.smart_inbound}</p>
                          </td>
                          <td className="p-4 border-b border-slate-200">
                              <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                          </td>
                          <td className="p-4 border-b border-slate-200">
                              <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                          </td>
                          {token==='admin'?'':                                   
                          <td className="p-4 border-b border-slate-200">
                              <input type='checkbox' value='first_delivering_time' onChange={(e)=>resetReportItem(2, e.target.value)}></input>
                          </td>
                          }
                      </tr>
                      <tr className="hover:bg-slate-50">
                          <td className="p-4 border-b border-slate-200">
                              <p className="block text-sm text-slate-800"><span className='font-bold'>當週</span>完成承攬任務天數比例</p>
                          </td>
                          <td className="p-4 border-b border-slate-200">
                              <p className="block text-sm text-slate-800">{displayItem.appsheet}</p>
                          </td>
                          <td className="p-4 border-b border-slate-200">
                              <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                          </td>
                          <td className="p-4 border-b border-slate-200">
                              <p className="block text-sm text-slate-800"></p>
                          </td>
                          {token==='admin'?'':                                   
                          <td className="p-4 border-b border-slate-200">
                              <input type='checkbox' value='work&clean' onChange={(e)=>resetReportItem(2, e.target.value)}></input>
                          </td>
                          }
                      </tr>
                  </table>
                </div>
              </div>
          }
          {displayItem.sp2_3==="-"?'':           
              <div className={displayItem.sp2_3_serve_type==="指定"?'border-l-4 border-green-400 pl-4 rounded-lg bg-white p-2 mt-4':'border-l-4 border-yellow-400 pl-4 rounded-lg bg-white p-2 mt-4'}>
                  <p className='font-bold'>{displayItem.sp2_2}</p>
              <div className='w-full overflow-scroll'>
                  <table className="table-fixed w-full min-w-[730px] text-left mt-3">
                      <tr>
                          <th className="p-4 border-b border-slate-300 bg-slate-50">
                              <p className="block text-sm font-normal leading-none text-slate-500">項目</p>
                          </th>
                          <th className="p-4 border-b border-slate-300 bg-slate-50">
                              <p className="block text-sm font-normal leading-none text-slate-500">結果</p>
                          </th>
                          <th className="p-4 border-b border-slate-300 bg-slate-50">
                              <p className="block text-sm font-normal leading-none text-slate-500">保底獎勵</p>
                          </th>
                          <th className="p-4 border-b border-slate-300 bg-slate-50">
                              <p className="block text-sm font-normal leading-none text-slate-500">服務獎勵</p>
                          </th>
                          <th className="p-4 border-b border-slate-300 bg-slate-50">
                              <p className="block text-sm font-normal leading-none text-slate-500">我要回報</p>
                          </th>
                      </tr>
                      <tr className="hover:bg-slate-50">
                          <td className="p-4 border-b border-slate-200">
                              <p className="block text-sm text-slate-800">Smart Inbound</p>
                          </td>
                          <td className="p-4 border-b border-slate-200">
                              <p className="block text-sm text-slate-800">{displayItem.smart_inbound}</p>
                          </td>
                          <td className="p-4 border-b border-slate-200">
                              <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                          </td>
                          <td className="p-4 border-b border-slate-200">
                              <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                          </td>
                          <td className="p-4 border-b border-slate-200">
                              <input type='checkbox' value='smart_inbound' onChange={(e)=>resetReportItem(3, e.target.value)}></input>
                          </td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                          <td className="p-4 border-b border-slate-200">
                              <p className="block text-sm text-slate-800">Appsheet滯留包裹</p>
                          </td>
                          <td className="p-4 border-b border-slate-200">
                              <p className="block text-sm text-slate-800">{displayItem.appsheet}</p>
                          </td>
                          <td className="p-4 border-b border-slate-200">
                              <p className="block text-sm text-slate-800"></p>
                          </td>
                          <td className="p-4 border-b border-slate-200">
                              <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                          </td>
                          <td className="p-4 border-b border-slate-200">
                            <input type='checkbox' value='Appsheet' onChange={(e)=>resetReportItem(3, e.target.value)}></input> 
                          </td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                          <td className="p-4 border-b border-slate-200">
                              <p className="block text-sm text-slate-800">EPOD</p>
                          </td>
                          <td className="p-4 border-b border-slate-200">
                              <p className="block text-sm text-slate-800">{displayItem.epod}</p>
                          </td>
                          <td className="p-4 border-b border-slate-200">
                              <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                          </td>
                          <td className="p-4 border-b border-slate-200">
                              <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                          </td>
                          <td className="p-4 border-b border-slate-200">
                              <input type='checkbox' value='EPOD' onChange={(e)=>resetReportItem(3, e.target.value)}></input>
                          </td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                          <td className="p-4 border-b border-slate-200">
                              <p className="block text-sm text-slate-800">承攬時間</p>
                          </td>
                          <td className="p-4 border-b border-slate-200">
                              <p className="block text-sm text-slate-800">{displayItem.smart_inbound}</p>
                          </td>
                          <td className="p-4 border-b border-slate-200">
                              <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                          </td>
                          <td className="p-4 border-b border-slate-200">
                              <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                          </td>
                          <td className="p-4 border-b border-slate-200">
                              <input type='checkbox' value='first_delivering_time' onChange={(e)=>resetReportItem(3, e.target.value)}></input>
                          </td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                          <td className="p-4 border-b border-slate-200">
                              <p className="block text-sm text-slate-800"><span className='font-bold'>當週</span>完成承攬任務天數比例</p>
                          </td>
                          <td className="p-4 border-b border-slate-200">
                              <p className="block text-sm text-slate-800">{displayItem.appsheet}</p>
                          </td>
                          <td className="p-4 border-b border-slate-200">
                              <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                          </td>
                          <td className="p-4 border-b border-slate-200">
                              <p className="block text-sm text-slate-800"></p>
                          </td>
                          <td className="p-4 border-b border-slate-200">
                              <input type='checkbox' value='work&clean' onChange={(e)=>resetReportItem(3, e.target.value)}></input>
                          </td>
                      </tr>
                  </table>
              </div>
          </div>
          }
          <div>
            <div class="px-4 mt-8 border border-gray-200 bg-white rounded-t-lg dark:bg-gray-800">
                <textarea id="comment" rows="4" onChange={(e)=>{setComment(e.target.value); console.log(comment)}} value={comment} className="outline-none w-full py-2 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required ></textarea>
            </div>
            <div className="flex border gap-4 border-gray-200 flex-row p-2 items-center bg-gray-100 rounded-b-lg">
                <label htmlFor='image1' className={!image1?'bg-white cursor-pointer rounded-sm p-6 border-4 border-dashed':'bg-white cursor-pointer rounded-smborder-4 border-2 rounded-md'}>
                    {!image1?<FiUpload className='font-bold text-2xl'/>: <img className='w-24' src={URL.createObjectURL(image1)}></img>}
                    <input type='file' onChange={(e)=>setImage1(e.target.files[0])} id='image1' hidden></input>
                </label>    
                <label htmlFor='image2' className={!image2?'bg-white cursor-pointer rounded-sm p-6 border-4 border-dashed':'bg-white cursor-pointer rounded-smborder-4 border-2 rounded-md'}>
                    {!image2?<FiUpload className='font-bold text-2xl'/>: <img className='w-24' src={URL.createObjectURL(image2)}></img>}
                    <input type='file' onChange={(e)=>setImage2(e.target.files[0])} id='image2' hidden></input>
                </label>    
                <label htmlFor='image3' className={!image3?'bg-white cursor-pointer rounded-sm p-6 border-4 border-dashed':'bg-white cursor-pointer rounded-smborder-4 border-2 rounded-md'}>
                    {!image3?<FiUpload className='font-bold text-2xl'/>: <img className='w-24' src={URL.createObjectURL(image3)}></img>}
                    <input type='file' onChange={(e)=>setImage3(e.target.files[0])} id='image3' hidden></input>
                </label>    

            </div>
           </div>
            </div>
          </div>:''
        }
        {isShowDetail? 
            <Detail token={token} name={displayItem.name} date={displayItem.date} is_garantee={displayItem.is_garantee} is_service_bonus={displayItem.is_service_bonus} is_online_bonus={displayItem.is_online_bonus} sp2_1={displayItem.sp2_1} sp2_1_serve_type={displayItem.sp2_1_serve_type}
             sp2_2={displayItem.sp2_2} sp2_2_serve_type={displayItem.sp2_2_serve_type} sp2_3={displayItem.sp2_3} sp2_3_serve_type={displayItem.sp2_3_serve_type} sp2_1_remaindelivering={displayItem.sp2_1_remaindelivering} sp2_2_remaindelivering={displayItem.sp2_2_remaindelivering} 
             sp2_3_remaindelivering={displayItem.sp2_3_remaindelivering} sp2_1_delivered_cnt={displayItem.sp2_1_delivered_cnt} sp2_2_delivered_cnt={displayItem.sp2_2_delivered_cnt} sp2_3_delivered_cnt={displayItem.sp2_3_delivered_cnt} sp2_1_clened_ttl_cnt={displayItem.sp2_1_clened_ttl_cnt} 
             sp2_2_clened_ttl_cnt={displayItem.sp2_2_clened_ttl_cnt} sp2_3_clened_ttl_cnt={displayItem.sp2_3_clened_ttl_cnt} appsheet={displayItem.appsheet} sop={displayItem.smart_inbound} epod={displayItem.epod} status='submit' weeknum={displayItem.weeknum}/>
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
                <div key={index} className='flex flex-row items-center w-full'>
                    <List date={item.date} name={item.name} is_garantee={item.is_garantee} is_service_bonus={item.is_service_bonus} is_online_bonus={item.is_online_bonus}/>
                    <div className='flex flex-row gap-4 ml-6'>
                        <button onClick={()=>displayDetail(index)} className='bg-white p-3 rounded-full'><BiDetail /></button>
                        <button onClick={()=>isCheck(item._id)} className='bg-white p-3 rounded-full'><MdOutlineFactCheck /></button>
                    </div>
                </div> 
                ))
            }
        </div>
    </div>
  )
}

export default VendorHomePage