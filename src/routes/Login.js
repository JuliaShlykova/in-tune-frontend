import React, { useEffect, useReducer, useState } from 'react';
import InTuneLogo from '../assets/in-tune-invert.svg';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { login } from '../api/auth';
import Loading from '../components/Loading';
import { setLocalValue } from '../localStorage';
import Cookies from 'js-cookie';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [typePassword, toggleType] = useReducer(type=>type==='password'?'text':'password', 'password');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const submitForm = async(e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login({
        email,
        password
      });
      setLocalValue('user', response.userId);
      if (response.hasOwnProperty('error')) {
        setError(response['error']);
      } else {
        navigate('/');
      }
    } catch(err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  const examplelogin = async(e) => {
    try {
      const response = await login({
        email: 'john_smith@example.com',
        password: 'examples'
      });
      setLocalValue('user', response.userId);
      navigate('/');
    } catch(err) {
      console.log(err.message);
    }
  }

  const loginWithGoogle = async(e) => {
    try {
      window.open(`${process.env.REACT_APP_API_URL}/auth/google`);
      // const response = await googleLogin();
      // console.log('response: ', response);
      // setLocalValue('user', response.userId);
      // navigate('/');
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const token = Cookies.get('token');
    const user = Cookies.get('user');
    if (token) {
      setLocalValue('token', token);
      if (user) {
        setLocalValue('user', user);
        navigate('/');
      }
    }
  }, [navigate]);

  return (<>
   {loading
    ?<Loading />
   :(<div className='login-route-container'>
      <div className='login-logo'>
        <p>Stay</p>
        <img src={InTuneLogo} alt="" />
        <p>with the world</p>
      </div>
      <div className='login-ways-container'>
        <div className="login-ways">
          <h1>Login</h1>
          <form onSubmit={submitForm}>
            <label htmlFor="email">Email (required): </label>
            <input type="email" id="email" value={email} placeholder='john@smith.com' onChange={(e) => {setEmail(e.target.value)}} required/>
            <label htmlFor="password">Password (required): </label>
            <div className="password-container">
              <input type={typePassword} id="password" value={password} onChange={(e) => {setPassword(e.target.value)}} required/>
                {(typePassword==='password')
                ?<AiFillEye onClick={() => {toggleType()}}/>
                :<AiFillEyeInvisible onClick={() => {toggleType()}}/>}
            </div>
            {error
            ?<div className="errors"><p>{error.message}</p></div>
            :null}
            <button type='submit'>Log In</button>
          </form>
          <p>Don't have an account? <Link to='/signup'> Sign up</Link> </p>
          <button id='btn-example-account' onClick={examplelogin}>
            Log in with Example account
          </button>
          <a href={`${process.env.REACT_APP_API_URL}/auth/google`} id='btn-google-account'>
            Log in with Google
          </a>
        </div>
      </div>
    </div>)}
    </>
  )
}

export default Login