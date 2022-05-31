import Slider, { SliderItem } from "components/Slider";
import BarMenu from "components/BarMenu";
import roundedOne from "assets/images/rounded-1.png";
import roundedTwo from "assets/images/rounded-2.png";
import roundedThree from "assets/images/rounded-3.png";
import slideOne from "assets/images/slide-1.jpg";
import slideTwo from "assets/images/slide-2.jpg";
import slideThree from "assets/images/slide-3.jpg";
import retangularLogo from "assets/logos/retangular-white.svg";
import aboutUs from "assets/images/aboutus.jpg";
import RoundedCard from "components/RoundedCard";
import SquaredLink from "components/SquaredLink";
import Footer from "components/Footer";
import { useEffect, useState } from "react";
import "./style.css";

export default function Home() {
  const [color, setColor] = useState();

  const favoriteData = [
    {
      id: 1,
      title: "Brigadeiro gourmet tradicional",
      img: roundedOne,
      description: "Brigadeiro gourmet tradicional",
    },
    {
      id: 2,
      title: "Brigadeiro gourmet de morango",
      img: roundedTwo,
      description: "Brigadeiro gourmet de morango",
    },
    {
      id: 3,
      title: "Brigadeiro gourmet de Ninho com Nutella",
      img: roundedThree,
      description: "Brigadeiro gourmet de  Ninho com Nutella",
    },
  ];

  const SliderOneLegend = () => {
    return (
      <div
        style={{
          backgroundColor: "rgba(91, 53, 44, 0.3)",
          width: "400px",
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <img
          className="sliderLegendImage"
          src={retangularLogo}
          alt="Sofistiquée Brigaderia"
        />
        <p className="sliderLegendText">
          Diversos sabores do melhor brigadeiro belga feito com ingredientes{" "}
          <br /> de altíssima qualidade.
        </p>
      </div>
    );
  };

  const sliderData = [
    {
      id: 1,
      img: slideOne,
      legend: <SliderOneLegend />,
    },
    {
      id: 2,
      img: slideTwo,
      legend: <SliderOneLegend />,
    },
    {
      id: 3,
      img: slideThree,
      legend: <SliderOneLegend />,
    },
  ];

  const feedbackData = [
    {
      id: 1,
      commenter: "@emporiomartinez",
      comment:
        "“O melhor que já provei. Parabéns  Valeria. Te conheci de longa data, sei o quanto é caprichosa e atenta aos detalhes. Por isso não tem concorrência. Bjs”",
    },
    {
      id: 2,
      commenter: "@val.diva22",
      comment:
        "“Já experimentei é maravilhoso diferente e muito elegante! Eu indico vai ser um sucesso!”",
    },
    {
      id: 3,
      commenter: "@kamilamuniz_eventos",
      comment:
        '“Indico para as noivas que querem fugir de padrão "docinhos finos" em seu casamento. Os brigadeiros, além de deliciosos, agradam todos os gostos.”',
    },
    {
      id: 4,
      commenter: "@renata.ferracioli",
      comment: "“Um mais gostoso que o outro!!! trabalho impecável!!!”",
    },
  ];

  const setBgColor = () => {
    if (window.scrollY === 0) {
      setColor("transparent");
    } else if (window.scrollY !== 0) {
      setColor("rgba(91, 53, 44, 1)");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", setBgColor);
    return () => {
      window.removeEventListener("scroll", setBgColor);
    };
  }, []);

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
                  <div className="sliderLegend">{item.legend}</div>
                </div>
              </SliderItem>
            );
          })}
        </Slider>
      </section>

      <section className="favoriteSectionContainer">
        <h2 style={{ marginTop: "21px" }}>Queridinhos dos clientes</h2>
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
        <div style={{ width: "250px" }}>
          <SquaredLink location="/produtos" title="NOSSO CARDÁPIO COMPLETO" />
        </div>
      </section>

      <section className="aboutUsSectionContainer">
        <img
          src={aboutUs}
          className="aboutUsImage"
          alt="Sofistiquée Brigaderia"
        />

        <aside>
          <h2 style={{ marginTop: "21px" }}>Um pouco sobre nós</h2>

          <div className="textContainer">
            <p>
              A Sofistiquée Brigaderia é especializada na fabricação e venda de
              brigadeiros gourmet. Trabalha tanto com encomendas de brigadeiros
              para festas e consumo próprio, como também com o fornecimento de
              brigadeiros para restaurantes.
            </p>
          </div>
          <div style={{ width: "100px" }}>
            <SquaredLink location="/sobre-nos" title="SAIBA MAIS" />
          </div>
        </aside>
      </section>

      <section className="feedbackSectionContainer">
        <h2 className="feedbackTitle">
          O que nossos clientes dizem sobre nós?
        </h2>
        <div>
          <Slider height="340px">
            {feedbackData.map((item) => {
              return (
                <SliderItem
                  width="80px"
                  flexDirection="column"
                  style={{
                    marginBottom: "104.79px",
                    marginTop: "104.79px",
                  }}
                  key={item.id}
                >
                  <div className="feedbackImage">
                    <i className="fa-solid fa-user-large"></i>
                  </div>
                  <h3>{item.commenter}</h3>
                  <div className="feedbackCommentContainer">
                    <p className="feedbackComment">{item.comment}</p>
                  </div>
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
