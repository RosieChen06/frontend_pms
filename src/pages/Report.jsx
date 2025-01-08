import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'

const Report = () => {
      const {getDB, rider, state, token} = useContext(AdminContext)
      const [isResolve, setIsResolve] = useState(true)
      const filterdData = rider.filter((item)=>(
        item.status === 'report'
      ))

  return (
    <div className='w-2/3 md:w-5/6 h-[88vh]'>
      <div className='flex flex-row justify-end px-4 mt-4 w-full'>
        <p className={!isResolve?'rounded-l-lg py-1 px-3 border-2 w-1/2 border-[#004e76] text-white bg-[#004e76] cursor-pointer':'rounded-l-lg w-1/2 py-1 px-3 bg-white border-y-2 border-l-2 border-[#004e76] text-[#004e76] cursor-pointer'} onClick={()=>setIsResolve(false)}>待處理</p>
        <p className={!isResolve?'rounded-r-lg py-1 px-3 w-1/2 bg-white border-y-2 border-r-2 border-[#004e76] text-[#004e76] cursor-pointer':'rounded-r-lg py-1 px-3 w-1/2 border-2 border-[#004e76] text-white bg-[#004e76] cursor-pointer'} onClick={()=>setIsResolve(true)}>已回復</p>
      </div>
      {
        filterdData.map((item, index)=>(
          <div key={index}>
            <p>{item.name}</p>
            <p>{new Date(item.reportdatetime).getFullYear()}</p>
          </div>
        ))
      }
    </div>
  )
}

export default Report