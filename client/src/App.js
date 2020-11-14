import { Suspense, lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import ProtectedRoute from './ProtectedRoute';
import Container from 'react-bootstrap/Container';
import { setAuth } from './redux/actions/index';
import Loader from './components/Loader/index';

const Header = lazy(() => import('./components/Header'));
const Login = lazy(() => import('./components/Login'));
const Orders = lazy(() => import('./components/Orders'));

const App = () => {
  const { currentUser, loading } = useAuth();
  const reduxDispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      const { email, uid } = currentUser;
      reduxDispatch(setAuth({ email, uid }));
    }
  }, [currentUser, reduxDispatch]);

  return (
    <Suspense fallback={<Loader />}>
      <Container>
        <Router>
          <Header />
          {!loading ? (
            <Switch>
              <Route path='/' exact component={Login} />
              <ProtectedRoute exact path='/orders' component={Orders} />
            </Switch>
          ) : (
            <Loader />
          )}
        </Router>
      </Container>
    </Suspense>
  );
};

export default App;
