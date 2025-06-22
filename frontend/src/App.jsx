import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './component/NavBar'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Hero from './component/Hero'
import About from './component/About'

function App() {
  

  return (
    <>
    <Navbar />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Hero />} />
        <Route path='/about' element={<About />} />
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
