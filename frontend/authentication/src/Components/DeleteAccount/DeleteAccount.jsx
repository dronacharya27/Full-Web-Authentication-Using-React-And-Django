import './DeleteAccount.css'
import '../Profile/Profile.css'
import { useNavigate } from 'react-router-dom'
import { useDataContext } from '../../Context/Context'
import { Circles } from "react-loader-spinner";

const DeleteAccount = () => {
    const {dispatch,handleDelete,state} = useDataContext()
    const navigate = useNavigate()

    const handleData=(e)=>{
        const {value,name} = e.target
        dispatch({
            type:'handledata',
            payload:{value,name}
        })
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
    <div className='delete'>
    
      <input type="password" placeholder='Password' name='current_password' onChange={handleData}/>
      <button className='databtn deletebtn' onClick={()=>handleDelete(navigate)}>Delete Account</button>
    
    </div>
}</>
  )
}

export default DeleteAccount
