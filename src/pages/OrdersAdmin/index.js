import { CircularProgress } from "@material-ui/core";
import BarMenu from "components/BarMenu";
import Footer from "components/Footer";
import { useEffect, useState } from "react";
import api from "services/api";
import "./style.css";

function OrdersAdmin() {
  const [colorText, setColorText] = useState("rgba(91, 53, 44, 1)");
  const [pedidosData, setPedidosData] = useState([]);

  useEffect(() => {
    if (window.innerWidth < 1060) {
      setColorText("#fff");
    } else if (window.innerWidth > 1060) {
      setColorText("rgba(91, 53, 44, 1)");
    }
    const apiCall = async () => {
      await api
        .get("pedidos/all")
        .then((response) => {
          setPedidosData(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    apiCall();

    // eslint-disable-next-line
  }, [window.innerWidth]);

  return (
    <>
      <BarMenu bgColor="#fff" colorText={colorText} home={false} />
      <main className="orderContainer">
        <h2>Pedidos recebidos</h2>

        {pedidosData ? (
          <div
            style={{
              display: "grid",
              gap: "35px",
              gridTemplateColumns: "1fr 1fr 1fr",
            }}
          >
            {pedidosData.map((pedidosData) => {
              return (
                <div key={pedidosData.id} className="orderCard">
                  <div className="orderCardInfo">
                    <h2 className="orderCardHeading">
                      Pedido Nº {pedidosData?.numPedido}
                    </h2>
                    <p className="orderCardDate">Data: {pedidosData?.data}</p>
                    <div className="orderCardUser">
                      <p>
                        <strong>Produtos:</strong>
                      </p>
                    </div>
                    <div className="orderCardProducts">
                      <div className="orderCardDiv">
                        <p className="width-30">{pedidosData.quantidade}</p>
                        <p>{pedidosData?.produto.nome}</p>
                      </div>
                      <p className="orderCardPrice">
                        <strong>
                          {pedidosData?.produto.preco &&
                            pedidosData?.produto.preco.toLocaleString("pt-br", {
                              style: "currency",
                              currency: "BRL",
                            })}
                        </strong>
                      </p>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        whiteSpace: "nowrap",
                        fontSize: "18px",
                      }}
                    >
                      <strong className="width-30">Valor total:</strong>
                      <p className="orderCardTotalPrice">
                        {pedidosData?.precoTotal &&
                          pedidosData.precoTotal.toLocaleString("pt-br", {
                            style: "currency",
                            currency: "BRL",
                          })}
                      </p>
                    </div>

                    <hr />
                    <div className="orderCardUser">
                      <p>
                        <strong>Cliente:</strong>
                      </p>
                      <p>{pedidosData?.usuario.nome}</p>
                      <p>{pedidosData?.usuario.email}</p>
                      <p>{pedidosData?.usuario.telefone}</p>
                    </div>
                    <hr />
                    <div className="orderCardUser">
                      <p>
                        <strong>Endereço:</strong>
                      </p>
                      <p>{pedidosData?.usuario.endereco}</p>
                      <p>{pedidosData?.usuario.complemento}</p>
                      <p>{pedidosData?.usuario.cidade}</p>
                      <p>{pedidosData?.usuario.estado}</p>
                      <p>{pedidosData?.usuario.cep}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <CircularProgress color="#5b352c" />
        )}
      </main>
      <Footer home={false} />
    </>
  );
}

export default OrdersAdmin;
