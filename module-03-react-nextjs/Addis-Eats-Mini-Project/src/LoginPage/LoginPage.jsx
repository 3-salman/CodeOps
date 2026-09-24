import { useState, useEffect } from 'react'
import {useNavigate, useLocation, Link} from 'react-router-dom'
import { useUser } from '../context/UserProvider.jsx'



function LoginPage() {
  const [form, setForm] =useState({
        username:"",
        pwd:""
  });
  const [fetching, setFetching]=useState(false);
  const navigate=useNavigate();
  const location=useLocation();
  const { user, setUser } = useUser();
  const [usersData, setUsersData] = useState([]);
  const [auth_state, setAuthstate]=useState(null);
 


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

    const isAuthenticated = AuthenticateUser(form.username, form.pwd);
    
    if(isAuthenticated == false){
        setAuthstate(false)
    }else{
         setAuthstate(true)
         setUser({name: isAuthenticated.name} )
         navigate(location.state?.from?.pathname || '/menu')
    }
  }

  useEffect(()=>{
        async function fetchData() {
          try {
            const response = await fetch('/user.json');
            const data = await response.json();
            
            setUsersData(data);
            setFetching(true);
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        }
        fetchData();

  },[auth_state])

  function AuthenticateUser(username, password) {
    // const user_state = usersData.map((u) => u.name === username && u.password === password ? u : false);
    const user = usersData.find((u) => u.name === username && u.password === password) || false;
    return user  
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
           ✕ Invalid username or password
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
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage