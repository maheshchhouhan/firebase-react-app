import { useDispatch, useSelector } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

import logo from '../../logo.png';
import { logout } from '../../redux/actions';

const Headbar = () => {
  const { user } = useSelector((state) => state.auth);

  const reduxDispatch = useDispatch();

  const handleLogout = () => {
    reduxDispatch(logout());
  };

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
          {!user ? (
            <Link className='nav-link' to='/'>
              Login
            </Link>
          ) : (
            <>
              <Link className='nav-link' to='/orders'>
                Orders
              </Link>
              <Button
                className='nav-link'
                style={{ cursor: 'pointer' }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}
        </Nav>
      </Navbar>
      <hr />
    </>
  );
};

export default Headbar;
