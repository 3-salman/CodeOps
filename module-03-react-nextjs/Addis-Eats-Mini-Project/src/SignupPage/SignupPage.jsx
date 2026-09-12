import React from 'react'
import { useState } from 'react';

function SignupPage() {

  const [form , setform]=useState({
        name:"",
        email:"",
        phone:"",
        password:""
  })



        function setUserDataToLocalStorage(userData) {
            localStorage.setItem('userData', JSON.stringify(userData));
        }

        function handleChange(e){

          const {name , value} =e.target;

          setform((f)=>(
            {
              ...f,
              [name]:value
            }

         ) );
          console.log(form)
        }

        function handleSubmit(e){
          e.preventDefault();
          

        }
        function validateFormData() {

            setUserDataToLocalStorage()
        }



  return (
    <div className="login-page-wrapper">
      <div className="login-page-card">
        <h2 className="login-page-title">Create Account</h2>
        <p className="login-page-subtitle">Join Addis Eats and start ordering</p>

        <form className="login-page-form" onSubmit>
          <div className="login-page-form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              placeholder="Sara Bekele"
              name="name"
              value={form.name}

              onChange={handleChange}
            />
          </div>

          <div className="login-page-form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="login-page-form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              placeholder="+251 9********"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div className="login-page-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="login-page-form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="login-page-button" onClick={validateFormData}>
            Create Account
          </button>
        </form>

        <p className="login-page-signup">
          Already have an account? <a href="#">Sign in</a>
        </p>
      </div>
    </div>
  )
}

export default SignupPage