import React, { useEffect, useState } from "react";
import BarMenu from "components/BarMenu";
import SquaredButton from "components/SquaredButton";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "components/Footer";
import { cartActions } from "store/CartSlice";

const Cart = () => {
  const [count, setCount] = useState(5);
  const data = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const cart = useSelector((state) => state.cart);
  const [colorText, setColorText] = useState("rgba(91, 53, 44, 1)");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const decrementCount = (id) => {
    if (count > 5) setCount(count - 1);
    dispatch(cartActions.updateQuantity(id, count));
  };

  const incrementCount = (id) => {
    if (count <= 100) setCount(count + 1);
    dispatch(cartActions.updateQuantity(id, count));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`${location.pathname}/pagamento`);
  };

  console.log({ data }, { cart });

  useEffect(() => {
    dispatch(cartActions.getCartTotal());

    if (window.innerWidth < 1060) {
      setColorText("#fff");
    } else if (window.innerWidth > 1060) {
      setColorText("rgba(91, 53, 44, 1)");
    }
  }, []);

  return (
    <div>
      <BarMenu bgColor="#fff" colorText={colorText} home={false} />
      <main className="cartContainer">
        <h2 style={{ marginBottom: "21px" }}>Minha sacola</h2>

        {data.length !== 0 ? (
          <form onSubmit={handleSubmit} className="cartCardContainer">
            {data.map((item, index) => {
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
                      Un:
                      <strong>
                        {item.preco &&
                          item.preco.toLocaleString("pt-br", {
                            style: "currency",
                            currency: "BRL",
                          })}
                      </strong>
                    </p>
                    <p className="cartCardPrice">
                      Total:
                      <strong>{item.preco * item.quantidadePedida}</strong>
                    </p>
                  </div>

                  <div className="cardDetails">
                    <div className="cartInputContainer">
                      <input
                        type="number"
                        className="cartInput"
                        minLength={5}
                        onChange={(e) => setCount(Number(e.target.value))}
                        value={count}
                      />
                      <button
                        type="button"
                        onClick={() => decrementCount(item.id)}
                        className="cartInputButtons"
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => incrementCount(item.id)}
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
                {totalAmount &&
                  totalAmount.toLocaleString("pt-br", {
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
