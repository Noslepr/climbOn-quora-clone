import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignupForm.css'

const SignUpForm = ({setShowSignupModal}) => {
    const [errors, setErrors] = useState([]);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const onSignUp = async (e) => {
        e.preventDefault();
        const response = await dispatch(signUp(fullName, email, password, repeatPassword));
        console.log('response in signup submit', response)
        if (response) {
          setErrors(response)
        }
    };

    const updateFullName = (e) => {
        setFullName(e.target.value);
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const updateRepeatPassword = (e) => {
        setRepeatPassword(e.target.value);
    };

    if (user) {
        return <Redirect to='/' />;
    }

    const handleCancel = (e) => {
        e.preventDefault()
        setShowSignupModal(false)
    }

    return (
        <div id='signup-form-modal'>
            <div className='x-continaer'>
                <i className="fa-light fa-xmark" id='x' onClick={handleCancel}></i>
            </div>
            <div id='signup-form-header'>Sign up</div>
            <form>
                <div>
                    {/* {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))} */}
                </div>
                <div>
                    <label className='signup-label'>Full Name</label>
                    <input
                        className='signup-field'
                        placeholder='What would you like to be called?'
                        type='text'
                        name='fullname'
                        onChange={updateFullName}
                        value={fullName}
                    ></input>
                </div>
                <div>
                    <label className='signup-label'>Email</label>
                    <input
                        className='signup-field'
                        placeholder='Your email'
                        type='text'
                        name='email'
                        onChange={updateEmail}
                        value={email}
                    ></input>
                </div>
                <div>
                    <label className='signup-label'>Password</label>
                    <input
                        className='signup-field'
                        placeholder='Your password'
                        type='password'
                        name='password'
                        onChange={updatePassword}
                        value={password}
                    ></input>
                </div>
                <div>
                    <label className='signup-label'>Repeat Password</label>
                    <input
                        className='signup-field'
                        placeholder='Repeat your password'
                        type='password'
                        name='repeat_password'
                        onChange={updateRepeatPassword}
                        value={repeatPassword}
                        required={true}
                    ></input>
                </div>
                {/* <button type='submit'>Sign Up</button> */}
            </form>
            <div id='signup-btn-container'>
                <button id='signup-cancel-btn' onClick={handleCancel}>Cancel</button>
                <button className='auth-btn signup-btn' onClick={onSignUp}>Sign Up</button>
            </div>
        </div>
    );
};

export default SignUpForm;
