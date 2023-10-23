import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Circles } from "react-loader-spinner";
import { useDataContext } from '../../Context/Context'
const Signup = () => {
    const{dispatch,handleSignup,state} = useDataContext()
const handledata = (e) =>{
     const {value,name} = e.target;
    dispatch({
        type:'handledata',
        payload:{value,name}
    })
  
}

  return (
    <>
    {state.isloading ? (
      
      <Circles
        height="80"
        width="80"
        color="#DA70D6"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
     
    ) :
    <div className='login'>
    <div className='icon'><img src="profile.webp"/>  </div>
    {state.name == ''?<label  >*Required</label>: <label></label> } 
   <input type="text" placeholder='Name' name='name' onChange={handledata}/>
   {state.email == ''?<label  >*Required</label>: <label></label> } 
  <input type="text" placeholder='Email' name='email' style={{marginBottom:'10px'}} onChange={handledata}/>
  {state.password == ''?<label  >*Required</label>: <label></label> } 
  <input type="password" placeholder='Password' name='password' style={{marginTop:'10px'}} onChange={handledata}/>
  {state.re_password == ''?<label  >*Required</label>: <label></label> } 
  <input type="password" placeholder='Confirm Password' name='re_password' onChange={handledata}/>
  <Link to='/'><p style={{width:'100%',textAlign:'left', marginLeft:'5px'}}>Login Instead</p></Link>

  <button onClick={handleSignup}><i className="ri-arrow-right-circle-line nexticon"></i></button>
</div>
}
</>
  )
}

export default Signup
