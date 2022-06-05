import { Link } from "react-router-dom";
import logo from "assets/logos/rounded-white.svg";
import logoBrown from "assets/logos/rounded-brown.svg";
import { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "store/AuthSlice";
import api from "services/api";
import { getAuth } from "firebase/auth";
import { app } from "services/firebase";

export default function BarMenu({ bgColor, home, colorText }) {
  const [isActive, setIsActive] = useState(false);
  const [classActive, setClassActive] = useState();
  const [authToken, setAuthToken] = useState(null);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.authCurrentUser);
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const auth = getAuth(app);

  const data = [
    { id: 1, title: "Página Inicial", location: "/" },
    { id: 2, title: "Nossos produtos", location: "/produtos" },
    { id: 3, title: "Sobre nós", location: "/sobre-nos" },
    { id: 4, title: "Contato", location: "/#contato" },
    {
      id: 5,
      title: currentUser?.nome ? currentUser.nome : "Login",
      location: "/login",
    },
    {
      socialMedia: [
        {
          id: 1,
          icon: "fa-brands fa-whatsapp",
          location:
            "https://api.whatsapp.com/send?phone=55119543051110&text=Olá, Valeria! Tudo bem? Gostaria de fazer uma encomenda.",
        },
        {
          id: 2,
          icon: "fab fa-instagram",
          location: "https://www.instagram.com/sofistiqueebrigaderia/",
        },
        { id: 3, icon: "fa-brands fa-facebook", location: "/" },
      ],
    },
  ];

  useEffect(() => {
    auth.onAuthStateChanged(() => {
      auth.currentUser?.getIdToken().then((result) => {
        setAuthToken(result);
      });
    });

    if (currentUser.length === 0) {
      api
        .get(`/usuarios/email/${auth.currentUser?.email}`)
        .then((response) => {
          dispatch(
            authActions.getUser({
              authToken: authToken,
              authEmail: auth.currentUser?.email,
              authCurrentUser: response.data,
            })
          );
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <header style={{ backgroundColor: `${bgColor}` }}>
        <Link to="/">
          {home ? (
            <img
              height="50px"
              width="100%"
              src={logo}
              alt="Sofistiquée Brigaderia"
            />
          ) : (
            <img
              height="50px"
              width="100%"
              src={logoBrown}
              alt="Sofistiquée Brigaderia"
            />
          )}
        </Link>
        <div className={`menu ${classActive}`}>
          <div className="btn">
            <i
              onClick={() => {
                setIsActive(() => !isActive);
                setClassActive("");
              }}
              style={{ color: "#fff" }}
              className="fas fa-times close-btn"
            ></i>
          </div>
          {data.slice(0, -1).map((item) => {
            return (
              <Link
                style={home ? { color: "#fff" } : { color: `${colorText}` }}
                key={item.id}
                to={item.location}
              >
                {item.title}
              </Link>
            );
          })}
          <Link
            className={window.innerWidth < 1060 ? `cartMenuLink` : `cart`}
            to="/meu-carrinho"
            style={home ? { color: "#fff" } : { color: `${colorText}` }}
          >
            {window.innerWidth < 1060 ? (
              "Meu carrinho"
            ) : (
              <div
                style={{
                  display: "inline-flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <i className="fa-solid fa-cart-shopping"></i>
                <i className="fa fa-circle cartContainer" aria-hidden="true">
                  <p className="cartQuantity">{cartQuantity}</p>
                </i>
              </div>
            )}
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
            to="/meu-carrinho"
            style={home ? { color: "#fff" } : { color: "rgba(91, 53, 44, 1)" }}
          >
            <div
              style={{
                display: "inline-flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                zIndex: -1,
              }}
            >
              <i className="fa-solid fa-cart-shopping"></i>
              <i
                class="fa fa-circle"
                aria-hidden="true"
                style={{
                  position: "relative",
                  marginLeft: "1px",
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "20px",
                  color: "#d8a35d",
                }}
              >
                <p
                  style={{
                    fontFamily: "Source Sans Pro",
                    fontSize: "14px",
                    position: "absolute",
                    color: "#fff",
                  }}
                >
                  {cartQuantity}
                </p>
              </i>
            </div>
          </Link>
          <div
            className="btn"
            style={home ? { color: "#fff" } : { color: "rgba(91, 53, 44, 1)" }}
          >
            <i
              onClick={() => {
                setIsActive(() => !isActive);
                setClassActive("active");
              }}
              className="fas fa-bars menu-btn "
            ></i>
          </div>
        </div>
      </header>
    </>
  );
}
