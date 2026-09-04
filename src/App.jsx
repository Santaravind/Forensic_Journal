import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './components/pages/Home';
import Blog from './components/pages/blog/Blog';
import AboutUs from './components/pages/AboutUs';
import EditorialTeam from './components/pages/EditorialTeam';
import Publication from './components/pages/Publication';

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
import Register from './components/auth/Register';
import VerifyOtp from './components/auth/VerifyOtp';
import CaseStudyPaperForm from './components/pages/CaseStudyPaperForm';
import AuthorInsturctions from './components/pages/guidline/AuthorInsturctions';
import Review from './components/pages/Review';
import EditorDashboard from './components/pages/EditorDashboard';
import AdminDashboard from './components/pages/AdminDashboard';
import ScrollToTop from './components/pages/ScrollToTop';
import Publisher from './components/publisharPage/Publisher';
import ProtectetRoute from './components/route/ProtectetRoute';
import {useDispatch} from 'react-redux'
import PrivateRoute from './components/route/ProtectetRoute';
import ArtificialIntelligence from './components/pages/guidline/ArtificialIntelligence';
import RightsPermissions from './components/pages/guidline/RightsPermissions';
import AppealsComplaints from './components/pages/guidline/AppealsComplaints';
import PreprintSharing from './components/pages/guidline/PreprintSharing';
import CorrectionsRetractionsMattersArising from './components/pages/guidline/CorrectionsRetractionsMattersArising ';
import Blogpublish from './components/pages/blog/Blogpublish';
import Career from './components/pages/career/Career';
function App() {
  

  return (
    <>
    <Toaster/>
       <Header/>
      <ScrollToTop/>
        <Routes>
      <Route path='/' element={<Home/>}/>
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
      <Route path='/ai'  element={<ArtificialIntelligence/>}/>
      <Route path='/right'  element={<RightsPermissions/>}/>
      <Route path='/appeals'  element={<AppealsComplaints/>}/>
      <Route path='/correct'  element={<CorrectionsRetractionsMattersArising/>}/>
      <Route path='/preprint'  element={<PreprintSharing/>}/>
   
   {/* instructions  */}
   <Route path='/authorIn' element={<AuthorInsturctions/>}/>

        {/* Role Protected Dashboard Routes */}
        <Route
          path="/review"
          element={
            <PrivateRoute allowedRoles={["REVIEWER"]}>
              <Review />
            </PrivateRoute>
          }
        />
        <Route
          path="/editer"
          element={
            <PrivateRoute allowedRoles={["EDITOR"]}>
              <EditorDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/publisher"
          element={
            <PrivateRoute allowedRoles={["PUBLISHER"]}>
              <Publisher />
            </PrivateRoute>
          }
        />

        {/* Blog */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:idOrSlug" element={<Blog />} />
        <Route
          path="/postb"
          element={
            <PrivateRoute allowedRoles={["PUBLISHER", "ADMIN", "EDITOR", "USER", "AUTHOR", "READER"]}>
              <Blogpublish />
            </PrivateRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route
          path="/reserchform"
          element={
            <PrivateRoute allowedRoles={["USER", "AUTHOR", "READER"]}>
              <ResearchPaperForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/caseStudyForm"
          element={
            <PrivateRoute allowedRoles={["USER", "AUTHOR", "READER"]}>
              <CaseStudyPaperForm />
            </PrivateRoute>
          }
        />


             {/* career  */}
             <Route path='/career' element={<Career/>}/>
      </Routes>
      <Footer/>

    </>
  )
}

export default App
