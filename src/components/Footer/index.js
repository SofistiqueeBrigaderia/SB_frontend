import { Link } from "react-router-dom";
import "./style.css";

export default function Footer({ home }) {
  const date = new Date();
  const socialMediaData = [
    { id: 1, icon: "fa-brands fa-whatsapp", location: "/" },
    {
      id: 2,
      icon: "fab fa-instagram",
      location: "https://www.instagram.com/sofistiqueebrigaderia/",
    },
    {
      id: 3,
      icon: "fa-brands fa-facebook",
      location: "https://www.facebook.com/sofistiqueebrigaderia",
    },
  ];

  return (
    <footer
      id="contato"
      style={home ? { marginTop: 0 } : { marginTop: "35px" }}
      className="footerContainer"
    >
      {home ? (
        <>
          <ul>
            <li className="socialMediaLine">
              {socialMediaData.map((item) => {
                return (
                  <a
                    href={item.location}
                    target="_blank"
                    rel="noreferrer"
                    key={item.id}
                  >
                    <i className={item.icon}></i>
                  </a>
                );
              })}
            </li>
            <li className="linkLine">
              <Link className="internalLink" to="/termos">
                Política de privacidade
              </Link>
              &nbsp;&nbsp;|
              <Link className="internalLink" to="/">
                Eventos
              </Link>
            </li>
          </ul>
          <p>Sofistiquée Brigaderia | © {date.getFullYear()}</p>
        </>
      ) : (
        <p>Sofistiquée Brigaderia | © {date.getFullYear()}</p>
      )}
    </footer>
  );
}
