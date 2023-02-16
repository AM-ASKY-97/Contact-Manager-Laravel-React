import React from 'react'
import { Routes, Route } from "react-router-dom"

import './App.css'

import Header from './Pages/Header/header'
import Footer from './Pages/Footer/footer'
import Home from './Pages/View-User/viewUser'
import AddUser from './Pages/Add-User/addUser'


const App = () => {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='add-user' element={<AddUser />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App