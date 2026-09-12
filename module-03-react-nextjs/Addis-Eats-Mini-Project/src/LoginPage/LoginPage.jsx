import React, { useState } from 'react'



function LoginPage() {
  const [form, setForm] =useState({
        username:"",
        pwd:""
  });

  // const stored_user_Data=localStorage.getItem('userData')
  const [user_data, setUser]=useState(
    JSON.parse(localStorage.getItem('userData')) || []
  )

  const [auth_state, setAuthstate]=useState(false);


  function fetchfromlocalstorage() {
    return localStorage.getItem('userData');
  }

  function handlechange(e){
    const {name , value}=e.target;
    setForm((f)=>(
      {
        ...f,
        [name]:value
      }
    ));
  }

  function formhandler(e){
    e.preventDefault();

  //  setAuthstate(user_data.some(name=>name.name == form.name) && user_data.some(pwd=>pwd.name == form.pwd)? true:false);
    setAuthstate(true);
    console.log(form);
    console.log(user_data);
    let t=user_data.some(name=>name.username == form.username);
    console.log(t);
    console.log(user_data.some(pwd=>pwd.pwd == form.pwd));
    console.log(auth_state)
    
    


  }
  

  return (
     <div className="login-page-wrapper">
      <div className="login-page-card">
        {auth_state ? "logined succesfully" : "not" }
        <h2 className="login-page-title">Welcome Back</h2>
        <p className="login-page-subtitle">Sign in to your account</p>
        
        <form className="login-page-form" onSubmit={formhandler}>
          <div className="login-page-form-group">
            <label htmlFor="email">username</label>
            <input
              type="text"
              id="email"
              placeholder="username"
              name="username"
              onChange={handlechange}
            />
          </div>
          
          <div className="login-page-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              name="pwd"
              onChange={handlechange}
            />
          </div>
          
          <div className="login-page-options">
            <label className="login-page-remember">
              <input
                type="checkbox"
              />
              Remember me
            </label>
            <a href="#" className="login-page-forgot">Forgot password?</a>
          </div>
          
          <button type="submit" className="login-page-button">
            Sign In
          </button>
        </form>
        
        <p className="login-page-signup">
          Don't have an account? <a href="#">Sign up</a>
        </p>
      </div>
    </div>
  )
}

export default LoginPage