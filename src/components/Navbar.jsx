import React, { useContext } from 'react'
import { FaRegUser } from "react-icons/fa6";
import { AdminContext } from '../../context/AdminContext';

const Navbar = () => {

  const {userEmail, token} = useContext(AdminContext)
  return (
    <div className='w-full text-black bg-white flex flex-row justify-between pl-4 py-6'>
      <p className='font-extrabold text-lg text-[#004e76]'><span className='bg-[#004e76] text-white rounded-lg p-2 px-3'>Payroll</span><span className='font-extrabold text-sm'> Management</span><span className='border-[01px] p-0.5 px-2 ml-4 text-xs border-[#004e76] rounded-full'>{token}</span></p>
      <div className='flex flex-row gap-4 items-center mr-4'>
        <FaRegUser />
        <p>{userEmail}</p>
      </div>
    </div>
  )
}

export default Navbar