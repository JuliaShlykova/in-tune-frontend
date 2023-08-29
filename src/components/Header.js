import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useWindowDimensions from '../hooks/useWindowDimesions';
import InTuneLogo from '../assets/in-tune.svg';
import useShowOnScroll from '../hooks/useShowOnScroll';

const Header = () => {
  const show = useShowOnScroll();

  const { height, width } = useWindowDimensions();
  const navigator = useNavigate();

  const logout = () => {
    navigator('/login');
  }

  return (
    <header className={show?'':'hidden'}>
      {(width<=600)?null:
      <img src={InTuneLogo} alt="" title='in tune' />
      }
      <nav>
        <ul>
          <li>
            <NavLink to='/' >Posts</NavLink>
          </li>
          <li>
            <NavLink to='userid/profile'>Profile</NavLink>
          </li>
          <li>
            <NavLink to='/friends'>Friends</NavLink>
          </li>
        </ul>
      </nav>
      <div id="container-logout">
        <button id='btn-logout' onClick={logout}>Log Out</button>
      </div>
    </header>
  )
}

export default Header