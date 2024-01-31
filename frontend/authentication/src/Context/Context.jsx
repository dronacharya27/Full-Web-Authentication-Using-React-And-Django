import { createContext, useContext, useReducer, useState } from "react";
import reducer from "../Reducer/reducer";
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import {decodeJwt} from 'jose'

const DataContext = createContext()
const initialstate = {
    email:'',
    name:'',
    password:'',
    re_password:'',
    current_password:'',
    new_password:'',
    re_new_password:'',
    is_loading:false,
    otp:'',
    
}



const URL = 'httpss://dron2720.pythonanywhere.com/api/auth/'
const DataContextProvider=({children}) =>{
    const[error_msg,Seterror_msg]=useState([])
    const[state,dispatch]=useReducer(reducer,initialstate)


// OTP Login
const OtpLogin = async(navigate)=>{
    const url = 'httpss://dron2720.pythonanywhere.com/api/users/otp_login/'
    const {email} = state
    const data = {email}
    dispatch({
        type:'loader',
        payload:true
    })
    try {
        const {data:res} = await axios.post(url,data)
        dispatch({
            type:'loader',
            payload:false
        })
        console.log(res)
        navigate(`/otpverify/${res.data}`)
    } catch (error) {
        console.log(error)
        dispatch({
            type:'loader',
            payload:false
                        })
            const error_message = error.response.data
            let keys = []
            for (let key in error_message){
                if (error_message.hasOwnProperty(key)){
                    keys.push(key)
                }
                keys.map(e=>
                    Seterror_msg(error_message[e]))
                
            
                        }
                        
    }
    
}
// Otp Verify

const otpVerify = async(params,navigate)=>{
    dispatch({
        type:'loader',
        payload:true
    })
    const {otp} = state
    const data = {otp}
    const {uid} = params
    const url = `https://dron2720.pythonanywhere.com/api/user/${uid}/verify_otp/`
    try {
        const {data:res} = await axios.patch(url,data)
        dispatch({
            type:'loader',
            payload:false
        })
        console.log(res)
        localStorage.setItem('token',JSON.stringify(res.access))
        localStorage.setItem('refresh',JSON.stringify(res.refresh))
        navigate('/profile')
    } catch (error) {
        console.log(error)
        
        dispatch({
            type:'loader',
            payload:false
                        })
            const error_message = error.response.data
            let keys = []
            for (let key in error_message){
                if (error_message.hasOwnProperty(key)){
                    keys.push(key)
                }
                keys.map(e=>
                    Seterror_msg(error_message[e]))
                
            
                        }
    }
    
}
// Otp Resend
const otpResend = async(params,navigate)=>{
    dispatch({
        type:'loader',
        payload:true
    })
    const {otp} = state
    const data = {otp}
    const {uid} = params
    const url = `https://dron2720.pythonanywhere.com/api/user/${uid}/regenerate_otp/`
    try {
        const {data:res} = await axios.patch(url,data)
        dispatch({
            type:'loader',
            payload:false
        })
        console.log(res)
       
    } catch (error) {
        console.log(error)
        
        dispatch({
            type:'loader',
            payload:false
                        })
            const error_message = error.response.data
            let keys = []
            for (let key in error_message){
                if (error_message.hasOwnProperty(key)){
                    keys.push(key)
                }
                keys.map(e=>
                    Seterror_msg(error_message[e]))
                
            
                        }
    }
    
}
// Google Login
const googleLogin = async (credential,navigate)=>{
    const data = decodeJwt(credential)
    console.log(data)
    const {email,name,aud} = data
    const send_data = {
        email:email,name:name,password:aud}
    console.log(email,name,aud)
    const url = "https://dron2720.pythonanywhere.com/api/users/google_save/"
    try {
        const {data:res} = await axios.post(url,send_data)
        console.log(res)
        localStorage.setItem('token',JSON.stringify(res.access))
        localStorage.setItem('refresh',JSON.stringify(res.refresh))
        navigate('/profile')
    } catch (error) {
        console.log(error)
    }
  }
// SignUP Function

    const handleSignup= async()=>{
        dispatch({
            type:'loader',
            payload:true
        })
        const {email,name,password,re_password} = state
        const data ={email,name,password,re_password}
        const email_check = `https://dron2720.pythonanywhere.com/api/users/verify_email/`
        const email_verify={"email":email}
        try {
            const {data:res} = await axios.post(email_check,email_verify)
            dispatch({
                    type:'loader',
                    payload:false
                 })
                console.log(res)
                
                
                    const url =URL+'users/'
                        try {
                           const {data:res} =  await axios.post(url,data)
                            
                           console.log(res)
                           
                        if(res){
                            toast.success("An Activation Email has been send to your Email Address", {
                                position: toast.POSITION.TOP_RIGHT
                              })
                        }

                        } catch (error) {
                            dispatch({
                                type:'loader',
                                payload:false
                            })
                            console.log(error)
                            const error_message = error.response.data
                            let keys = []
                            for (let key in error_message){
                                if (error_message.hasOwnProperty(key)){
                                    keys.push(key)
                                }
                                keys.map(e=>
                                    Seterror_msg(error_message[e]))
                                
                            
                           }
                        
                        }
                
        } catch (error) {
            dispatch({
                type:'loader',
                payload:false
            })
            const error_message = error.response.data
            let keys = []
            for (let key in error_message){
                if (error_message.hasOwnProperty(key)){
                    keys.push(key)
                }
                keys.map(e=>
                    Seterror_msg(error_message[e]))
                
            
           }
        }
        
    
    }
// Activation Function
const handleActivation= async(params,navigate)=>{
    dispatch({
        type:'loader',
        payload:true
    })
    const url = URL+'users/activation/'
    try {
        const {data:res}= await axios.post(url,params)
     
            toast.success("Your Account Has Been Activated Successfully", {
                position: toast.POSITION.TOP_RIGHT
              })
        
        dispatch({
            type:'loader',
            payload:false
        })
        
        console.log(res)
       navigate('/')
    } catch (error) {   
        console.log(error)
    }
  

   
}

// Login Function
const handleLogin = async(navigate)=>{
    dispatch({
        type:'loader',
        payload:true
    })
    const url= URL+'jwt/create/'
    const {email,password} = state
    const data ={email,password}
    const vurl = URL+'jwt/verify/'
    try {
      
        const {data:res} = await axios.post(url,data)
        console.log(res);
        const data2 = {token:res.access}
        console.log(data2);

        try {
            const {data:response} = await axios.post(vurl,data2)
            console.log(response);
            localStorage.setItem('token',JSON.stringify(res.access))
            localStorage.setItem('refresh',JSON.stringify(res.refresh))
              dispatch({
        type:'loader',
        payload:false
    })
            
            navigate('/profile')
           
        } catch (error) {
            console.log(error);
             dispatch({
        type:'loader',
        payload:false
    })
        }
        
        
      
    
      } catch (error) {
        console.log(error);
          dispatch({
        type:'loader',
        payload:false
                    })
        const error_message = error.response.data
        let keys = []
        for (let key in error_message){
            if (error_message.hasOwnProperty(key)){
                keys.push(key)
            }
            keys.map(e=>
                Seterror_msg(error_message[e]))
            
        
                    }
                    
       
      }
      
  }

// Forgot Password
const handleForgot=async()=>{
    dispatch({
        type:'loader',
        payload:true
    })
    const url=URL+'users/reset_password/'
    const {email} = state
    const data = {email}
    try {
        const {data:res} =await axios.post(url,data)
        dispatch({
            type:'loader',
            payload:false
        })
        toast.success("An Email Regarding Details has been sent to your email.", {
            position: toast.POSITION.TOP_RIGHT
          })
        console.log(res)
        
    } catch (error) {
        dispatch({
            type:'loader',
            payload:false
        })
        toast.error("User with given email does not exist.", {
            position: toast.POSITION.TOP_RIGHT
          })
        console.log(error)
    }
}
// Reset Password
const handleReset= async(params,navigate)=>{
    const {new_password,re_new_password} = state
    const {uid,token} = params
    const data = {new_password,re_new_password,uid,token}

    dispatch({
        type:'loader',
        payload:true
    })
    const url = URL+'users/reset_password_confirm/'
    try {
        const {data:res} = await axios.post(url,data)
        
        dispatch({
            type:'loader',
            payload:false
        })
        toast.success("Password Reset Successfully.", {
            position: toast.POSITION.TOP_RIGHT
          })
          console.log(res)
        navigate('/')
    } catch (error) {
        dispatch({
            type:'loader',
            payload:false
        })
        toast.error("Passwords do not match.", {
            position: toast.POSITION.TOP_RIGHT
          })
        console.log(error)
    }
  }

//   Change PassWord
const handleChange = async(navigate)=>{
    const token = JSON.parse(localStorage.getItem('token'))
    const url = URL+'users/set_password/'
    const {current_password,new_password,re_new_password} =state
    const data = {current_password,new_password,re_new_password}
    dispatch({
        type:'loader',
        payload:true
    })
    try {
        const {data:res} = await axios.post(url,data,{
            headers:{'Authorization':'JWT '+token}
            

        })
        dispatch({
            type:'loader',
            payload:false
        })
        toast.success("Password Changed Successfully.", {
            position: toast.POSITION.TOP_RIGHT
          })
        console.log(res)
        navigate('/profile')
    } catch (error) {
        dispatch({
            type:'loader',
            payload:false
        })
        if(error.response.data.current_password){
            toast.error("Invalid Current Password.", {
                position: toast.POSITION.TOP_RIGHT
              })
        }
        else{
            toast.error("Passwords do not match.", {
                position: toast.POSITION.TOP_RIGHT
              })
        }
        
        console.log(error)
        
    }
  }

// Delete Account
const handleDelete =async(navigate)=>{
    const url = URL+'users/me/'
    const {current_password} = state
    const token = JSON.parse(localStorage.getItem('token'))
     dispatch({
        type:'loader',
        payload:true
    })
    try {
        const {data:res} = await axios.delete(url,{
            headers:{'Authorization':'JWT '+token},
            data:{current_password}
        })
        dispatch({
            type:'loader',
            payload:false
        })
        toast.info("We will Miss You.", {
            position: toast.POSITION.TOP_RIGHT
          })
        console.log(res)
        navigate('/')
    } catch (error) {
         dispatch({
            type:'loader',
            payload:false
        })
        toast.error("Invalid Current Password.", {
                position: toast.POSITION.TOP_RIGHT
              })
        console.log(error)
        
    }
}


    return(
            <DataContext.Provider value={{state,dispatch,handleSignup,handleActivation,handleLogin,handleForgot,handleReset,handleChange,handleDelete,googleLogin,error_msg,Seterror_msg,OtpLogin,otpVerify,otpResend}}>
                {children}
            </DataContext.Provider>
    )
}

const useDataContext = ()=>{
    return useContext(DataContext)
}

export {DataContext,DataContextProvider,useDataContext}