import { CircularProgress } from "@material-ui/core";
import "firebase/auth";
import { lazy, Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes as Switch,
} from "react-router-dom";
import { getAuth } from "firebase/auth";
import { app } from "services/firebase";

const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Cart = lazy(() => import("./pages/Cart"));
const Payment = lazy(() => import("./pages/Payment"));
const Login = lazy(() => import("./pages/Login"));
const OrdersAdmin = lazy(() => import("./pages/OrdersAdmin"));
const Registration = lazy(() => import("./pages/Registration"));

export default function Routes() {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(() => {
      auth.currentUser.getIdToken().then((result) => {
        setUser(result);
      });
    });
  }, [auth]);

  console.log(window.sessionStorage.getItem("Auth Token"));
  console.log(user);

  return (
    <Router>
      <Suspense fallback={<CircularProgress />}>
        <Switch>
          <Route path="/" exact element={<Home />} />
          <Route path="/produtos" exact element={<Products />} />
          <Route path="/sobre-nos" exact element={<AboutUs />} />
          <Route path="/meu-carrinho" exact element={<Cart />} />
          <Route path="/cadastro" exact element={<Registration />} />
          <Route path="/login" exact element={<Login />} />

          <Route
            path="/admin/pedidos"
            exact
            element={user ? <OrdersAdmin /> : <Navigate to="/login" />}
          />
          <Route
            path="/meu-carrinho/pagamento"
            exact
            element={user ? <Payment /> : <Navigate to="/login" />}
          />
        </Switch>
      </Suspense>
    </Router>
  );
}
