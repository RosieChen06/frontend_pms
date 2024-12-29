import { useContext, useState } from 'react'
import './App.css'
import Home from './pages/Home'
import { ToastContainer, toast } from 'react-toastify';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Update from './pages/Update'
import {Route, Routes} from 'react-router-dom'
import Login from './pages/Login';
import Report from './pages/Report';
import { AdminContext } from '../context/AdminContext';

function App() {

  const {token} = useContext(AdminContext)
  console.log(token)
  return (
    <>
      <div>
        <ToastContainer />
        {token==='admin'?
        <div className='w-full h-lvh bg-gray-400'>
            <div className='max-h-[6%]'>
              <Navbar />
            </div>
            <div className='flex items-start mt-10 h-[86%]'>
              <Sidebar />
              <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/admin-update' element={<Update />} />
              </Routes>
          </div>
        </div>:token==='user'?
        <div className='w-full h-lvh bg-gray-400'>
          <div className='max-h-[6%]'>
            <Navbar />
          </div>
          <div className='flex items-start mt-10 h-[86%]'>
            <Sidebar />
            <Routes>
                  <Route path='/delivery-record' element={<Report />} />
            </Routes>
            <Routes>
                  <Route path='/report' element={<Report />} />
            </Routes>
            <Routes>
                  <Route path='/confirmed' element={<Report />} />
            </Routes>
          </div>
        </div>
        :<Login />
        }
      </div>
    </>
  )
}

export default App
