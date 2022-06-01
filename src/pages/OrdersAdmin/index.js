import BarMenu from "components/BarMenu";
import Footer from "components/Footer";
import "./style.css";

function OrdersAdmin() {
  return (
    <>
      <BarMenu bgColor="#fff" home={false} />
      <main className="orderContainer">
        <h2>Pedidos recebidos</h2>

        <div className="orderCard">
          <div className="orderCardInfo">
            <h2 className="orderCardHeading">Pedido Nº 001</h2>
            <p className="orderCardDate">Data: 29/05/2022</p>
            <div className="orderCardUser">
              <p>
                <strong>Produtos:</strong>
              </p>
            </div>
            <div className="orderCardProducts">
              <div className="orderCardDiv">
                <p className="width-30">5</p>
                <p>Brigadeiro gourmet tradicional</p>
              </div>
              <p className="orderCardPrice">
                <strong>R$ 17,50</strong>
              </p>
            </div>
            <div className="orderCardProducts">
              <div className="orderCardDiv">
                <p className="width-30">7</p>
                <p>Brigadeiro gourmet Ninho com Nutella</p>
              </div>
              <p className="orderCardPrice">
                <strong>R$ 924,50</strong>
              </p>
            </div>
            <p className="orderCardTotalPrice">Total: R$ 42,00</p>
            <hr />
            <div className="orderCardUser">
              <p>
                <strong>Cliente:</strong>
              </p>
              <p>Mariana Alves das Neves</p>
              <p>mariana@email.com</p>
              <p>(11) 98765-4321</p>
            </div>
            <hr />
            <div className="orderCardUser">
              <p>
                <strong>Endereço:</strong>
              </p>
              <p>Av. Carlos Capriotti, 123</p>
              <p>Prédio 1</p>
              <p>Centro</p>
              <p>Barueri</p>
              <p>SP</p>
              <p>06401-134</p>
            </div>
          </div>
        </div>
      </main>
      <Footer home={false} />
    </>
  );
}

export default OrdersAdmin;
