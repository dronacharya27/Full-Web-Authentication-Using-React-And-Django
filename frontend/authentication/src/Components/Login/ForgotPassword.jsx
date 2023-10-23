import React from 'react'

import { useDataContext } from '../../Context/Context'
import { Circles } from "react-loader-spinner";
const ForgotPassword = () => {
    const {dispatch,handleForgot,state} = useDataContext()
    
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
       <input type="text" placeholder='Email' name='email' onChange={handledata}/>
       <button onClick={()=>handleForgot()}><i className="ri-arrow-right-circle-line nexticon"></i></button>
    </div>
    }
    </>
  )
}

export default ForgotPassword
