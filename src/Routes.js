import { CircularProgress } from '@material-ui/core';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Cart = lazy(() => import('./pages/Cart'));
const Payment = lazy(() => import('./pages/Payment'));

export default function Routes() {
  return (
    <Router>
      <Suspense fallback={<CircularProgress />}>
        <Switch>
          <Route path="/" exact element={<Home />} />
          <Route path="/produtos" exact element={<Products />} />
          <Route path="/sobre-nos" exact element={<AboutUs />} />
          <Route path="/meu-carrinho" exact element={<Cart />} />
          <Route path="/meu-carrinho/pagamento" exact element={<Payment />} />
        </Switch>
      </Suspense>
    </Router>
  );
}
