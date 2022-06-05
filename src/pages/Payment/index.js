import axios from "axios";
import BarMenu from "components/BarMenu";
import Footer from "components/Footer";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { CircularProgress } from "@material-ui/core";
import "./style.css";

const Payment = () => {
  const [colorText, setColorText] = useState("rgba(91, 53, 44, 1)");
  const [brcode, setBrcode] = useState();
  const location = useLocation();
  const totalAmount = location.state?.totalAmount;

  const BASE_URL = "https://gerarqrcodepix.com.br/api/v1?";
  const memorizedConfig = useMemo(
    () => ({
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "image/png",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Credentials": true,
      },
    }),
    // eslint-disable-next-line
    []
  );

  useEffect(() => {
    if (window.innerWidth < 1060) {
      setColorText("#fff");
    } else if (window.innerWidth > 1060) {
      setColorText("rgba(91, 53, 44, 1)");
    }

    axios
      .get(
        BASE_URL +
          `nome=Valeria Neves&cidade=Osasco&chave=${process.env.REACT_APP_PIX_KEY}&valor=${totalAmount}.1&saida=br`,
        memorizedConfig
      )
      .then((response) => {
        setBrcode(response.data.brcode);
      })
      .catch((error) => console.log(error.message));
    // eslint-disable-next-line
  }, [memorizedConfig]);

  return (
    <div className="mainPaymentContainer" style={{}}>
      <BarMenu bgColor="#fff" colorText={colorText} home={false} />
      <main className="paymentContainer">
        {brcode ? (
          <div className="qrCodeContainer">
            <QRCodeSVG value={brcode} size="250px" />
            <div style={{ textAlign: "center" }}>
              <p className="brCode">{brcode}</p>
            </div>
            <p>Obrigada pela preferência!</p>
            <strong style={{ textAlign: "center" }}>
              Copie ou escaneie o QR code acima para efetuar o pagamento.
            </strong>
          </div>
        ) : (
          <CircularProgress color="#5b352c" />
        )}
      </main>
      <Footer home={false} />
    </div>
  );
};

export default Payment;
