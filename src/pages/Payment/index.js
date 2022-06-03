import axios from "axios";
import BarMenu from "components/BarMenu";
import Footer from "components/Footer";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "store/CartSlice";

import "./style.css";

const Payment = () => {
  const dispatch = useDispatch();
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const cart = useSelector((state) => state.cart);
  const [colorText, setColorText] = useState("rgba(91, 53, 44, 1)");

  const BASE_URL = "https://gerarqrcodepix.com.br/api/v1?";
  const memorizedConfig = useMemo(
    () => ({
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Credentials": true,
      },
    }),
    []
  );

  console.log({ cart });

  useEffect(() => {
    if (window.innerWidth < 1060) {
      setColorText("#fff");
    } else if (window.innerWidth > 1060) {
      setColorText("rgba(91, 53, 44, 1)");
    }

    axios
      .get(
        BASE_URL +
          "nome=Ana&cidade=Cotia&chave=f5e64adb-e5cc-4df4-8c47-a02f0bbebaa1&valor=0.1&saida=qr&tamanho=256",
        memorizedConfig
      )
      .then((response) => {
        console.log(response);
        //dispatch(cartActions.clearCart());
      })
      .catch((error) => console.log(error.message));
  }, [memorizedConfig]);

  return (
    <>
      <BarMenu bgColor="#fff" colorText={colorText} home={false} />
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
