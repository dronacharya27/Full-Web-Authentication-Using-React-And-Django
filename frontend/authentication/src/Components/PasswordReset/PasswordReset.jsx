import React from 'react'
import { useParams } from 'react-router-dom'
import '../Login/Login.css'
import { useNavigate } from 'react-router-dom'
import { useDataContext } from '../../Context/Context'
import { Circles } from "react-loader-spinner";

const PasswordReset = () => {
    const {dispatch,handleReset,state} = useDataContext()
    const navigate =useNavigate()
    const params = useParams()
  
      const handledata = (e)=>{
        const {name,value} = e.target;
        dispatch({
          type:'handledata',
          payload:{name,value}
        })
      }
      

  return (
    <>
     {state.isloading ? (
      
      <Circles
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
     
    ) :
    <div className='login'>
       <input type="password" placeholder='Password' name='new_password' onChange={handledata}/>
       <input type="password" placeholder='Confirm Password' name='re_new_password' onChange={handledata}/>
       <button onClick={()=>handleReset(params,navigate)}><i className="ri-arrow-right-circle-line nexticon"></i></button>

    </div>}
    </>
  )

}

export default PasswordReset
