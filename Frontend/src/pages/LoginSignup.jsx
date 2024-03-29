import React from 'react'
import './css/loginsignup.css'
import { useState } from 'react'
const LoginSignup = () => {
  const [state,setState]=useState("Login");
  const [formData,setFormData]=useState(
    {
    name:"",
    email:"",
    password:""
  })
  const changeHandler=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
    
  }
  const login=async()=>
  {
    let responseData;
    await fetch('https://eccomerceapi-75u7.onrender.com/login',{
     method:'POST',
     headers:{
       Accept:'application/form-data',
       'Content-Type':'application/json'
     },
     body:JSON.stringify(formData)
    }).then((response)=>response.json()).then((data)=>{responseData=data})
    if(responseData.success)
    {
     localStorage.setItem('auth-token',responseData.token);
     window.location.replace("/");//it is used to replace to different user 
    }else{
     alert(responseData.errors);
    }
  }
  
  const signup=async()=>{
   let responseData;
   await fetch('https://eccomerceapi-75u7.onrender.com/signup',{
    method:'POST',
    headers:{
      Accept:'application/form-data',
      'Content-Type':'application/json'
    },
    body:JSON.stringify(formData)
   }).then((response)=>response.json()).then((data)=>{responseData=data})
   if(responseData.success)
   {
    localStorage.setItem('auth-token',responseData.token);
    window.location.replace("/");//it is used to replace to different user 
   }else{
    alert('passeord is wrong plase enter right password');
   }
  }
  return (
    <div className='login'>
      <div className="login-container">
        <h1>{state}</h1>
        <div className="login-fields">
         {state==="Sign Up"?<input name="name" type="text" placeholder='Your Name'  value={formData.name} onChange={changeHandler}/>:<></>} 
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
        {state==="Sign Up"?<p className="loginsignup-login">
          Already have a account? <span onClick={()=>setState("Login")}>Login</span></p>: <p className="loginsignup-login">
          Create an account <span onClick={()=>setState("Sign Up")}>Click here</span></p>}
        
         
          <div className="loginsignup-agree">
            <input type="checkbox" name='' id=''/>
            <p>By continuing, i agree to the terms of use & privacy</p>
          </div>

      </div>
        </div>
  )
}

export default LoginSignup
