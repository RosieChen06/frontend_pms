import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import axios from 'axios'
import {toast} from 'react-toastify'
import { VscReport } from "react-icons/vsc";
import { LuClipboardPenLine } from "react-icons/lu";
import { BsPaperclip } from "react-icons/bs";

const Report = () => {
      const {getDB, rider, state, token} = useContext(AdminContext)
      const [isResolve, setIsResolve] = useState(true)
      const filterdData = rider.filter((item)=>(
        item.status === 'report'
      ))

      const obj = []

      for(let i=0; i<filterdData.length; i++){
          let test = JSON.parse(JSON.parse(JSON.stringify(filterdData[Number(i)].reportItem)));
          obj.push(test)
      }

      const cancelReport = async (_id) => {
        try{
            const formData = new FormData()
            formData.append('riderId', _id)
            formData.append('status', 'submit')
  
            const {data} = await axios.post('http://localhost:4000/api/user/confirm-data',formData)
  
            if(data.success){
                toast.success('已取消回報')
                getDB()
            }else{
                toast.error(data.message)
            }
  
        }catch(error){
            console.log(error)
        }
    }

    console.log(obj)

  return (
    <div className='w-2/3 md:w-5/6 h-[88vh]'>
      <div className='flex flex-row justify-end px-4 mt-4 w-full mb-4'>
        <p className={!isResolve?'rounded-l-full py-1 px-3 border-2 w-1/2 border-[#004e76] text-white bg-[#004e76] cursor-pointer':'rounded-l-full w-1/2 py-1 px-3 bg-white border-y-2 border-l-2 border-[#004e76] text-[#004e76] cursor-pointer'} onClick={()=>setIsResolve(false)}>待處理</p>
        <p className={!isResolve?'rounded-r-full py-1 px-3 w-1/2 bg-white border-y-2 border-r-2 border-[#004e76] text-[#004e76] cursor-pointer':'rounded-r-full py-1 px-3 w-1/2 border-2 border-[#004e76] text-white bg-[#004e76] cursor-pointer'} onClick={()=>setIsResolve(true)}>已回復</p>
      </div>
      <div className='w-full flex-wrap-reverse h-[76vh] px-4 overflow-scroll'>
        {
          filterdData.map((item, index)=>(
            <div key={index} className='w-full bg-white pt-2 p-2 rounded-lg mb-4'>
              <div className='flex flex-col justify-between'>
                <div>
                  <div className='border-l-4 border-[#004e76] pl-4'>
                    <p>{item.date.slice(0,10)}</p>
                    <p>{item.name}</p>
                  </div>
                  <hr className='w-full bg-gray-100 mt-2'/>
                  <div className='flex flex-row items-center gap-3'>
                    <p className='mt-4 border-l-4 border-gray-400 pl-4'>回報項目</p>
                    <VscReport className='text-lg mt-4'/>
                  </div>
                  <div className='w-full overflow-scroll'>
                    <table className="table-fixed w-full min-w-[1030px] text-left mt-3">
                      <tr>
                          <th class="p-4 border-b border-slate-300 bg-slate-50">
                              <p class="block text-sm font-normal leading-none text-slate-500">門市</p>
                          </th>
                          <th class="p-4 border-b border-slate-300 bg-slate-50">
                              <p class="block text-sm font-normal leading-none text-slate-500">Smart Inbound SOP</p>
                          </th>
                          <th class="p-4 border-b border-slate-300 bg-slate-50">
                              <p class="block text-sm font-normal leading-none text-slate-500">Appsheet滯留包裹</p>
                          </th>
                          <th class="p-4 border-b border-slate-300 bg-slate-50">
                              <p class="block text-sm font-normal leading-none text-slate-500">承攬上線時間</p>
                          </th>
                          <th class="p-4 border-b border-slate-300 bg-slate-50">
                              <p class="block text-sm font-normal leading-none text-slate-500">當周承攬達標比例</p>
                          </th>
                          <th class="p-4 border-b border-slate-300 bg-slate-50">
                              <p class="block text-sm font-normal leading-none text-slate-500">當周承攬達標比例</p>
                          </th>
                      </tr>
                      {obj[index]['1'].length>0?                    
                      <tr class="hover:bg-slate-50">
                        <td class="p-4 border-b border-slate-200">
                            <p class="block text-sm text-slate-800">{item.sp2_1}</p>
                        </td>
                        <td class="p-4 border-b border-slate-200">
                            {obj[index]['1'].includes('smart_inbound')?
                              <p className={item.sp2_1_sop==='未達標'?"block text-md px-3 bg-pink-800 rounded-sm text-white w-fit h-fit":"block text-md px-3 bg-green-500 rounded-sm text-white w-fit h-fit"}>{item.sp2_1_sop==="未達標"?'x':'o'}</p>:''}
                        </td>
                        <td class="p-4 border-b border-slate-200">
                            {obj[index]['1'].includes('Appsheet')?
                              <p className={item.sp2_1_appsheet==='未清空'?"block text-md px-3 bg-pink-800 rounded-sm text-white w-fit h-fit":"block text-md px-3 bg-green-500 rounded-sm text-white w-fit h-fit"}>{item.sp2_1_appsheet==="未清空"?'x':'o'}</p>:''}
                        </td>
                        <td class="p-4 border-b border-slate-200">
                            {obj[index]['1'].includes('attendance')?
                              <p className={item.sp2_1_appsheet==='未達標'?"block text-md px-3 bg-pink-800 rounded-sm text-white w-fit h-fit":"block text-md px-3 bg-green-500 rounded-sm text-white w-fit h-fit"}>{item.sp2_1_attendance==="未達標"?'x':'o'}</p>:''}
                        </td>
                        <td class="p-4 border-b border-slate-200">
                            {obj[index]['1'].includes('work&clean')?
                              <p className="block text-md px-3 bg-pink-800 rounded-sm text-white w-fit h-fit">x</p>:''}
                        </td>
                        <td class="p-4 border-b border-slate-200">
                            {obj[index]['1'].includes('first_delivering_time')?
                              <p className="block text-md px-3 bg-pink-800 rounded-sm text-white w-fit h-fit">x</p>:''}
                        </td>
                      </tr>:''
                      }
                      {obj[index]['2'].length>0?                    
                      <tr class="hover:bg-slate-50">
                        <td class="p-4 border-b border-slate-200">
                            <p class="block text-sm text-slate-800">{item.sp2_2}</p>
                        </td>
                        <td class="p-4 border-b border-slate-200">
                            {obj[index]['2'].includes('smart_inbound')?
                              <p className="block text-md px-3 bg-pink-800 rounded-sm text-white w-fit h-fit">x</p>:''}
                        </td>
                        <td class="p-4 border-b border-slate-200">
                            {obj[index]['2'].includes('Appsheet')?
                              <p className="block text-md px-3 bg-pink-800 rounded-sm text-white w-fit h-fit">x</p>:''}
                        </td>
                        <td class="p-4 border-b border-slate-200">
                            {obj[index]['2'].includes('attendance')?
                              <p className="block text-md px-3 bg-pink-800 rounded-sm text-white w-fit h-fit">x</p>:''}
                        </td>
                        <td class="p-4 border-b border-slate-200">
                            {obj[index]['2'].includes('work&clean')?
                              <p className="block text-md px-3 bg-pink-800 rounded-sm text-white w-fit h-fit">x</p>:''}
                        </td>
                        <td class="p-4 border-b border-slate-200">
                            {obj[index]['2'].includes('first_delivering_time')?
                              <p className="block text-md px-3 bg-pink-800 rounded-sm text-white w-fit h-fit">x</p>:''}
                        </td>
                      </tr>:''
                      }
                      {obj[index]['3'].length>0?                    
                      <tr class="hover:bg-slate-50">
                        <td class="p-4 border-b border-slate-200">
                            <p class="block text-sm text-slate-800">{item.sp2_3}</p>
                        </td>
                        <td class="p-4 border-b border-slate-200">
                            {obj[index]['3'].includes('smart_inbound')?
                              <p className="block text-md px-3 bg-pink-800 rounded-sm text-white w-fit h-fit">x</p>:''}
                        </td>
                        <td class="p-4 border-b border-slate-200">
                            {obj[index]['3'].includes('Appsheet')?
                              <p className="block text-md px-3 bg-pink-800 rounded-sm text-white w-fit h-fit">x</p>:''}
                        </td>
                        <td class="p-4 border-b border-slate-200">
                            {obj[index]['3'].includes('attendance')?
                              <p className="block text-md px-3 bg-pink-800 rounded-sm text-white w-fit h-fit">x</p>:''}
                        </td>
                        <td class="p-4 border-b border-slate-200">
                            {obj[index]['3'].includes('work&clean')?
                              <p className="block text-md px-3 bg-pink-800 rounded-sm text-white w-fit h-fit">x</p>:''}
                        </td>
                        <td class="p-4 border-b border-slate-200">
                            {obj[index]['3'].includes('first_delivering_time')?
                              <p className="block text-md px-3 bg-pink-800 rounded-sm text-white w-fit h-fit">x</p>:''}
                        </td>
                      </tr>:''
                      }
                    </table>
                  </div>
                  <div className='flex flex-row items-center gap-3'>
                    <p className='mt-4 border-l-4 border-gray-400 pl-4'>文字說明</p>
                    <LuClipboardPenLine className='text-lg mt-4'/>
                  </div>
                  <p className='w-full mt-4 bg-slate-50 p-2 text-gray-600'>{item.comment}</p>
                  <div className='flex flex-row mt-2 gap-2 items-center justify-start'> 
                    <BsPaperclip />
                    <p>{obj[index]['1'].length+obj[index]['2'].length+obj[index]['3'].length}份附件</p>
                  </div>
                  <hr className='w-full bg-gray-100 mt-2'/>
                </div>
                <p className='flex mt-4 text-sm text-gray-500 justify-end'>回報日期: {new Date(item.reportdatetime).getFullYear()}/{new Date(item.reportdatetime).getMonth()+1}/{new Date(item.reportdatetime).getDay()} {new Date(item.reportdatetime).getHours()}:{new Date(item.reportdatetime).getMinutes()}:{new Date(item.reportdatetime).getSeconds()}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Report