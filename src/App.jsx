import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import { ToastContainer, toast } from 'react-toastify';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Update from './pages/Update'
import {Route, Routes} from 'react-router-dom'

function App() {

  return (
    <>
      <div className=' bg-pink-100 w-full h-lvh'>
        <ToastContainer />
        <div className='max-h-[13%]'>
          <Navbar />
        </div>
        <div className='flex items-start mt-12 h-[87%]'>
           <Sidebar />
           <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/admin-update' element={<Update />} />
           </Routes>
        </div>
      </div>
    </>
  )
}

export default App
