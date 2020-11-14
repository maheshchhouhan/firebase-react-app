import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

const Header = lazy(() => import('./components/Header'));
const Login = lazy(() => import('./components/Login'));
const Orders = lazy(() => import('./components/Orders'));

const App = () => {
  return (
    <Suspense
      fallback={
        <div className='d-flex align-items-center justify-content-center w-100'>
          Loading...
        </div>
      }
    >
      <Container>
        <Router>
          <Header />
          <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/orders' exact component={Orders} />
            {/* <ProtectedRoute exact path="/orders" component={Orders} />               */}
          </Switch>
        </Router>
      </Container>
    </Suspense>
  );
};

export default App;
