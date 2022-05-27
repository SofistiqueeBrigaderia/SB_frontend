import React, { useState } from 'react';
import BarMenu from 'components/BarMenu';
import dummy from 'assets/images/rounded-1.png';
import './style.css';
import SquaredButton from 'components/SquaredButton';

const Cart = () => {
  const [count, setCount] = useState(1);

  const decrementCount = () => {
    if (count > 0) setCount(count - 1);
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('hello');
  };

  return (
    <>
      <BarMenu bgColor="#fff" home={false} />
      <main className="cartContainer">
        <h2>Minha sacola</h2>

        <form onSubmit={handleSubmit} className="cartCardContainer">
          <div className="cartCard">
            <div className="cartCardImage">
              <img src={dummy} alt="alt" />
            </div>

            <div style={{ gridArea: 'b', gridRow: 1, gridColum: 1 }} className="cartCardInfo">
              <h2 className="cartCardHeading">Brigadeiro tradicional</h2>
              <p className="cartCardQuantity">Quantidade: 1</p>
              <p className="cartCardPrice">
                Un: <strong>R$120,00</strong>
              </p>
              <p className="cartCardPrice">
                Total: <strong>R$120,00</strong>
              </p>
            </div>

            <div className="cardDetails">
              <div className="cartInputContainer">
                <input
                  type="number"
                  value={count}
                  onChange={(event) => {
                    const value = Number(event.target.value);
                    setCount(value);
                  }}
                  className="cartInput"
                />
                <button type="button" onClick={decrementCount} className="cartInputButtons">
                  -
                </button>
                <button type="button" onClick={incrementCount} className="cartInputButtons">
                  +
                </button>
              </div>
              <button className="cardDetailsTrashButton" type="button">
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
            </div>
          </div>

          <div className="totalContainer">
            <h3>Total da compra</h3>
            <p>R$ 120,00</p>
          </div>

          <div className="cartSubmitButtonContainer">
            <SquaredButton customClass="cartSubmitButton" type="submit" title="Finalizar compra" />
          </div>
        </form>
      </main>
    </>
  );
};

export default Cart;
