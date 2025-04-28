import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/userInfo';
import { useNavigate } from 'react-router-dom';

 const Registerpage = () => {
    const [userInfo, setuserInfo] = useState({
      username: "",
      password: ""
    });
  
    const {userRegister, username} =  useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
      if(username){
        navigate('/home')
      }
    }, [username, navigate])



    const handleRegister = async (e) =>{
      e.preventDefault();

      const {message, success} = await userRegister(userInfo)

      if (success) {
        navigate("/home")
      } else {
        alert(message); 
      }
    } 

  return (
    <div>
    <h1>Register</h1>

    <form onSubmit={handleRegister} method="POST">
      <input name='username' value={userInfo.username}
        onChange={(e) => setuserInfo({ ...userInfo, username: e.target.value })} />

      <input name='password' value={userInfo.password}
      type='password'
        onChange={(e) => { setuserInfo({ ...userInfo, password: e.target.value }) }} />

      <button type='submit'>Register</button>
    </form>




  </div>
  )
}

export default Registerpage