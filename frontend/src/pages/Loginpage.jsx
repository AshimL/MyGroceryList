import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/userInfo';
import { useNavigate } from 'react-router-dom';


const Loginpage = () => {

  const [userInfo, setuserInfo] = useState({
    username: "",
    password: ""
  });

  const {userLogin, username} =  useAuthStore();
  const navigate = useNavigate();

  useEffect(() =>{
    if(username){
      navigate("/home")
    }
  }, [username,navigate])

  const handleLogin = async (e) => {
    e.preventDefault();
    const {message, success} = await userLogin(userInfo);
    
    if (success) {
      navigate("/home")
    } else {
      alert(message); 
    }

  }


  return (
    <div>
      <h1>Login Page</h1>

      <form onSubmit={handleLogin} method="POST">

        <input name='username' value={userInfo.username}
          onChange={(e) => setuserInfo({ ...userInfo, username: e.target.value })} />

        <input name='password' value={userInfo.password}
        type='password'
          onChange={(e) => { setuserInfo({ ...userInfo, password: e.target.value }) }} />

        <button type='submit'>Login</button>
      </form>




    </div>
  )
}

export default Loginpage