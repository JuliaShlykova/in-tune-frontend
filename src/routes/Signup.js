import React, { useEffect, useReducer, useState } from 'react';
import InTuneLogo from '../assets/in-tune-invert.svg';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { signup } from '../api/auth';
import { getLocalValue, setLocalValue } from '../localStorage';


const Signup = () => {
  const [firstName,  setFirstName] = useState('');
  const [lastName,  setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [typePassword, toggleType] = useReducer(type=>type==='password'?'text':'password', 'password');
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const submitForm = async(e) => {
    e.preventDefault();
    if (password === passwordConfirm) {
      try {
        const response = await signup({
          firstName,
          lastName,
          email,
          password,
          confirm_password: passwordConfirm
        });
        if (response.hasOwnProperty('errors')) {
          setErrors(response['errors']);
        } else {
          setLocalValue('user', response.userId);
          navigate('/');
        }
      } catch(err) {
        console.log(err.message);
      }
    }
  }

  useEffect(() => {
    if (password!==passwordConfirm) {
      setErrors([{msg: 'passwords must match'}]);
    } else {
      setErrors([]);
    }
  }, [password, passwordConfirm]);

  return (
  <div className='login-route-container'>
    <div className='login-logo'>
      <span>Stay</span>
      <img src={InTuneLogo} alt="" />
      <span>with the world</span>
    </div>
    <div className='login-ways-container'>
      <div className="login-ways">
        <h1>Sign-up</h1>
        <form onSubmit={submitForm}>
          <label htmlFor="first-name">First Name (required): </label>
          <input type="text" id="first-name" value={firstName} placeholder='John' onChange={(e) => {setFirstName(e.target.value)}} maxLength={40} required/>
          <label htmlFor="last-name">Last Name (required): </label>
          <input type="text" id="last-name" value={lastName} placeholder='Smith' onChange={(e) => {setLastName(e.target.value)}} maxLength={40} required/>
          <label htmlFor="email">Email (required): </label>
          <input type="email" id="email" value={email} placeholder='john@smith.com' onChange={(e) => {setEmail(e.target.value)}} maxLength={254} required/>
          <label htmlFor="password">Password (required): </label>
          <div className="password-container">
              <input type={typePassword} id="password" value={password} onChange={(e) => {setPassword(e.target.value)}} minLength={8} required/>
                {(typePassword==='password')
                ?<AiFillEye onClick={() => {toggleType()}}/>
                :<AiFillEyeInvisible onClick={() => {toggleType()}}/>}
            </div>
          <label htmlFor="password-confirm">Confirm password (required): </label>
          <input type="password" id="password-confirm" value={passwordConfirm} onChange={(e) => {setPasswordConfirm(e.target.value)}} required/>
          {errors.length
          ?<div className="errors">
            {errors.map((err, i) => {
              return (
                <p key={i}>{err.msg}</p>
              )
            })}
          </div>
          :null
        }
          <button type='submit'>Sign Up</button>
        </form>
        <p>Already have an account? <Link to='/login'> Login</Link> </p>
      </div>
    </div>
  </div>
  )
}

export default Signup