import React, { useState } from 'react'
import axios from 'axios'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import './Profile.css'
const Profile = () => {
  const navigate = useNavigate()
    const [profiledata,setProfiledata] = useState([])
    
    const handleData= async()=>{
        const url = 'http://dron2720.pythonanywhere.com/api/auth/users/me/'
        const token = JSON.parse(localStorage.getItem('token'))

        try {
            const {data:res} = await axios.get(url,{
                headers:{'Authorization':'JWT '+token}
            })
            console.log(res)
            setProfiledata(()=>{
                return [
                    ...profiledata,res
                ]
            })
            
        } catch (error) {
            console.log(error)
        }
    }
   
  const handleChange=async()=>{
    const url = 'http://dron2720.pythonanywhere.com/api/auth/jwt/refresh/'
    const refresh = JSON.parse(localStorage.getItem('refresh'))
    const data = {
      refresh :refresh
    }
    try {
      const {data:res} = await axios.post(url,data)
      console.log(res)
      localStorage.setItem('token',JSON.stringify(res.access))
      localStorage.setItem('refresh_token',JSON.stringify(res.refresh))
      navigate('/changepassword')
    } catch (error) {
      console.log(error)
    }
    
  }
  const handleDelete=async()=>{
    const url = 'http://dron2720.pythonanywhere.com/api/auth/jwt/refresh/'
    const refresh = JSON.parse(localStorage.getItem('refresh'))
    const data = {
      refresh :refresh
    }
    try {
      const {data:res} = await axios.post(url,data)
      console.log(res)
      localStorage.setItem('token',JSON.stringify(res.access))
      localStorage.setItem('refresh_token',JSON.stringify(res.refresh))
      navigate('/deleteaccount')
    } catch (error) {
      console.log(error)
    }
    
  }
  const handleLogout = ()=>{
    localStorage.clear()
    navigate('/')
  }
  
  return (
    <>
   {localStorage.getItem('token')? <div>
    
    {console.log(profiledata)}
    <button onClick={handleData} className='databtn'>Get Data</button>
   <button className='databtn changebtn' onClick={handleChange}>Change Password</button>
  <button className='databtn deletebtn' onClick={handleDelete} >Delete Account</button>
  <button className='databtn deletebtn' onClick={handleLogout} >LogOut</button>
   
    {profiledata.map((e)=>(
      <div>
          <h1>{e.name}</h1>
          <h1>{e.email}</h1>
      </div>
    ))}
    :
  </div>: <h1>You Are Not Logged In</h1> }
  <Outlet/>
    </>
  )
}

export default Profile
