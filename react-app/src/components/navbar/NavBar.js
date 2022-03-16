import React from 'react';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'

export const NavBar = ({user}) => {

    return (
        <nav id='nav-bar'>

            <LogoutButton />
        </nav>
    )
}
