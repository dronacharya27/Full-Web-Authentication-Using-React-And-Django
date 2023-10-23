import { createContext, useContext, useReducer, useState } from "react";
import reducer from "../Reducer/reducer";
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const DataContext = createContext()
const initialstate = {
    email:'',
    name:'',
    password:'',
    re_password:'',
    current_password:'',
    new_password:'',
    re_new_password:'',
    is_loading:false
    
}



const URL = 'http://localhost:8000/api/auth/'
const DataContextProvider=({children}) =>{
    const[state,dispatch]=useReducer(reducer,initialstate)

// Google Login
const googleLogin = ()=>{
    const url ='https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&client_id=641907459136-6c48hsqlr7p8656o7uerjr1s5iqglnf7.apps.googleusercontent.com&scope=profile%20email&response_type=code&redirect_uri=http://localhost:5173/loader/'
    window.location = url
  }
// SignUP Function

    const handleSignup= async()=>{
        dispatch({
            type:'loader',
            payload:true
        })
        const {email,name,password,re_password} = state
        const data ={email,name,password,re_password}
    const url =URL+'users/'
    try {
       const {data:res} =  await axios.post(url,data)
        
       console.log(res)
       dispatch({
        type:'loader',
        payload:false
    })
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
    try {
      const {data:res} = await axios.post(url,data)
      console.log(res)

      localStorage.setItem('token',JSON.stringify(res.access))
      localStorage.setItem('refresh',JSON.stringify(res.refresh))
      
      dispatch({
        type:'loader',
        payload:false
    })
      navigate('/profile')

    } catch (error) {
        if(error.response.data.detail){
            toast.error("Invalid Credentials", {
                position: toast.POSITION.TOP_RIGHT
              })
        }
    
    dispatch({
        
            type:'loader',
            payload:false
        })
      console.log(error.response.data)
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
            <DataContext.Provider value={{state,dispatch,handleSignup,handleActivation,handleLogin,handleForgot,handleReset,handleChange,handleDelete,googleLogin}}>
                {children}
            </DataContext.Provider>
    )
}

const useDataContext = ()=>{
    return useContext(DataContext)
}

export {DataContext,DataContextProvider,useDataContext}