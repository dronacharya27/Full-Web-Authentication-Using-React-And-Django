import React from 'react'
import './Container.css'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Activation from '../Activation/Activation'
import Profile from '../Profile/Profile'
import DeleteAccount from '../DeleteAccount/DeleteAccount'
import ForgotPassword from '../Login/ForgotPassword'
import PasswordReset from '../PasswordReset/PasswordReset'
import ChangePassword from '../ChangePassword/ChangePassword'
import Loader from '../Loader/Loader'
import OtpLogin from '../OtpLogin/OtpLogin'
import OtpVerify from '../OtpLogin/OtpVerify'

const Container = () => {
  return (
    
    <div className='Container'>
     
      <Routes>
        <Route path='/otplogin' element={<OtpLogin/>}/>
        <Route path='/otpverify/:uid' element={<OtpVerify/>}/>
      <Route path='/' element={<Login/>}/>
      <Route path='/s' element={ <Signup/>}/>
      
      <Route path='/profile' element={ <Profile/>}/> 

      <Route path='/deleteaccount' element={ <DeleteAccount/>}/>
     
      <Route path='password-reset/:uid/:token' element={<PasswordReset/>}/>
    
      <Route path='/loader' element = {<Loader/>}/>
    
      <Route path='/changepassword' element={ <ChangePassword/>}/>
      <Route path='/forgotpassword' element={ <ForgotPassword/>}/>
      <Route path='/activate/:uid/:token' element={<Activation/>}/>
      
      </Routes>
      
      
     
    </div>
    
  )
}

export default Container
