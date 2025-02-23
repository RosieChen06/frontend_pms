import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { IoMdCheckboxOutline } from "react-icons/io";
import { TbMessageReport } from "react-icons/tb";
import { CiLogout } from "react-icons/ci";
import { AdminContext } from '../../context/AdminContext';
import { TbReportSearch } from "react-icons/tb";
import { MdOutlineFactCheck } from "react-icons/md";
import { VscReport } from "react-icons/vsc";
import { LuClipboardPenLine } from "react-icons/lu";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";

const Sidebar = () => {

  const {setToken, token, isShowMenu, setIsShowMenu, rider} = useContext(AdminContext)
  const onlineData = useSelector((state) => state.onlineData.onlineData); 
  return (
    <div className={isShowMenu?'w-full sm:block sm:w-1/3 md:w-1/6 bg-[#004e76] h-[88vh] absolute sm:relative':'hidden sm:block sm:w-1/3 md:w-1/6 bg-[#004e76] h-[88vh] absolute sm:relative'}>
    {token==='admin'?       
        <ul>
            <NavLink to={'/'} className={({isActive})=>`flex pl-4 gap-4 items-center h-16 w-full cursor-pointer ${isActive? 'bg-white text-[#004e76]':'text-white'}`} onClick={()=>setIsShowMenu(false)}>
                <IoMdCheckboxOutline className='text-lg'/>
                <p>Uncheck</p>
            </NavLink>
            <NavLink to={'/admin-update'} className={({isActive})=>`flex pl-4 gap-4 items-center h-16 w-full cursor-pointer ${isActive? 'bg-white text-[#004e76]':'text-white'}`} onClick={()=>setIsShowMenu(false)}>
                <TbMessageReport className='text-lg'/>
                <p>Report & Update</p>
                <p className={({isActive})=>`'px-2 py-1 rounded-md text-sm' ${isActive? 'bg-[#004e76] text-white':'bg-white text-[#004e76]'}`}>{rider.filter((item)=>(item.status === 'report')).length+onlineData.filter((item)=>(item.status === 'report')).length}</p>
            </NavLink>
            <NavLink to={'/missing-parcel'} className={({isActive})=>`flex pl-4 gap-4 items-center h-16 w-full cursor-pointer ${isActive? 'bg-white text-[#004e76]':'text-white'}`} onClick={()=>setIsShowMenu(false)}>
                <LuClipboardPenLine className='text-lg'/>
                <p>Lost Registration</p>
            </NavLink>
            <NavLink to={'/maintenance'} className={({isActive})=>`flex pl-4 gap-4 items-center h-16 w-full cursor-pointer ${isActive? 'bg-white text-[#004e76]':'text-white'}`} onClick={()=>setIsShowMenu(false)}>
                <MdOutlineDeleteOutline className='text-xl'/>
                <p>DB Maintenance</p>
            </NavLink>
            <div onClick={()=>{setToken(''); sessionStorage.removeItem('token');}} className='absolute cursor-pointer flex flex-row pl-4 gap-4 h-16 items-center text-white bottom-0 w-full hover:bg-white hover:text-red-600 hover:font-bold'>
              <CiLogout className='text-lg'/>
              <button>Logout</button>
            </div>
        </ul>:
        <ul>
          <NavLink to={'/'} className={({isActive})=>`flex pl-4 gap-4 items-center h-16 w-full cursor-pointer ${isActive? 'bg-white text-[#004e76]':'text-white'}`} onClick={()=>setIsShowMenu(false)}>
              <TbReportSearch className='text-lg' />
              <p>成績查詢</p>
          </NavLink>
          <NavLink to={'/confirmed'} className={({isActive})=>`flex pl-4 gap-4 items-center h-16 w-full cursor-pointer ${isActive? 'bg-white text-[#004e76]':'text-white'}`} onClick={()=>setIsShowMenu(false)}>
                <MdOutlineFactCheck className='text-lg'/>
                <p>已確認</p>
          </NavLink>
          <NavLink to={'/report'} className={({isActive})=>`flex pl-4 gap-4 items-center h-16 w-full cursor-pointer ${isActive? 'bg-white text-[#004e76]':'text-white'}`} onClick={()=>setIsShowMenu(false)}>
              <VscReport className='text-lg'/>
              <p>已回報</p>
          </NavLink>
          <div onClick={()=>{setToken(''); sessionStorage.removeItem('token'); setIsShowMenu(false)}} className='absolute flex flex-row pl-4 gap-4 h-16 items-center text-white bottom-0 w-full cursor-pointer hover:bg-white hover:text-red-600 hover:font-bold' >
            <CiLogout className='text-lg'/>
            <button>登出</button>
          </div>
        </ul>
        }
    </div>
  )
}

export default Sidebar
