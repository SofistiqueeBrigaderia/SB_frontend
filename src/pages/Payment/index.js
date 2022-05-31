import qrCde from "assets/utils/qr_code.jpeg";
import BarMenu from "components/BarMenu";
import Footer from "components/Footer";
import React from "react";

import "./style.css";

const Payment = () => {
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
