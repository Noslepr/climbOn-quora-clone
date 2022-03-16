
import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';

const NavBar = ({ user }) => {
  return (
    <nav>
      <ul>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
