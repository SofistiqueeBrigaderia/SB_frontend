import BarMenu from "components/BarMenu";
import Footer from "components/Footer";
import React, { useState } from "react";
import api from "services/api";
import { app } from "services/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "./style.css";
import { useNavigate } from "react-router-dom";

const Registration = () => {
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
  const navigate = useNavigate();

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
      .catch((err) => {
        console.log(err);
      });

    const createUser = async () => {
      await createUserWithEmailAndPassword(authentication, email, senha)
        .then((response) => {
          console.log({ response });
          navigate("/");
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
  };

  return (
    <>
      <BarMenu bgColor="#D8A35D" home={true} />
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
