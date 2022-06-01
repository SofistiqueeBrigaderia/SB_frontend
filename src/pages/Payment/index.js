import qrCde from "assets/utils/qr_code.jpeg";
import BarMenu from "components/BarMenu";
import Footer from "components/Footer";
import React, { useEffect, useState } from "react";

import "./style.css";

const Payment = () => {
  const [count, setCount] = useState(5);
  const [array, setArray] = useState({
    totalQuantity: 2,
    totalAmount: 35,
    cardItem: [
      {
        id: 1,
        nome: "Brigadeiro gourmet tradicional",
        preco: 3.5,
        qtd_minima: 5,
        quantidadePedida: 5,
        valorTotal: 17.5,
      },
      {
        id: 4,
        nome: "Brigadeiro gourmet Ninho com Nutella",
        preco: 3.5,
        qtd_minima: 5,
        quantidadePedida: 5,
        valorTotal: 17.5,
      },
    ],
  });

  const removeItem = (id) => {
    const indexItem = id;
    const existingItem = array.cardItem.find((item) => item.id === id);

    if (existingItem) {
      for (var i = array.cardItem.length - 1; i >= 0; --i) {
        if (array.cardItem[i].id === indexItem) {
          array.cardItem.splice(i, 1);
        }
      }
    }
  };

  const updateCount = (id, value) => {
    setArray(
      array.map((item) => ({
        ...item,
        quantidadePedida: item.id === id ? value : item.quantidadePedida,
        valorTotal: item.id === id ? value * item.preco : item.preco,
      }))
    );
  };

  const getCartTotal = () => {
    array.cardItem.reduce((prevItem, currentItem) => {
    const amount = array.cardItem.quantidadePedida
    });
  };

  getCartTotal();

  return (
    <>
      <BarMenu bgColor="#fff" home={false} />
      <main style={{ height: "80vh" }} className="cartContainer">
        <i
          style={{
            border: "3px solid  #1D5E2A",
            borderRadius: "100%",
            width: "150px",
            height: "150px",
            color: "#1D5E2A",
            fontSize: "80px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="fa fa-check"
          aria-hidden="true"
        ></i>
        <p>Pagamento confirmado!</p>
      </main>
      <Footer home={false} />
    </>
  );
};

export default Payment;
