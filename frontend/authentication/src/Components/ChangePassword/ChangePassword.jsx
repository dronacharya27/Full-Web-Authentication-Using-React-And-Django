import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDataContext } from '../../Context/Context';
import { Circles } from "react-loader-spinner";

const ChangePassword = () => {
    const {dispatch,handleChange,state} = useDataContext()
    const navigate = useNavigate()
 
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
    <div>
      <div className='login'>
      <input type="text" placeholder='Current Password' name='current_password' onChange={handledata}/>
       <input type="text" placeholder='New Password' name='new_password' onChange={handledata}/>
       <input type="text" placeholder='Confirm New Password' name='re_new_password' onChange={handledata}/>
      
       <button onClick={()=>handleChange(navigate)}><i className="ri-arrow-right-circle-line nexticon"></i></button>

    </div>
    </div>

}</>
  )
}

export default ChangePassword
