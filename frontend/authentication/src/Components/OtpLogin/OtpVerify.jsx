import React from 'react'
import { useDataContext } from '../../Context/Context';
import './OtpLogin.css'
import { Circles } from "react-loader-spinner";
import { toast } from 'react-toastify';

import  { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const OtpVerify = () => {
    const params = useParams()
    const {dispatch,otpVerify,state,error_msg,Seterror_msg,otpResend} = useDataContext()
    const navigate = useNavigate()
    const handledata = (e) => {
        const { name, value } = e.target;
        dispatch({
          type: "handledata",
          payload: { name, value },
        });
      };
    
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
     
    ):(
    <div className='otplogin'>
      <input
            type="number"
            placeholder="4 Digit Code"
            name="otp"
            onChange={handledata}
            re
            quired
          />
          <div className='resend'onClick={()=>otpResend(params,navigate)}>Resend Otp</div>
           <button onClick={()=>otpVerify(params,navigate)}>
            <i className="ri-arrow-right-circle-line nexticon"></i>
          </button>
    </div>)}
    </>
  )
}

export default OtpVerify
