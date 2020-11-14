import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

import logo from '../../logo.png';

const Headbar = () => {
  return (
    <>
      <Navbar
        expand='lg'
        className='justify-content-between align-items-center'
      >
        <Link to='/'>
          <img src={logo} alt='logo' className='logo' />
        </Link>
        <Nav>
          <Link className='nav-link' to='/orders'>
            Orders
          </Link>
          <Link className='nav-link' to='/logout'>
            Logout
          </Link>
        </Nav>
      </Navbar>
      <hr />
    </>
  );
};

export default Headbar;
