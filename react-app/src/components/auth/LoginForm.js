import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import SignUpForm from './SignUpForm';
import { Modal } from '../../context/Modal';
import './LoginForm.css'

const LoginForm = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showSignupModal, setShowSignupModal] = useState(false)
    const [showAboutDropdown, setShowAboutDropdown] = useState(false)

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
        dispatch(login('Hrodeber@Elder.com', 'password!'))
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
        authBtn.style.backgroundColor = 'rgb(130, 157, 250)'
        authBtn.classList.remove('not-clickable')
    } else if (authBtn) {
        authBtn.classList.add('not-clickable')
    }

    return (
        <div id='login-page'>
            {showSignupModal && (
                <Modal>
                    <SignUpForm setShowSignupModal={setShowSignupModal} />
                </Modal>
            )}
            <div id='splash-container'>
                <div id='login-title'>climbOn</div>
                <div id='login-header'>A place to share climbing knowledge and better understand the climbing world</div>
                <div id='form-container'>
                    <div id='login-left'>
                        <div id='left-btns-container'>
                            <div className='splash-left-btns' onClick={() => setShowSignupModal(true)}>Sign up with email</div>
                            <div className='splash-left-btns demo' onClick={demoLogin}>Demo Login</div>
                        </div>
                        <div id='terms-service'>By continuing you indicate that you agree to climbOn's Terms of Service and Privacy Policy.</div>
                    </div>
                    <form id='login-right' onSubmit={onLogin}>
                        <label id='login-label'>Login</label>
                        <div className='label-field'>
                            <label htmlFor='email' className='login-labels'>Email
                                {errors.map(error => {
                                    if (error.email) {
                                        return <span key={Math.random()} id='email-error'>{error.email}</span>
                                    } else return <span key={Math.random()}></span>
                                })}
                            </label>
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
                            <label htmlFor='password' className='login-labels'>Password
                                {errors.map(error => {
                                    if (error.password) {
                                        return <span key={Math.random()} id='password-error'>{error.password}</span>
                                    } else return <span key={Math.random()}></span>
                                })}
                            </label>
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
                <div id='splash-footer'>
                    <ul id='list-container'>
                        <li className='list-item about' onClick={() => setShowAboutDropdown(true)}>About</li>
                        {showAboutDropdown &&
                            <>
                                <div id='background' onClick={() => setShowAboutDropdown(false)}></div>
                                <ul id='about-dropdown'>
                                    <li className='about-list'>
                                        <a href='https://www.linkedin.com/in/chris-young-96453917/'
                                            target='_blank' rel="noopener noreferrer"
                                        >LinkedIn
                                        </a>
                                    </li>
                                    <li>
                                        <a href='https://github.com/Noslepr'
                                            target='_blank' rel="noopener noreferrer"
                                        >GitHub
                                        </a>
                                    </li>
                                </ul>
                            </>
                        }
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
        </div>
    );
};

export default LoginForm;
