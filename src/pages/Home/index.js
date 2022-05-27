import Slider, { SliderItem } from 'components/Slider';
import BarMenu from 'components/BarMenu';
import roundedOne from 'assets/images/rounded-1.png';
import roundedTwo from 'assets/images/rounded-2.png';
import roundedThree from 'assets/images/rounded-3.png';
import slideOne from 'assets/images/slide-1.jpg';
import slideTwo from 'assets/images/slide-2.jpg';
import slideThree from 'assets/images/slide-3.jpg';
import retangularLogo from 'assets/logos/retangular-white.svg';
import aboutUs from 'assets/images/aboutus.jpg';
import SectionTitle from 'components/SectionTitle';
import RoundedCard from 'components/RoundedCard';
import SquaredLink from 'components/SquaredLink';
import './style.css';
import Footer from 'components/Footer';
import { useEffect, useState } from 'react';

export default function Home() {
  const [color, setColor] = useState();

  const favoriteData = [
    {
      id: 1,
      title: 'Brigadeiro tradicional',
      img: roundedOne,
      description: 'Brigadeiro tradicional',
    },
    {
      id: 2,
      title: 'Brigadeiro de morango',
      img: roundedTwo,
      description: 'Brigadeiro de morango',
    },
    {
      id: 3,
      title: 'Brigadeiro de leite ninho com nutella',
      img: roundedThree,
      description: 'Brigadeiro de leite ninho com nutella',
    },
  ];

  const sliderData = [
    {
      id: 1,
      img: slideOne,
    },
    {
      id: 2,
      img: slideTwo,
    },
    {
      id: 3,
      img: slideThree,
    },
  ];

  const feedbackData = [
    {
      id: 1,
      commenter: '@emporiomartinez',
      comment:
        '“O melhor que já provei. Parabéns  Valeria. Te conheci de longa data, sei o quanto é caprichosa e atenta aos detalhes. Por isso não tem concorrência. Bjs”',
    },
    {
      id: 2,
      commenter: '@val.diva22',
      comment:
        '“Já experimentei é maravilhoso diferente e muito elegante! Eu indico vai ser um sucesso!”',
    },
    {
      id: 3,
      commenter: '@kamilamuniz_eventos',
      comment:
        '“Indico para as noivas que querem fugir de padrão "docinhos finos" em seu casamento. Os brigadeiros, além de deliciosos, agradam todos os gostos.”',
    },
    {
      id: 4,
      commenter: '@renata.ferracioli',
      comment: '“Um mais gostoso que o outro!!! trabalho impecável!!!”',
    },
  ];

  const setBgColor = () => {
    if (window.scrollY === 0) {
      setColor('transparent');
    } else if (window.scrollY !== 0) {
      setColor('rgba(91, 53, 44, 1)');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', setBgColor);
    return () => {
      window.removeEventListener('scroll', setBgColor);
    };
  }, [scrollY]);

  return (
    <>
      <BarMenu bgColor={color} home={true} />
      <section className="sliderSectionContainer">
        <Slider>
          {sliderData.map((item) => {
            return (
              <SliderItem key={item.id} height="100vh">
                <div
                  className="sliderImage"
                  style={{
                    backgroundImage: `url(${item.img}`,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img height="250px" src={retangularLogo} alt="Sofistiquée Brigaderia" />
                    <p
                      style={{
                        color: '#fff',

                        fontSize: '24px',
                      }}
                    >
                      Diversos sabores do melhor brigadeiro belga feito com ingredientes <br /> de
                      altíssima qualidade.
                    </p>
                  </div>
                </div>
              </SliderItem>
            );
          })}
        </Slider>
      </section>

      <section className="favoriteSectionContainer">
        <SectionTitle title="Queridinhos dos clientes" />
        <div className="cardContainer">
          {favoriteData.map((item) => {
            return (
              <RoundedCard
                key={item.id}
                img={item.img}
                description={item.description}
                title={item.title}
              />
            );
          })}
        </div>
        <SquaredLink location="/" title="NOSSO CARDÁPIO COMPLETO" />
      </section>

      <section className="aboutUsSectionContainer">
        <img src={aboutUs} className="aboutUsImage" alt="Sofistiquée Brigaderia" />

        <aside>
          <SectionTitle title="Um pouco sobre nós" />

          <div className="textContainer">
            <p>
              A Sofistiquée Brigaderia é especializada na fabricação e venda de brigadeiros gourmet.
              Trabalha tanto com encomendas de brigadeiros para festas e consumo próprio, como
              também com o fornecimento de brigadeiros para restaurantes.
            </p>
          </div>
          <SquaredLink style={{ width: '100%' }} location="/sobre-nos" title="SAIBA MAIS" />
        </aside>
      </section>

      <section className="feedbackSectionContainer">
        <SectionTitle title="O que nossos clientes dizem sobre nós?" />
        <div>
          <Slider height="298px">
            {feedbackData.map((item) => {
              return (
                <SliderItem
                  height="100%"
                  width="80px"
                  flexDirection="column"
                  style={{
                    marginBottom: '104.79px',
                    marginTop: '104.79px',
                  }}
                  key={item.id}
                >
                  <div
                    style={{
                      width: '98px',
                      height: '94px',
                      borderRadius: '100%',
                      backgroundColor: 'red',
                    }}
                  ></div>
                  <h3>{item.commenter}</h3>
                  <p>Lorem ipsum LLorem Lorem</p>
                </SliderItem>
              );
            })}
          </Slider>
        </div>
      </section>
      <Footer home={true} />
    </>
  );
}
