import axios from "axios";
import { useEffect } from "react";

import { Circles } from "react-loader-spinner";

 

import React from 'react'
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDataContext } from "../../Context/Context";


const Loader = () => {
    const { dispatch} = useDataContext();
    const [searchParams, setSearchParams] = useSearchParams()
    const code  = searchParams.get("code")

    const navigate = useNavigate();
useEffect(()=>{
       
        const gurl = `https://oauth2.googleapis.com/token?code=${code}&prompt=consent&client_id=641907459136-6c48hsqlr7p8656o7uerjr1s5iqglnf7.apps.googleusercontent.com&client_secret=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&redirect_uri=http://localhost:5173/loader/&grant_type=authorization_code`
       
        
        const handleAccess = async()=>{
            // dispatch({
            //     type:'loader',
            //     payload:true
            // })
            try {
                
            const {data:res} = await axios.post(gurl)   
            console.log(res);
            localStorage.setItem('token',JSON.stringify(res.access_token))
            localStorage.setItem('refresh',JSON.stringify(res.refresh_token))
            const access = localStorage.getItem('token')
            const gurl2 = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access}`
            const {data:res2} = await axios.post(gurl2)
            console.log(res2);
            // dispatch({
            //     type:'loader',
            //     payload:false
            // })
            navigate('/profile')
        }
        catch (error) {
            dispatch({
                type:'loader',
                payload:false
            })
            console.log(error) 
        } 
        }
        

        handleAccess()
        
    })
  return (
    <div>
      <h1> <Circles
          height="80"
          width="80"
          color="#DA70D6"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        /></h1>
    </div>
  )
}

export default Loader
