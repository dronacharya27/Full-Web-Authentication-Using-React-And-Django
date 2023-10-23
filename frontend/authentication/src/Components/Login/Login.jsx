import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import { useDataContext } from "../../Context/Context";
const Login = () => {
  const { dispatch, handleLogin, state,googleLogin } = useDataContext();
  const navigate = useNavigate();
 
    
  const handledata = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "handledata",
      payload: { name, value },
    });
  };

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
       
      ) : (
        <div className="login">
          <div className="icon">
            <img src="profile.webp" />{" "}
          </div>
         {state.email == ''?<label  >*Required</label>: <label></label> } 
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handledata}
            required
          />
           {state.password == ''?<label  >*Required</label>: <label></label> } 
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
          </div>
          <button onClick={() => handleLogin(navigate)}>
            <i className="ri-arrow-right-circle-line nexticon"></i>
          </button>
          <button style={{width:'200px',border:'none'} } onClick={()=>googleLogin(navigate)}>
         <img src="google.png" alt="" style={{width:'100%',border:'none',borderRadius:'0%'}}/>
          </button>
            </div>
      )}
    </>
  );
};

export default Login;
