import BarMenu from 'components/BarMenu';
import SectionTitle from 'components/SectionTitle';
import roundedOne from 'assets/images/rounded-1.png';
import roundedTwo from 'assets/images/rounded-2.png';
import SquaredButton from 'components/SquaredButton';
import RoundedFrame from 'components/RoundedFrame';
import Footer from 'components/Footer';
import { useState } from 'react';
import CustomModal from 'components/Modal';
import './style.css';

export default function Products() {
  const [activeTab, setActiveTab] = useState(1);
  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState([
    {
      title: '',
      img: null,
      description: '',
      price: null,
    },
  ]);
  const handleClose = () => setOpen(false);

  const brigadeiroData = [
    {
      id: 1,
      title: 'Brigadeiro tradicional',
      img: roundedOne,
      description: 'Lorem orem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 120.0,
    },
    {
      id: 2,
      title: 'Brigadeiro de morango',
      img: roundedTwo,
      description: 'Lorem orem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 120.0,
    },
    {
      id: 3,
      title: 'Brigadeiro de morango',
      img: roundedTwo,
      description: 'Lorem orem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 120.0,
    },
    {
      id: 4,
      title: 'Brigadeiro de morango',
      img: roundedTwo,
      description: 'Lorem orem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 120.0,
    },
    {
      id: 5,
      title: 'Brigadeiro de morango',
      img: roundedTwo,
      description: 'Lorem orem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 120.0,
    },
    {
      id: 6,
      title: 'Brigadeiro de morango',
      img: roundedTwo,
      description: 'Lorem orem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 120.0,
    },
    {
      id: 7,
      title: 'Brigadeiro de morango',
      img: roundedTwo,
      description: 'Lorem orem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 120.0,
    },
    {
      id: 8,
      title: 'Brigadeiro de morango',
      img: roundedTwo,
      description: 'Lorem orem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 120.0,
    },
    {
      id: 9,
      title: 'Brigadeiro de morango',
      img: roundedTwo,
      description: 'Lorem orem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 120.0,
    },
    {
      id: 10,
      title: 'Brigadeiro de morango',
      img: roundedTwo,
      description: 'Lorem orem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 120.0,
    },
    {
      id: 11,
      title: 'Brigadeiro de morango',
      img: roundedTwo,
      description: 'Lorem orem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 120.0,
    },
    {
      id: 12,
      title: 'Brigadeiro de morango',
      img: roundedTwo,
      description: 'Lorem orem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 120.0,
    },
  ];

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
              <div className="productsCardContainer">
                {brigadeiroData.map((item) => {
                  return (
                    <div key={item.id} className="productsCard">
                      <RoundedFrame src={item.img} alt={item.name} />
                      <SectionTitle title={item.title} />
                      <div className="productsCardInfo">
                        <p className="productsCardDescription">{item.description}</p>
                        <p className="productsCardParcels">2x de R${item.price / 2},00</p>
                        <p className="productsCardPrice">R${item.price},00</p>
                      </div>
                      <SquaredButton
                        title="Eu quero"
                        location="/"
                        onClick={() => {
                          setOpen(true);
                          setCurrentItem(
                            currentItem?.map(() => ({
                              title: item.title,
                              img: item.img,
                              description: item.description,
                              price: item.price,
                            }))
                          );
                        }}
                      />
                    </div>
                  );
                })}
              </div>
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
