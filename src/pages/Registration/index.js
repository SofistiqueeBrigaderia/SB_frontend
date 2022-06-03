import BarMenu from "components/BarMenu";
import Footer from "components/Footer";
import React, { useEffect, useState } from "react";
import api from "services/api";
import { app } from "services/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";

const Registration = () => {
  const [colorText, setColorText] = useState("rgba(91, 53, 44, 1)");
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [nome, setNome] = useState();
  const [telefone, setTelefone] = useState();
  const [cep, setCEP] = useState();
  const [endereco, setEndereco] = useState();
  const [numero, setNumero] = useState();
  const [complemento, setComplemento] = useState();
  const [cidade, setCidade] = useState();
  const [termos, setTermos] = useState(false);
  const [estado, setEstado] = useState();
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

  const handleSubmit = (event) => {
    event.preventDefault();

    const authentication = getAuth(app);

    api
      .post("/usuarios", {
        nome: nome,
        email: email,
        telefone: telefone,
        endereco: endereco,
        numero: numero,
        complemento: complemento,
        cidade: cidade,
        estado: estado,
        cep: cep,
        termos: termos,
      })
      .then(() => {
        createUser();
      })
      .catch((error) => {
        setSeverity("error");
        setMessage(error.message);
        setOpen(true);
      });

    const createUser = async () => {
      await createUserWithEmailAndPassword(authentication, email, senha)
        .then((response) => {
          setOpen(true);
          setSeverity("success");
          setMessage("Você foi logado com sucesso!");
          navigate("/");
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
  };

  useEffect(() => {
    if (window.innerWidth < 1060) {
      setColorText("#fff");
    } else if (window.innerWidth > 1060) {
      setColorText("rgba(91, 53, 44, 1)");
    }
  }, []);

  return (
    <>
      <BarMenu bgColor="#D8A35D" colorText={colorText} home={true} />
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
      <div className="cadastro-bg">
        <div className="cadastro-box">
          <h1 className="cadastro-title">Faça seu cadastro</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                className="cadastro-input div0"
                id="nome"
                name="nome"
                placeholder="NOME"
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                className="cadastro-input div0"
                id="email"
                name="email"
                placeholder="EMAIL"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                className="cadastro-input div0"
                id="telefone"
                name="telefone"
                placeholder="TELEFONE"
                onChange={(e) => setTelefone(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                className="cadastro-input div0"
                id="cep"
                name="cep"
                placeholder="CEP"
                onChange={(e) => setCEP(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                className="cadastro-input div0"
                id="endereco"
                name="endereco"
                placeholder="ENDEREÇO"
                onChange={(e) => setEndereco(e.target.value)}
              />
            </div>
            <div className="input-m">
              <input
                type="text"
                className="cadastro-input div1"
                id="numero"
                name="numero"
                placeholder="NÚMERO"
                onChange={(e) => setNumero(e.target.value)}
              />

              <input
                type="text"
                className="cadastro-input div2 input-m"
                id="complemento"
                name="complemento"
                placeholder="COMPLEMENTO"
                onChange={(e) => setComplemento(e.target.value)}
              />
            </div>
            <div className="input-m">
              <input
                type="text"
                className="cadastro-input div2"
                id="cidade"
                name="cidade"
                placeholder="CIDADE"
                onChange={(e) => setCidade(e.target.value)}
              />

              <input
                type="text"
                className="cadastro-input div1"
                id="estado"
                name="estado"
                placeholder="ESTADO"
                onChange={(e) => setEstado(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                className="cadastro-input div0"
                id="senha"
                name="senha"
                placeholder="SENHA"
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                className="cadastro-input div0"
                id="confSenha"
                name="confSenha"
                placeholder="CONFIRMAR SENHA"
              />
            </div>

            <div className="cadastro-checkbox">
              <input
                className="cadastro-txt"
                type="checkbox"
                defaultChecked={false}
                id="termos"
                onChange={(e) => setTermos(e.target.checked)}
              />
              <label className="cadastro-txt">
                Aceito os termos e condições
              </label>
            </div>

            <button type="submit" className="cadastro-botao">
              CADASTRAR
            </button>
          </form>
        </div>
      </div>
      <Footer home={true} />
    </>
  );
};

export default Registration;
