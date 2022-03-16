import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/navbar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
// import UsersList from './components/UsersList';
// import User from './components/User';
import { authenticate } from './store/session';
import { HomePage } from './components/home/Home';

function App() {
  const user = useSelector(({session}) => session.user)
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  if (!user) {
    const html = document.querySelector(':root')
    html.setAttribute('id', 'background-img')
  } else {
    const html = document.querySelector(':root')
    html.removeAttribute('id')
  }

  return (
    <BrowserRouter>
      {user && <NavBar user={user} />}
      {/* { user ?
        <NavBar user={user}/>
        :
        <ul>
          <li>
            <NavLink to='/' exact={true} activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </li>
        </ul>
      } */}
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
          <HomePage user={user}/>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
