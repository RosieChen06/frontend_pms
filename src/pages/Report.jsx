import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import axios from 'axios'
import {toast} from 'react-toastify'
import { VscReport } from "react-icons/vsc";
import { LuClipboardPenLine } from "react-icons/lu";
import { BsPaperclip } from "react-icons/bs";
import { FiUpload } from "react-icons/fi";

const Report = () => {
      const {getDB, rider, state, token} = useContext(AdminContext)
      const [isResolve, setIsResolve] = useState('report')
      const [image1, setImage1] = useState(false)
      const [image2, setImage2] = useState(false)
      const [image3, setImage3] = useState(false)
      const [uploadimage1, setUploadImage1] = useState(false)
      const [uploadimage2, setUploadImage2] = useState(false)
      const [uploadimage3, setUploadImage3] = useState(false)
      const [replyItem, setReplyItem] = useState([])
      const [isReply, setIsReply] = useState(false)

      const filterdData = rider.filter((item)=>(
        item.status === isResolve
      ))

      const obj = []

      for(let i=0; i<filterdData.length; i++){
          let test = JSON.parse(JSON.parse(JSON.stringify(filterdData[Number(i)].reportItem)));
          obj.push(test)
      }

      const changeReportStatus = async (_id, status, reply) => {
        try{
            const formData = new FormData()
            formData.append('riderId', _id)
            formData.append('status', status)
  
            const {data} = await axios.post('http://localhost:4000/api/user/confirm-data',formData)
  
            if(data.success){
                toast.success(reply)
                getDB()
            }else{
                toast.error(data.message)
            }
  
        }catch(error){
            console.log(error)
        }
    }

    const showReportForm = (index) =>{
      setReplyItem(filterdData[index])
      setIsReply(true)
  }

  const isReport = async (_id) => {

    let seletedData = filterdData.filter((item)=>(item._id===_id))

    if(!image1){
      setUploadImage1(seletedData[0].image[0])
    }else{
      setUploadImage1(image1)
    }
    if(!image2){
      setUploadImage2(seletedData[0].image[1])
    }else{
      setUploadImage2(image2)
    }
    if(!image3){
      setUploadImage3(seletedData[0].image[2])
    }else{
      setUploadImage3(image3)
    }

    console.log(uploadimage1)
    console.log(uploadimage2)
    console.log(uploadimage3)

    try{
        const formData = new FormData()
        formData.append('riderId', _id)
        formData.append('status', 'report')
        formData.append('comment', replyItem.comment)
        formData.append('uploadimage1', uploadimage1)
        formData.append('uploadimage2', uploadimage2)
        formData.append('uploadimage3', uploadimage3)

        const {data} = await axios.post('http://localhost:4000/api/user/reply',formData)

        if(data.success){
            setIsReply(false);
            toast.success(data.message)
            getDB()
        }else{
            toast.error(data.message)
        }

    }catch(error){
        console.log(error)
    }

    // setImage1(false)
    // setImage2(false)
    // setImage3(false)
    // setUploadImage1(false)
    // setUploadImage2(false)
    // setUploadImage3(false)
}

  return (
    <div className='w-2/3 md:w-5/6 h-[88vh]'>
      <div className='flex flex-row justify-end px-4 mt-4 w-full mb-4'>
        <p className={isResolve==='report'?'rounded-l-full py-1 px-3 border-2 w-1/2 border-[#004e76] text-white bg-[#004e76] cursor-pointer':'rounded-l-full w-1/2 py-1 px-3 bg-white border-y-2 border-l-2 border-[#004e76] text-[#004e76] cursor-pointer'} onClick={()=>setIsResolve('report')}>待處理</p>
        <p className={isResolve!=='resolve'?'rounded-r-full py-1 px-3 w-1/2 bg-white border-y-2 border-r-2 border-[#004e76] text-[#004e76] cursor-pointer':'rounded-r-full py-1 px-3 w-1/2 border-2 border-[#004e76] text-white bg-[#004e76] cursor-pointer'} onClick={()=>setIsResolve('resolve')}>已回復</p>
      </div>
      <div className='w-full flex-wrap-reverse h-[76vh] px-4 overflow-scroll'>
        {isReply?
          <div className='absolute bg-white w-[81%] h-[76vh] rounded-lg p-2'>
            <div className='border-l-2 border-gray-300 pl-4'>
              <div className='flex justify-between'>
                  <p className='text-lg font-bold'>異常回復</p>
                  <div className='flex flex-row'>
                    <button className='mr-5 px-6 py-1 bg-yellow-200 rounded-sm' onClick={()=>setIsReply(false)}>取消回復</button>  
                    <button className='mr-5 px-6 py-1 bg-green-200 rounded-sm' onClick={()=>{isReport(replyItem._id)}}>提交回復</button>  
                  </div>
              </div>
              <p className='mt-4 text-sm text-gray-700'>Rider Name: {replyItem.name}</p>
              <div className='flex justify-between'>
                  <p className='text-sm text-gray-700'>Date: {replyItem.date.slice(0,10)}</p>
              </div>
            </div>
            <div class="px-4 mt-8 border border-gray-200 bg-white rounded-t-lg dark:bg-gray-800">
                <textarea id="comment" rows="4" onChange={e=>setReplyItem(prev => ({...prev, comment: e.target.value}))} value={replyItem.comment} className="outline-none w-full py-2 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required ></textarea>
            </div>
            <div className="flex border gap-4 border-gray-200 flex-row p-2 items-center bg-gray-100 rounded-b-lg">
                <label htmlFor='image1' className={!replyItem.image[0] && !image1?'bg-white cursor-pointer rounded-sm p-6 border-4 border-dashed':'bg-white cursor-pointer rounded-smborder-4 border-2 rounded-md'}>
                    {image1?<img className='w-24' src={URL.createObjectURL(image1)}></img>:replyItem.image[0]?<img className='w-24' src={replyItem.image[0]}></img>:<FiUpload className='font-bold text-2xl'/>}
                    <input type='file' onChange={(e)=>setImage1(e.target.files[0])} id='image1' hidden></input>
                </label>    
                <label htmlFor='image2' className={!replyItem.image[1] && !image2?'bg-white cursor-pointer rounded-sm p-6 border-4 border-dashed':'bg-white cursor-pointer rounded-smborder-4 border-2 rounded-md'}>
                    {image2?<img className='w-24' src={URL.createObjectURL(image2)}></img>:replyItem.image[1]?<img className='w-24' src={replyItem.image[1]}></img>:<FiUpload className='font-bold text-2xl'/>}
                    <input type='file' onChange={(e)=>setImage2(e.target.files[0])} id='image2' hidden></input>
                </label>   
                <label htmlFor='image3' className={!replyItem.image[2] && !image3?'bg-white cursor-pointer rounded-sm p-6 border-4 border-dashed':'bg-white cursor-pointer rounded-smborder-4 border-2 rounded-md'}>
                    {image3?<img className='w-24' src={URL.createObjectURL(image3)}></img>:replyItem.image[2]?<img className='w-24' src={replyItem.image[2]}></img>:<FiUpload className='font-bold text-2xl'/>}
                    <input type='file' onChange={(e)=>setImage3(e.target.files[0])} id='image3' hidden></input>
                </label>    

            </div>
            </div>:''
        }
        {
          filterdData.map((item, index)=>(
            <div key={index} className='w-full bg-white pt-2 p-2 rounded-lg mb-4'>
              <div className='flex flex-col justify-between'>
                <div>
                  <div className='flex flex-row justify-between'>
                    <div className='border-l-4 border-[#004e76] pl-4'>
                      <p>{item.date.slice(0,10)}</p>
                      <p>{item.name}</p>
                    </div>
                    {isResolve==='report'?
                    <button className='p-2 px-4 bg-transparent border-2 border-[#004e76] rounded-md hover:bg-red-600 hover:border-red-600 hover:text-white' onClick={()=>changeReportStatus(item._id, 'submit', '已取消回報')}>取消回報</button>:
                    <div className='flex flex-row gap-4'>
                      <button className='p-2 px-4 bg-red-200 rounded-md' onClick={()=>showReportForm(index)}>回復</button>
                      <button className='p-2 px-4 bg-green-200 rounded-md' onClick={()=>changeReportStatus(item._id, 'confirm', '資料已確認')}>已確認</button>
                    </div>
                    }
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