import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Circles } from "react-loader-spinner";
import { useDataContext } from '../../Context/Context'
import './Signup.css'
import { toast } from 'react-toastify';

const Signup = () => {
    const{dispatch,handleSignup,state,error_msg,Seterror_msg} = useDataContext()
const handledata = (e) =>{
     const {value,name} = e.target;
    dispatch({
        type:'handledata',
        payload:{value,name}
    })
  
}
 
useEffect(()=>{
  if (error_msg.length!=0) {
    toast.error(`${error_msg}`, {
      position: toast.POSITION.TOP_RIGHT
    })
    Seterror_msg([])
  }
    
  
},[error_msg])

  return (
    <>
   
    <div className='login'>
    <div className='icon'><img src="profile.webp"/>  </div>
   <input type="text" placeholder='Name' name='name' onChange={handledata}/>
  <input type="text" placeholder='Email' name='email' style={{marginBottom:'10px'}} onChange={handledata}/>
  <input type="password" placeholder='Password' name='password' style={{marginTop:'10px'}} onChange={handledata}/>
  
  <input type="password" placeholder='Confirm Password' name='re_password' onChange={handledata}/>
  <Link to='/'><p style={{width:'100%',textAlign:'left', marginLeft:'5px'}}>Login Instead</p></Link>
  {state.isloading ? (
      <div className="loader">
        <Circles
        height="80"
        width="80"
        color="#DA70D6"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      </div>
      
     
    ) :<></>}
  <button onClick={handleSignup}><i className="ri-arrow-right-circle-line nexticon"></i></button>
</div>

</>
  )
}

export default Signup
