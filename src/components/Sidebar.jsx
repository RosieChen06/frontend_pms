import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoMdCheckboxOutline } from "react-icons/io";
import { TbMessageReport } from "react-icons/tb";

const Sidebar = () => {
  return (
    <div className='w-1/3 md:w-1/6 bg-[#f8f9fd]'>
        <ul>
            <NavLink to={'/'} className={({isActive})=>`flex pl-4 gap-4 items-center h-16 w-full cursor-pointer ${isActive? 'bg-[#f2f3ff] border-r-4 border-[#5f6fff]':''}`}>
                <IoMdCheckboxOutline className='text-lg'/>
                <p>Uncheck</p>
            </NavLink>
            <NavLink to={'/admin-update'} className={({isActive})=>`flex pl-4 gap-4 items-center h-16 w-full cursor-pointer ${isActive? 'bg-[#f2f3ff] border-r-4 border-[#5f6fff]':''}`}>
                <TbMessageReport className='text-lg'/>
                <p>Report & Update</p>
            </NavLink>
        </ul>
    </div>
  )
}

export default Sidebar
