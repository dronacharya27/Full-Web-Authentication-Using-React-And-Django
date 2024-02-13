import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import { useDataContext } from "../../Context/Context";
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import { useGoogleOneTapLogin } from 'react-google-one-tap-login';
import {decodeJwt} from 'jose'
import axios from "axios";

const Login = () => {
  const { dispatch, handleLogin, state,googleLogin,error_msg,Seterror_msg } = useDataContext();
  const navigate = useNavigate();
 
  useEffect(()=>{
  if (error_msg.length!=0) {
    toast.error(`${error_msg}`, {
      position: toast.POSITION.TOP_RIGHT
    })
    Seterror_msg([])
  }
    
 
},[error_msg])





  const handledata = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "handledata",
      payload: { name, value },
    });
  };

 
  return (
    <>
      
        <div className="login">
          <div className="icon">
            <img src="logo.jpeg" />{" "}
          </div>
      
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handledata}
            required
          />
          
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handledata}
            required
          />
          <div className="links">
            {" "}
            <Link to="/forgotpassword">
              {" "}
              <p>forgot password</p>
            </Link>{" "}
            <Link to="/s">
              {" "}
              <p>SignUp Instead</p>
            </Link>
            <Link to="/otplogin">
              {" "}
              <p>Login With OTP</p>
            </Link>
          </div>
         
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
       
                    
          <button onClick={() => handleLogin(navigate)}>
            <i className="ri-arrow-right-circle-line nexticon"></i>
          </button>
         

          <GoogleLogin
  onSuccess={codeResponse => googleLogin(codeResponse.credential,navigate)
  }
  
  onError={() => {
    console.log('Login Failed');
  }}
  useOneTap
/>
            </div>
      
    </>
  );
};

export default Login;
