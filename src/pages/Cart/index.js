import React, { useEffect, useState } from "react";
import BarMenu from "components/BarMenu";
import SquaredButton from "components/SquaredButton";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "components/Footer";
import { cartActions } from "store/CartSlice";
import api from "services/api";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";

const Cart = () => {
  const data = useSelector((state) => state.cart);
  const [colorText, setColorText] = useState("rgba(91, 53, 44, 1)");
  const currentUser = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();
  const [severity, setSeverity] = useState();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  var orderNumber = new Uint32Array(1);

  const handleClose = (_event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentUser.authCurrentUser) {
      data.cartItems.map((item) => {
        return api
          .post(`/pedidos`, {
            numPedido: window.crypto.getRandomValues(orderNumber)[0],
            quantidade: data?.totalQuantity,
            precoTotal: data?.totalAmount,
            produto: { id: item.id },
            usuario: { id: currentUser?.authCurrentUser.id },
          })
          .then(() => {
            navigate(`${location.pathname}/pagamento`, {
              state: { totalAmount: data?.totalAmount },
            });
            dispatch(cartActions.clearCart());
          })
          .catch((err) => {
            console.log(err.message);
            setSeverity("error");
            setMessage("Desculpe. Algo deu errado.");
            setOpen(true);
          });
      });
    } else {
      setSeverity("error");
      setMessage("Você precisa realizar o login antes.");
      setOpen(true);
      setTimeout(() => {
        navigate("/login");
      }, 1200);
    }
  };

  useEffect(() => {
    if (window.innerWidth < 1060) {
      setColorText("#fff");
    } else if (window.innerWidth > 1060) {
      setColorText("rgba(91, 53, 44, 1)");
    }
    // eslint-disable-next-line
  }, [window.innerWidth]);

  return (
    <div className="mainCartContainer">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={1200}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity} className="alert">
          {message}
        </Alert>
      </Snackbar>

      <BarMenu bgColor="#fff" colorText={colorText} home={false} />

      <main className="cartContainer">
        <h2 style={{ marginBottom: "21px" }}>Minha sacola</h2>

        {data?.cartItems.length !== 0 ? (
          <form onSubmit={handleSubmit} className="cartCardContainer">
            {data?.cartItems.map((item, index) => {
              return (
                <div key={index} className="cartCard">
                  <div className="cartCardImage">
                    <img src={item.foto} alt={item.nome} />
                  </div>

                  <div
                    style={{ gridArea: "b", gridRow: 1, gridColum: 1 }}
                    className="cartCardInfo"
                  >
                    <h2 className="cartCardHeading">{item.nome}</h2>
                    <p className="cartCardQuantity">
                      Quantidade: {item.quantidadePedida}
                    </p>
                    <p className="cartCardPrice">
                      Un:&nbsp;
                      <strong>
                        {item.preco &&
                          item.preco.toLocaleString("pt-br", {
                            style: "currency",
                            currency: "BRL",
                          })}
                      </strong>
                    </p>
                    <p className="cartCardPrice">
                      Total:&nbsp;
                      <strong>
                        {(item.preco * item.quantidadePedida).toLocaleString(
                          "pt-br",
                          {
                            style: "currency",
                            currency: "BRL",
                          }
                        )}
                      </strong>
                    </p>
                  </div>

                  <div className="cardDetails">
                    <div className="cartInputContainer">
                      <input
                        type="number"
                        className="cartInput"
                        minLength={5}
                        onChange={(e) =>
                          dispatch(
                            cartActions.updateQuantity({
                              indexItem: item.id,
                              value: e.target.value,
                            })
                          )
                        }
                        defaultValue={item.quantidadePedida}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          dispatch(cartActions.decrementQuantity(item.id))
                        }
                        className="cartInputButtons"
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          dispatch(cartActions.increaseQuantity(item.id))
                        }
                        className="cartInputButtons"
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="cardDetailsTrashButton"
                      type="button"
                      onClick={() => {
                        dispatch(cartActions.removeItem(item.id));
                      }}
                    >
                      <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="totalContainer">
              <h3>Total da compra</h3>
              <p>
                {data.totalAmount &&
                  data.totalAmount.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
              </p>
            </div>

            <div className="cartSubmitButtonContainer">
              <SquaredButton
                customClass="cartSubmitButton"
                type="submit"
                title="Finalizar compra"
              />
            </div>
          </form>
        ) : (
          <p style={{ minHeight: "65.7vh" }}>
            Nada para ver aqui ainda. Faça sua{" "}
            <strong>
              <Link to="/produtos">compra</Link>
            </strong>
            .
          </p>
        )}
      </main>
      <Footer home={false} />
    </div>
  );
};

export default Cart;
