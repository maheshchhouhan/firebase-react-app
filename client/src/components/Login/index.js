import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';

import Container from 'react-bootstrap/Container';

import useForm from './../../hooks/useForm';
import { validateEmail } from '../../utils';

const initialState = {
  email: '',
  password: '',
  error: '',
  loading: '',
};

const Login = () => {
  const { state, dispatch, handleChange } = useForm(initialState);

  const { email, password, error, loading } = state;

  const handleValidation = () => {
    return new Promise((resolve, reject) => {
      const errors = [];
      if (email.trim() === '') {
        errors.push(`Email is required`);
      }
      if (password.trim() === '') {
        errors.push(`Password is required`);
      }
      if (!validateEmail(email)) {
        errors.push(`Please enter valid email address`);
      }
      if (!errors.length) {
        dispatch({
          type: 'SET_STATE',
          payload: { name: 'error', value: '' },
        });
        resolve();
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
          {error && (
            <Alert variant='danger'>
              <div dangerouslySetInnerHTML={{ __html: error }}></div>
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
