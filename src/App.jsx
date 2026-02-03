import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home';
import Blog from './components/pages/Blog';
import AboutUs from './components/pages/AboutUs';
import EditorialTeam from './components/pages/EditorialTeam';
import Guidelines from './components/pages/Guidelines';

import Publication from './components/pages/Publication';
import Research from './components/pages/Research';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import {Toaster} from 'react-hot-toast' 
import Header from './components/pages/Header';
function App() {
  return (
    <>
    <Toaster/>
       <Header/>
      
        <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/blog' element={<Blog/>}/>
      <Route path='/about' element={<AboutUs/>}/>
      <Route path='/editorial' element={<EditorialTeam/>}/>
      <Route path='/guideline' element={<Guidelines/>}/>
     
      <Route path='/publication' element={<Publication/>}/>
      <Route path='/research' element={<Research/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      


      </Routes>

    </>
  )
}

export default App
