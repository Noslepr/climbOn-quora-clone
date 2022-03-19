import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
// import SignUpForm from './components/auth/SignUpForm';
import { NavBar } from './components/navbar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import { HomePage } from './components/home/Home';
import { Question } from './components/question/Question';
import { getQuestions } from './store/questions';

function App() {
  const user = useSelector(({session}) => session.user)
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(getQuestions())
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
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        {/* <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route> */}
        <ProtectedRoute path='/' exact={true} >
          <HomePage user={user}/>
        </ProtectedRoute>
        <ProtectedRoute path='/question/:id' exact={true}>
          <Question user={user}/>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
