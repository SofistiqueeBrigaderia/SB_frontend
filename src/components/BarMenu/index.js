import { Link } from 'react-router-dom';
import logo from 'assets/logos/rounded-white.svg';
import logoBrown from 'assets/logos/rounded-brown.svg';
import { useState } from 'react';
import './style.css';

export default function BarMenu({ bgColor, home }) {
  const [isActive, setIsActive] = useState(false);
  const [classActive, setClassActive] = useState();

  const data = [
    { id: 1, title: 'Página Inicial', location: '/' },
    { id: 2, title: 'Nossos produtos', location: '/produtos' },
    { id: 3, title: 'Sobre nós', location: '/sobre-nos' },
    { id: 4, title: 'Contato', location: '/' },
    {
      socialMedia: [
        {
          id: 1,
          icon: 'fa-brands fa-whatsapp',
          location:
            'https://api.whatsapp.com/send?phone=55119543051110&text=Olá, Valeria! Tudo bem? Gostaria de fazer uma encomenda.',
        },
        {
          id: 2,
          icon: 'fab fa-instagram',
          location: 'https://www.instagram.com/sofistiqueebrigaderia/',
        },
        { id: 3, icon: 'fa-brands fa-facebook', location: '/' },
      ],
    },
  ];

  return (
    <>
      <header style={{ backgroundColor: `${bgColor}` }}>
        <Link to="/">
          {home ? (
            <img height="50px" width="100%" src={logo} alt="Sofistiquée Brigaderia" />
          ) : (
            <img height="50px" width="100%" src={logoBrown} alt="Sofistiquée Brigaderia" />
          )}
        </Link>
        <div className={`menu ${classActive}`}>
          <div className="btn">
            <i
              onClick={() => {
                setIsActive(() => !isActive);
                setClassActive('');
              }}
              style={{ color: '#fff' }}
              className="fas fa-times close-btn"
            ></i>
          </div>
          {data.slice(0, -1).map((item) => {
            return (
              <Link
                style={home ? { color: '#fff' } : { color: 'rgba(91, 53, 44, 1)' }}
                key={item.id}
                to={item.location}
              >
                {item.title}
              </Link>
            );
          })}
          <Link
            className="cart"
            to="/carrinho"
            style={home ? { color: '#fff' } : { color: 'rgba(91, 53, 44, 1)' }}
          >
            <i className="fa-solid fa-cart-shopping"></i>
          </Link>

          <div className="socialMediaContainer">
            {data.at(-1).socialMedia.map((item) => {
              return (
                <a
                  className="socialMediaLink"
                  href={item.location}
                  target="_blank"
                  rel="noreferrer"
                  key={item.id}
                >
                  <i className={item.icon}></i>
                </a>
              );
            })}
          </div>
        </div>
        <div className="containerButton">
          <Link
            className="btn"
            to="/produtos"
            style={home ? { color: '#fff' } : { color: 'rgba(91, 53, 44, 1)' }}
          >
            <i className="fa-solid fa-cart-shopping"></i>
          </Link>
          <div className="btn" style={home ? { color: '#fff' } : { color: 'rgba(91, 53, 44, 1)' }}>
            <i
              onClick={() => {
                setIsActive(() => !isActive);
                setClassActive('active');
              }}
              className="fas fa-bars menu-btn "
            ></i>
          </div>
        </div>
      </header>
    </>
  );
}
