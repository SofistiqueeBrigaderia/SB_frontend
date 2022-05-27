import BarMenu from 'components/BarMenu';
import SectionTitle from 'components/SectionTitle';
import SquaredButton from 'components/SquaredButton';
import Footer from 'components/Footer';
import { useEffect, useState } from 'react';
import CustomModal from 'components/Modal';
import './style.css';
import api from 'services/api';
import { CircularProgress } from '@material-ui/core';

export default function Products() {
  const [activeTab, setActiveTab] = useState(1);
  const [open, setOpen] = useState(false);
  const [brigadeiroData, setBrigadeiroData] = useState([]);
  const [currentItem, setCurrentItem] = useState([
    {
      title: '',
      img: null,
      description: '',
      price: null,
    },
  ]);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    api
      .get('https://sofistiqueebrigaderia.herokuapp.com/produtos/all')
      .then((data) => {
        setBrigadeiroData(data.data.content);
      })
      .catch((err) => {
        throw err;
      });

    return () => {};
  }, [brigadeiroData]);

  return (
    <>
      <CustomModal open={open} handleClose={handleClose} currentProps={currentItem} />

      <BarMenu bgColor="#fff" home={false} />
      <main className="productsContainer">
        <SectionTitle title="Nossos produtos" />
        <div className="productsTab">
          <button className={activeTab === 1 && `active`} onClick={() => setActiveTab(1)}>
            Brigadeiros
          </button>
          <button className={activeTab === 2 && `active`} onClick={() => setActiveTab(2)}>
            Datas comemorativas
          </button>
          <button className={activeTab === 3 && `active`} onClick={() => setActiveTab(3)}>
            Outros produtos
          </button>
        </div>
        <section className="productsBrigadeiroSection">
          {activeTab == 1 && (
            <>
              <SectionTitle title="Brigadeiros" />

              {brigadeiroData ? (
                <div className="productsCardContainer">
                  {brigadeiroData.map((item) => {
                    return (
                      <div key={item.id} className="productsCard">
                        <img src={item.foto} alt={item.nome} />
                        <SectionTitle title={item.nome} />
                        <div className="productsCardInfo">
                          <p className="productsCardDescription">{item.descricao}</p>
                          <p className="productsCardPrice">
                            {item.preco.toLocaleString('pt-br', {
                              style: 'currency',
                              currency: 'BRL',
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
                                title: item.nome,
                                img: item.foto,
                                description: item.descricao,
                                price: item.preco,
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
          {activeTab == 2 && (
            <>
              <SectionTitle title="Datas comemorativas" />
              <div>
                {brigadeiroData.map((item) => {
                  return <div key={item.id}>Worked 2</div>;
                })}
              </div>
            </>
          )}
          {activeTab == 3 && (
            <>
              <SectionTitle title="Presentes" />
              {brigadeiroData.map((item) => {
                return <div key={item.id}>Worked 3</div>;
              })}
            </>
          )}
        </section>
      </main>
      <Footer home={false} />
    </>
  );
}
