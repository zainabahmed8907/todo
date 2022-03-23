import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import "../App.css"
import M from 'materialize-css'
import axios from "axios"
function Login() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const location=useNavigate();
  const postData=async()=>{
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
    {
      M.toast({html:"Invalid email",classes:"red"});
      return;
    }
    await fetch("http://localhost:5000/login",
    {
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,
        password
      })
    }
    )
    .then(res=>res.json())
    .then(data=>{
      if(data.error)
      {
        M.toast({html:data.error,classes:"#b71c1c red darken-4 "})
      }
      else{
        M.toast({html:"signed in success",classes:'#43a047 green darken-1'});
        location("/todo")
      }
      console.log(data)
    
    })
    .catch(err=>console.log(err));

  }
  return (
    <div className='myCard'>
      <div className='card auth-card input-field'>
        <h3>Login</h3>
        <div className='card-content input-field'>
          <input
            type="text"
            placeholder='email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
          <input type="password"
            placeholder="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
          <button className='btn btn-waves waves-light d-block mx-auto w-75 mt-3'
          onClick={()=>postData()}
          >
            Login
          </button>
          <h5 className='mt-3 text-center'>
            <Link to="/signup">
              Don't have an account?

            </Link>
          </h5>

        </div>

      </div>
    </div>
  )
}

export default Login