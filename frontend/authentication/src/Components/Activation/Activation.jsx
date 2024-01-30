import axios from 'axios'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDataContext } from '../../Context/Context'
import { Circles } from "react-loader-spinner";

const Activation = () => {
    const {handleActivation,state} = useDataContext()
    const params = useParams()
    const navigate =useNavigate()
    console.log(params)


    const styles = {
        borderRadius:'10px',
        padding:'20px 25px',
        backgroundColor: '#bfcfff',
        opacity: '0.9',
        color:'black',
        outline:'none',
        border:'none',
        cursor:'pointer',
    }
    
  
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
     
    ) :
      <button style={styles} onClick={()=>handleActivation(params,navigate)}> ACTIVATE YOUR ACCOUNT</button>
   }</>
  )
}

export default Activation
