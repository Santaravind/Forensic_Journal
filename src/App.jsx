import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home';
import Blog from './components/pages/Blog';
import AboutUs from './components/pages/AboutUs';
import EditorialTeam from './components/pages/EditorialTeam';


import Publication from './components/pages/Publication';
import Research from './components/pages/Research';
import Login from './components/auth/Login';

import {Toaster} from 'react-hot-toast' 
import Header from './components/pages/Header';
import Footer from './components/pages/Footer';
import ResearchPaperForm from './components/pages/ResearchPaperForm';
import PaperStatus from './components/pages/research/PaperStatus';
import CaseStudy from './components/pages/research/CaseStudy';
import Articals from './components/pages/research/Articals';
import Peer from './components/pages/guidline/Peer';
import Author from './components/pages/guidline/Author';
import Ethics from './components/pages/guidline/Ethics';
import Informed from './components/pages/guidline/Informed';
import Open from './components/pages/guidline/Open';
import Plagiarism from './components/pages/guidline/Plagiarism';
import Privacy from './components/pages/guidline/Privacy';
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
      {/* <Route path='/guideline' element={<Guidelines/>}/> */}
     
      <Route path='/publication' element={<Publication/>}/>

      {/* <Route path='/research' element={<Research/>}/> */}
      <Route path='/paper-status' element={<PaperStatus/>}/>
      <Route path='/case-study' element={<CaseStudy/>}/>
      <Route path='/article' element={<Articals/>}/>

      {/* This route for guideline */}
      <Route path='/peer' element={<Peer/>}/>
      <Route path='/author' element={<Author/>}/>
      <Route path='/ethics' element={<Ethics/>}/>
      <Route path='/informed' element={<Informed/>}/>
      <Route path='/open' element={<Open/>}/>
      <Route path='/plag' element={<Plagiarism/>}/>
      <Route path='/privacy' element={<Privacy/>}/>



      <Route path='/login' element={<Login/>}/>
      {/* <Route path='/register' element={<Register/>}/> */}
      <Route path='/reserchform' element={<ResearchPaperForm/>}/>
      </Routes>
      <Footer/>

    </>
  )
}

export default App
