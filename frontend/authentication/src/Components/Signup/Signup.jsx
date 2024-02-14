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
const SeePassword=()=>{
if (document.getElementById('password').type === "password"){
  document.getElementById('password').type = "text"
}
else(
  document.getElementById('password').type = "password"
)
if (document.getElementById('re_password').type === "password"){
  document.getElementById('re_password').type = "text"
}
else(
  document.getElementById('re_password').type = "password"
)

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
    <div className='icon'><img src="logo.jpeg"/>  </div>
   <input type="text" placeholder='Name' name='name' onChange={handledata}/>
  <input type="text" placeholder='Email' name='email' style={{marginBottom:'10px'}} onChange={handledata}/>
  <input type="password" placeholder='Password' id='password' name='password' style={{marginTop:'10px'}} onChange={handledata}/>
  
  <input type="password" placeholder='Confirm Password' id='re_password' name='re_password' onChange={handledata}/>
  <p onClick={()=>SeePassword()} style={{cursor:'pointer'}}>Show Passwords</p>
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
