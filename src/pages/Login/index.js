import { Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";
import BarMenu from "components/BarMenu";
import Footer from "components/Footer";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { app } from "services/firebase";
import "./style.css";

const Login = () => {
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();
  const [severity, setSeverity] = useState();
  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, senha)
      .then(() => {
        setSeverity("success");
        setMessage("Você foi logado com sucesso!");
        auth.currentUser.getIdToken().then((result) => {
          window.sessionStorage.setItem("Auth Token", result);
        });
        setOpen(true);
        setTimeout(() => {
          navigate(-1);
        }, 900);
      })
      .catch((error) => {
        setSeverity("error");
        setMessage(error.message);
        setOpen(true);
      });
  };

  return (
    <div className="loginContainer">
      <BarMenu home={true} />

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={900}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity} className="alert">
          {message}
        </Alert>
      </Snackbar>

      <main className="login-bg">
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
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
            <p className="login-txt">Esqueci a senha</p>
            <button type="submit" className="login-botao">
              ENTRAR
            </button>
          </form>
          <p className="login-txt">
            Ainda não tem conta?
            <Link to="/cadastro"> Cadastre-se aqui.</Link>
          </p>
        </div>
      </main>
      <Footer home={true} />
    </div>
  );
};

export default Login;
