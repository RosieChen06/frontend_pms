import React, { useContext, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'

const Confirmed = () => {

    const {getDB, rider, state, token} = useContext(AdminContext)
    const [isResolve, setIsResolve] = useState(true)
    const filterdData = rider.filter((item)=>(
      item.status === 'report'
    ))
  return (
    <div className='w-2/3 md:w-5/6 h-[88vh]'>

    </div>
  )
}

export default Confirmed