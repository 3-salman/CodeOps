import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserProvider';
import { useNavigate } from 'react-router-dom';

function SignupPage() {

  const [form , setform]=useState({
        name:"",
        email:"",
        phone:"",
        password:""
  })
   const [errors, setErrors] = useState({})
   const { setUser } = useUser()
   const navigate = useNavigate()

        function handleChange(e){

          const {name , value} =e.target;

          setform((f)=>(
            {
              ...f,
              [name]:value
            }

         ) );
        }

  function validate() {
    const newErrors = {}

    if (form.name.trim().length < 2) {
      newErrors.name = 'Please enter your full name'
    }
    if (!form.email.includes('@')) {
      newErrors.email = 'Enter a valid email address'
    }
    if (form.phone.trim().length < 9) {
      newErrors.phone = 'Enter a valid phone number'
    }
    if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    return newErrors
  }

   function handleSubmit(e) {
    e.preventDefault()

    const newErrors = validate()
    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setUser({ name: form.name })
      navigate('/menu')
    }
  }


  return (
    <div className="login-page-wrapper">
      <div className="login-page-card">
        <h2 className="login-page-title">Create Account</h2>
        <p className="login-page-subtitle">Join Addis Eats and start ordering</p>

        <form className="login-page-form" onSubmit={handleSubmit} noValidate>
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
            {errors.name && <span className="field-error">{errors.name}</span>}
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
            {errors.name && <span className="field-error">{errors.email}</span>}
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
            {errors.name && <span className="field-error">{errors.phone}</span>}
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
            {errors.name && <span className="field-error">{errors.password}</span>}
          </div>
          <button type="submit" className="login-page-button">
            Create Account
          </button>
        </form>

        <p className="login-page-signup">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  )
}

export default SignupPage