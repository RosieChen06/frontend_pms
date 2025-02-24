import React, { useContext } from 'react'
import { FaRegUser } from "react-icons/fa6";
import { AdminContext } from '../../context/AdminContext';
import { BiMenuAltLeft } from "react-icons/bi";
import { RiCloseLargeLine } from "react-icons/ri";

const Navbar = () => {

  const {userEmail, token, isShowMenu, setIsShowMenu} = useContext(AdminContext)
  return (
    <div className='w-full h-full bg-[#004e76] text-white sm:text-black sm:bg-white flex flex-row justify-between items-center pl-2 sm:pl-4 py-6'>
      {isShowMenu?<RiCloseLargeLine className='block sm:hidden text-2xl cursor-pointer pl-2' onClick={()=>setIsShowMenu(false)}/>:
        <BiMenuAltLeft className='sm:hidden text-2xl cursor-pointer' onClick={()=>setIsShowMenu(true)}/>}
      <p className='hidden sm:block font-extrabold text-lg text-[#004e76]'><span className='bg-[#004e76] text-white rounded-lg p-2 px-3'>Payroll</span><span className='font-extrabold text-sm'> Management</span><span className='border-[01px] p-0.5 px-2 ml-4 text-xs border-[#004e76] rounded-full'>{token}</span></p>
      <div className='hidden sm:flex flex-row gap-4 items-center mr-4'>
        <FaRegUser />
        <p>{userEmail}</p>
      </div>
    </div>
  )
}

export default Navbar
