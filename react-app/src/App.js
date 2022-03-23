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
import { SearchResults } from './components/search/SearchResults';
import { MyQuestions } from './components/myQuestions/MyQuestions';
import { FourZeroFour } from './components/404';
import { getQuestions } from './store/questions';

function App() {
    const user = useSelector(({ session }) => session.user)
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
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
                <ProtectedRoute path='/search' exact={true}>
                    <SearchResults user={user} />
                </ProtectedRoute>
                <ProtectedRoute path='/' exact={true} >
                    <HomePage user={user} />
                </ProtectedRoute>
                <ProtectedRoute path='/question/:id' exact={true}>
                    <Question user={user} />
                </ProtectedRoute>
                <ProtectedRoute path='/myQuestions' exact={true}>
                    <MyQuestions user={user} />
                </ProtectedRoute>
                <Route path='/error'>
                    <FourZeroFour />
                </Route>
                <Route>
                    <FourZeroFour />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
