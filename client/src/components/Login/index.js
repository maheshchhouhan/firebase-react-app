import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';

import Container from 'react-bootstrap/Container';

import useForm from './../../hooks/useForm';
import { validateEmail } from '../../utils';

import { authenticate } from './../../redux/actions/index';

const initialState = {
  email: '',
  password: '',
  error: '',
};

const Login = () => {
  const history = useHistory();
  const reduxDispatch = useDispatch();
  const { authError, loading, user } = useSelector((state) => state.auth);

  const { state, dispatch, handleChange } = useForm(initialState);

  const { email, password, error } = state;

  useEffect(() => {
    if (user) history.push('/orders');
  }, [user, history]);

  const handleValidation = () => {
    return new Promise((resolve, reject) => {
      const errors = [];
      if (email.trim() === '') {
        errors.push(`Email is required`);
      }
      if (email && !validateEmail(email)) {
        errors.push(`Please enter valid email address`);
      }
      if (password.trim() === '') {
        errors.push(`Password is required`);
      }

      if (!errors.length) {
        dispatch({
          type: 'SET_STATE',
          payload: { name: 'error', value: '' },
        });
        resolve(true);
      } else {
        reject({ msg: errors.join('<br/>') });
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const validate = await handleValidation();

      if (validate) {
        // login with firebase
        reduxDispatch(authenticate(email, password));
      }
    } catch (e) {
      if (e.msg) {
        dispatch({
          type: 'SET_STATE',
          payload: { name: 'error', value: e.msg },
        });
      }
    }
  };

  return (
    <Container
      className='d-flex align-items-center justify-content-center'
      style={{ minHeight: '60vh' }}
    >
      <Card className='w-100' style={{ maxWidth: '400px' }}>
        <Card.Body>
          <h2 className='text-center mb-4'>Log In</h2>
          {(error || authError) && (
            <Alert variant='danger'>
              <div
                dangerouslySetInnerHTML={{ __html: error ? error : authError }}
              ></div>
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='text'
                name='email'
                value={email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                name='password'
                value={password}
                onChange={handleChange}
              />
            </Form.Group>
            <Button disabled={loading} className='w-100' type='submit'>
              Log In
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
