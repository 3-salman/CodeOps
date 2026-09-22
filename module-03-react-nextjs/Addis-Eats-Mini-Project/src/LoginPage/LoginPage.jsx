import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'



function LoginPage() {
  const [form, setForm] =useState({
        username:"",
        pwd:""
  });
  const [fetching, setFetching]=useState(false);
  const navigate=useNavigate();
  const { user, setUser } = useUser();

  // const stored_user_Data=localStorage.getItem('userData')
  // const [user, setUser]=useState([]);
  const [auth_state, setAuthstate]=useState(null);
 // console.log(auth_state)


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

    if(AuthenticateUser(form.username, form.pwd)){
         setAuthstate(true)
         navigate('/menu')

    }else{
        setAuthstate(false)
    }
  }

  useEffect(()=>{
        async function fetchData() {
          try {
            const response = await fetch('/user.json');
            const data = await response.json();
            
            setUser(data);
            setFetching(true);
            console.log(data)
          } catch (error) {
            console.error('Error fetching user data:', error);
          }finally {
            console.log(user);
          }
        }
        fetchData();

  },[auth_state])

  function AuthenticateUser(username, password) {
    
    const user_state = user.find(u => u.username === form.name && u.password === form.pwd);
    return user_state  
  }

  return (
     <div className="login-page-wrapper">
      <div className="login-page-card">
        {auth_state == null ? null : auth_state ? (
        <p className="login-page-status login-page-status--success">
           ✓ Logged in successfully
        </p>
        ) : (
         <p className="login-page-status login-page-status--error">
           ✕ Invalid email or password
         </p>
      )}
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
          
          <button type="submit" className="login-page-button" onClick={formhandler}>
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