import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'

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

  return (
    <div className='w-2/3 md:w-5/6 h-[88vh]'>
      <div className='flex flex-row justify-end px-4 mt-4 w-full'>
        <p className={!isResolve?'rounded-l-lg py-1 px-3 border-2 w-1/2 border-[#004e76] text-white bg-[#004e76] cursor-pointer':'rounded-l-lg w-1/2 py-1 px-3 bg-white border-y-2 border-l-2 border-[#004e76] text-[#004e76] cursor-pointer'} onClick={()=>setIsResolve(false)}>待處理</p>
        <p className={!isResolve?'rounded-r-lg py-1 px-3 w-1/2 bg-white border-y-2 border-r-2 border-[#004e76] text-[#004e76] cursor-pointer':'rounded-r-lg py-1 px-3 w-1/2 border-2 border-[#004e76] text-white bg-[#004e76] cursor-pointer'} onClick={()=>setIsResolve(true)}>已回復</p>
      </div>
      <div className='w-full h-[76vh] px-4 mt-4 overflow-scroll'>
        {
          filterdData.map((item, index)=>(
            <div key={index} className='w-full bg-white p-2 mt-4 rounded-lg flex flex-col md:flex-row justify-between'>
              <div className='flex flex-col md:flex-row w-full md:w-11/12 bg-purple-100'>
                <div className='flex flex-col justify-between w-48'> 
                  <p>{item.name}</p>
                  <p className='text-sm text-gray-500'>回報時間: {new Date(item.reportdatetime).getFullYear()}/{new Date(item.reportdatetime).getMonth()+1}/{new Date(item.reportdatetime).getDay()}</p>
                </div>
                <div className='flex flex-col bg-pink-100 w-[50%] items-start'>
                  {obj[Number(index)]['1'].length!==0?
                  <div className='flex flex-row text-sm items-center mb-2'>
                    <p className='font-bold border-l-4 pl-4 border-gray-200 mr-6'>{item.sp2_1}</p>
                    {obj[Number(index)]['1'][0]?                   
                    <div className='flex flex-row gap-2 items-center mr-6'>
                      <p className='text-red-600 font-bold'>x</p>
                      <p>{obj[Number(index)]['1'][0]}</p>
                    </div>:''
                    }
                    {obj[Number(index)]['1'][1]?                   
                    <div className='flex flex-row gap-2 items-center mr-6'>
                      <p className='text-red-600 font-bold'>x</p>
                      <p>{obj[Number(index)]['1'][1]}</p>
                    </div>:''
                    }
                    {obj[Number(index)]['1'][2]?                   
                    <div className='flex flex-row gap-2 items-center mr-6'>
                      <p className='text-red-600 font-bold'>x</p>
                      <p>{obj[Number(index)]['1'][2]}</p>
                    </div>:''
                    }
                    {obj[Number(index)]['1'][3]?                   
                    <div className='flex flex-row gap-2 items-center mr-6'>
                      <p className='text-red-600 font-bold'>x</p>
                      <p>{obj[Number(index)]['1'][3]}</p>
                    </div>:''
                    }
                    {obj[Number(index)]['1'][4]?                   
                    <div className='flex flex-row gap-2 items-center mr-6'>
                      <p className='text-red-600 font-bold'>x</p>
                      <p>{obj[Number(index)]['1'][4]}</p>
                    </div>:''
                    }
                  </div>:''
                  }
                  {obj[Number(index)]['2'].length!==0?
                  <div className='flex flex-row text-sm items-center mb-2'>
                    <p className='font-bold border-l-4 pl-4 border-gray-200 mr-6'>{item.sp2_2}</p>
                    {obj[Number(index)]['2'][0]?                   
                    <div className='flex flex-row gap-2 items-center mr-6'>
                      <p className='text-red-600 font-bold'>x</p>
                      <p>{obj[Number(index)]['2'][0]}</p>
                    </div>:''
                    }
                    {obj[Number(index)]['2'][1]?                   
                    <div className='flex flex-row gap-2 items-center mr-6'>
                      <p className='text-red-600 font-bold'>x</p>
                      <p>{obj[Number(index)]['2'][1]}</p>
                    </div>:''
                    }
                    {obj[Number(index)]['2'][2]?                   
                    <div className='flex flex-row gap-2 items-center mr-6'>
                      <p className='text-red-600 font-bold'>x</p>
                      <p>{obj[Number(index)]['2'][2]}</p>
                    </div>:''
                    }
                    {obj[Number(index)]['2'][3]?                   
                    <div className='flex flex-row gap-2 items-center mr-6'>
                      <p className='text-red-600 font-bold'>x</p>
                      <p>{obj[Number(index)]['2'][3]}</p>
                    </div>:''
                    }
                    {obj[Number(index)]['2'][4]?                   
                    <div className='flex flex-row gap-2 items-center mr-6'>
                      <p className='text-red-600 font-bold'>x</p>
                      <p>{obj[Number(index)]['2'][4]}</p>
                    </div>:''
                    }
                  </div>:''
                  }
                  {obj[Number(index)]['3'].length!==0?
                  <div className='flex flex-row text-sm items-center'>
                    <p className='font-bold border-l-4 pl-4 border-gray-200 mr-6'>{item.sp2_3}</p>
                    {obj[Number(index)]['3'][0]?                   
                    <div className='flex flex-row gap-2 items-center mr-6'>
                      <p className='text-red-600 font-bold'>x</p>
                      <p>{obj[Number(index)]['3'][0]}</p>
                    </div>:''
                    }
                    {obj[Number(index)]['3'][1]?                   
                    <div className='flex flex-row gap-2 items-center mr-6'>
                      <p className='text-red-600 font-bold'>x</p>
                      <p>{obj[Number(index)]['1'][1]}</p>
                    </div>:''
                    }
                    {obj[Number(index)]['3'][2]?                   
                    <div className='flex flex-row gap-2 items-center mr-6'>
                      <p className='text-red-600 font-bold'>x</p>
                      <p>{obj[Number(index)]['1'][2]}</p>
                    </div>:''
                    }
                    {obj[Number(index)]['3'][3]?                   
                    <div className='flex flex-row gap-2 items-center mr-6'>
                      <p className='text-red-600 font-bold'>x</p>
                      <p>{obj[Number(index)]['1'][3]}</p>
                    </div>:''
                    }
                    {obj[Number(index)]['3'][4]?                   
                    <div className='flex flex-row gap-2 items-center mr-6'>
                      <p className='text-red-600 font-bold'>x</p>
                      <p>{obj[Number(index)]['1'][4]}</p>
                    </div>:''
                    }
                  </div>:''
                  }
                </div>
              </div>
              <div className='flex flex-row md:flex-col gap-2'>
                <button className='px-6 py-1 bg-green-200 w-24 rounded-lg'>Edit</button>
                <button className='px-6 py-1 bg-yellow-200 w-24 rounded-lg'>Cancel</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Report