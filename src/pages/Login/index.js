import BarMenu from "components/BarMenu";
import Footer from "components/Footer";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <BarMenu home={true} />
      <div className="login-bg">
        <div className="login-box">
          <h1 className="login-title">Faça seu login</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                className="login-input"
                id="email"
                name="email"
                placeholder="EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                className="login-input"
                id="senha"
                name="senha"
                placeholder="SENHA"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p className="login-txt">Esqueci a senha</p>
            <div type="submit" className="login-botao">
              ENTRAR
            </div>
          </form>
          <p className="login-txt">
            Ainda não tem conta?
            <Link to="/cadastro"> Cadastre-se aqui.</Link>
          </p>
        </div>
      </div>
      <Footer home={true} />
    </div>
  );
};

export default Login;
