import React from 'react';
import { Routes, Route } from "react-router-dom";

import './App.css';

import Header from './Pages/Header/header';
import Footer from './Pages/Footer/footer';
import Home from './Pages/View-User/viewUser';
import AddUser from './Pages/Add-User/addUser';
import ViewOneUser from './Pages/View-one-user/ViewOneUser';
import Edit_user from './Pages/Edit_user/Edit_user';


export const BASE_URL = 'http://127.0.0.1:8000'


const App = () => {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='add-user' element={<AddUser />} />
        <Route path='edit_user/:id' element={<Edit_user /> } />
        <Route path='ViewOneUser/:id' element={<ViewOneUser />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App