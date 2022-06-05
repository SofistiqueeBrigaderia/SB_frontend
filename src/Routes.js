import { CircularProgress } from "@material-ui/core";
import { lazy, Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes as Switch,
} from "react-router-dom";
import { getAuth } from "firebase/auth";
import { app } from "services/firebase";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(() => {
      auth.currentUser?.getIdToken().then((result) => {
        setUser(result);
      });
    });
  }, [auth, dispatch]);

  return (
    <Router>
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100vw",
              height: "100vh",
            }}
          >
            <CircularProgress color="#5b352c" />{" "}
          </div>
        }
      >
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
            element={user ? <OrdersAdmin /> : <Navigate to={-1} />}
          />
          <Route
            path="/meu-carrinho/pagamento"
            exact
            element={user ? <Payment /> : <Navigate to={-1} />}
          />
        </Switch>
      </Suspense>
    </Router>
  );
}
