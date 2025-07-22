import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Order from './pages/Order'
import Add from './pages/Add'
import List from './pages/List'
import Login from './components/Login'

const App = () => {

  const [token, setToken] = useState('');

  return (
    <div className='bg-gray-50 '>
      {token === "" ? <Login /> : <>
        <Navbar />
        <hr />
        <div className='flex w-full'>
          <Sidebar />
          <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
            <Routes>
              <Route path='/add' element={<Add />} />
              <Route path='/list' element={<List />} />
              <Route path='/orders' element={<Order />} />
            </Routes>
          </div>
        </div>
      </>}
    </div>
  )
}

export default App