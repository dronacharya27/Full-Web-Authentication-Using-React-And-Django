import { useDataContext } from '../../Context/Context';
import './OtpLogin.css'
import { Circles } from "react-loader-spinner";
import { toast } from 'react-toastify';

import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const OtpLogin = () => {
    const navigate =useNavigate()
    const {dispatch,OtpLogin,state,error_msg,Seterror_msg} = useDataContext()

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
       
      ): (
    <div className='otplogin'>
      <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handledata}
            required
          />
          
    <button onClick={()=>OtpLogin(navigate)}>
            <i className="ri-arrow-right-circle-line nexticon"></i>
          </button>
    </div>
      )
}
</>
)
}
export default OtpLogin
