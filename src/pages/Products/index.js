import BarMenu from "components/BarMenu";
import SectionTitle from "components/SectionTitle";
import SquaredButton from "components/SquaredButton";
import Footer from "components/Footer";
import { useEffect, useState } from "react";
import CustomDialog from "components/CustomDialog";
import "./style.css";
import api from "services/api";
import { CircularProgress } from "@material-ui/core";

export default function Products() {
  const [activeTab, setActiveTab] = useState(1);
  const [open, setOpen] = useState(false);
  const [brigadeiroData, setBrigadeiroData] = useState([]);
  const [colorText, setColorText] = useState("rgba(91, 53, 44, 1)");
  const datasComemorativasData = [{}];
  const outrosProdutosData = [{}];

  const [currentItem, setCurrentItem] = useState([
    {
      nome: "",
      foto: null,
      descricao: "",
      preco: null,
      qtd_minima: null,
    },
  ]);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (window.innerWidth < 1060) {
      setColorText("#fff");
    } else if (window.innerWidth > 1060) {
      setColorText("rgba(91, 53, 44, 1)");
    }

    api
      .get("/produtos/all")
      .then((data) => {
        setBrigadeiroData(data.data.content);
      })
      .catch((err) => {
        throw err;
      });
    // eslint-disable-next-line
  }, [window.innerWidth]);

  return (
    <>
      <CustomDialog
        open={open}
        handleClose={handleClose}
        currentProps={currentItem}
        onButtonClick={handleClose}
      />
      <div className="'mainProductsContainer'">
        <BarMenu bgColor="#fff" colorText={colorText} home={false} />
        <main className="productsContainer">
          <SectionTitle title="Nossos produtos" />
          <div className="productsTab">
            <button
              className={activeTab === 1 ? `active` : null}
              onClick={() => setActiveTab(1)}
            >
              Brigadeiros
            </button>
            <button
              className={activeTab === 2 ? `active` : null}
              onClick={() => setActiveTab(2)}
            >
              Datas comemorativas
            </button>
            <button
              className={activeTab === 3 ? `active` : null}
              onClick={() => setActiveTab(3)}
            >
              Outros produtos
            </button>
          </div>
          <section className="productsBrigadeiroSection">
            {activeTab === 1 && (
              <>
                <SectionTitle title="Brigadeiros" />

                {brigadeiroData.length !== 0 ? (
                  <div className="productsCardContainer">
                    {brigadeiroData.map((item) => {
                      return (
                        <div key={item.id} className="productsCard">
                          <img src={item.foto} alt={item.nome} />
                          <SectionTitle title={item.nome} />
                          <div className="productsCardInfo">
                            <p className="productsCardDescription">
                              {item.descricao}
                            </p>
                            <p className="productsCardPrice">
                              {item.preco.toLocaleString("pt-br", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </p>
                          </div>
                          <SquaredButton
                            title="Eu quero"
                            location="/"
                            onClick={() => {
                              setOpen(true);
                              setCurrentItem(
                                currentItem?.map(() => ({
                                  id: item.id,
                                  nome: item.nome,
                                  foto: item.foto,
                                  descricao: item.descricao,
                                  preco: item.preco,
                                  qtd_minima: item.qtd_minima,
                                }))
                              );
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <CircularProgress color="#5b352c" />
                )}
              </>
            )}
            {activeTab === 2 && (
              <>
                <SectionTitle title="Datas comemorativas" />
                {datasComemorativasData.map((index) => {
                  return <p key={index}>Nada para ver aqui ainda.</p>;
                })}
              </>
            )}
            {activeTab === 3 && (
              <>
                <SectionTitle title="Presentes" />
                {outrosProdutosData.map((index) => {
                  return <p key={index}>Nada para ver aqui ainda.</p>;
                })}
              </>
            )}
          </section>
        </main>
        <Footer home={false} />
      </div>
    </>
  );
}
