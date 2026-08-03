import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '/src/Login.css'
import axios from 'axios'
import BackHome from './BackHome'

function Login() {

  const [form,setForm]=useState({
    username:"",
    password:""
  })
  
  const navigate=useNavigate();

  const handleChange=(e)=>{
      setForm({...form,[e.target.name]:e.target.value})
  }

  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    const res = await axios.post( "https://bus-ticket-reservation-1.onrender.com/user/login", form );

  alert(res.data.message);

  if (res.data.message.includes("Login success")) 
    { 
      localStorage.setItem("user", JSON.stringify(res.data)); 
      const previousPage = window.history.state?.usr;

        if(previousPage?.bus)
        {
            navigate("/booking", {
                state:{
                    bus: previousPage.bus
                }
            });
        }
        else
        {
            navigate("/home");
        }

    }
  };

  return (
    <div>
      <BackHome></BackHome>
    <div className='login'>
        <form action="" onSubmit={handleSubmit}>
            <div>
                <img src="./logo.jpg" alt="" />
                <h1>BUSGO</h1>
            </div>
            <input type="text" placeholder='Username' name='username' required onChange={handleChange}/>
            <input type="password" placeholder='Password' name='password' required onChange={handleChange}/>
            <button type="submit">Login</button>
            <p>or</p>
            <Link to='/register'>new user?</Link>
        </form>
    </div>
    </div>
  )
}

export default Login