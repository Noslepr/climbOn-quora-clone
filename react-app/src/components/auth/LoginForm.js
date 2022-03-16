import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      console.log(data)
      setErrors(data);
    }
  };

  const demoLogin = (e) => {
    e.preventDefault();
    dispatch(login('watson@soriano.com', 'password'))
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  const authBtn = document.querySelector('.auth-btn')
  if (email && password) {
    console.log('in if')
    authBtn.classList.remove('not-clickable')
  } else if (authBtn) {
      authBtn.classList.add('not-clickable')
  }

  return (
    <div id='login-page'>
      <div id='splash-container'>
        <div id='login-title'>climbOn</div>
        <div id='login-header'>A place to share climbing knowledge and better understand the climbing world</div>
        <div id='form-container'>
          <div id='login-left'>
            <div id='left-btns-container'>
              <div className='splash-left-btns'>Sign up with email</div>
              <div className='splash-left-btns demo' onClick={demoLogin}>Demo Login</div>
            </div>
            <div id='terms-service'>By continuing you indicate that you agree to climbOn's Terms of Service and Privacy Policy.</div>
          </div>
          <form id='login-right'onSubmit={onLogin}>
            <label id='login-label'>Login</label>
            {/* <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error.email}</div>
              ))}
            </div> */}
            <div className='label-field'>
              <label htmlFor='email' className='login-labels'>Email</label>
              <input
                className='email login-field'
                name='email'
                type='text'
                placeholder='Your email'
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div className='label-field'>
              <label htmlFor='password' className='login-labels'>Password</label>
              <input
                className='password login-field'
                name='password'
                type='password'
                placeholder='Your password'
                value={password}
                onChange={updatePassword}
              />
              {/* <button onClick={demoLogin}>Demo Login</button> */}
            </div>
            <div id='btn-container'>
              <button type='submit' className='auth-btn not-clickable'>Login</button>
            </div>
          </form>
        </div>
        <ul id='splash-footer'>
          <div>About</div>
          <li className='list-item'>JavaScript</li>
          <li className='list-item'>Python</li>
          <li className='list-item'>React</li>
          <li className='list-item'>Flask</li>
          <li className='list-item'>SQLAlchemy</li>
          <li className='list-item'>Redux</li>
          <li className='list-item'>Git</li>
          <li className='list-item'>Docker</li>
          <li className='list-item'>Postgres</li>
          <li className='list-item'>AWS</li>
        </ul>
      </div>
    </div>
  );
};

export default LoginForm;
