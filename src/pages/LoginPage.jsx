import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../pages/contexts/AuthProvider";
import "../styles/Login.css";
import HeaderShort from "../components/ShortHeader";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, login, logout, loginWithPopup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  async function loginComGoogless (event) {
    event.preventDefault();
    try {
      await loginWithPopup();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
    <HeaderShort/>
      {user ? (
        <div>
          <h1> Você Já está logado </h1>
          <h2>
            <p>
              {" "}
              Deseja fazer login com
              <Link onClick={logout} to="/login" style={{ color: "#f00" }}>
                {" "}
                outra conta
              </Link>{" "}
              ou voltar para a
              <Link to="/" style={{ color: "#f00" }}>
                {" "}
                tela inicial
              </Link>
              ?
            </p>
          </h2>
        </div>
      ) : (
        <>
          <div className="main-container">
            <form onSubmit={handleSubmit}>
              <div id="loginScTitle" className="title">
                {" "}
                FAZER LOGIN{" "}
              </div>
              {error ? (
                <div style={{ color: "red" }}>
                  {" "}
                  {console.log(error)}
                  Os dados fornecidos não estão corretos ou você ainda não
                  possui uma conta
                </div>
              ) : null}
              <section className="inputsLogin">
                <input
                  className="email"
                  placeholder="E- mail, CPF ou CNPJ"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete={email}
                  aria-label="Digite seu email"
                  required
                />
                <input
                  className="senha"
                  id="loginScInput"
                  placeholder="Senha"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="password"
                  aria-label="Digite sua senha"
                  required
                />
              </section>
              <button className="enter enter-text" type="submit">
                ENTRAR
              </button>
            </form>
            <span className="text-forgotPassword">Esqueceu a senha?</span>
            <span className="lineLogin"></span>
            <span className="text-loginSocial">
              {" "}
              QUERO ACESSAR COM MINHAS REDES SOCIAIS{" "}
            </span>

            <button className="login-fb">
              <span className="fb-text"> Facebook </span>
            </button>

            <button onClick={loginComGoogless} className="login-gg gg-text">
              Google
            </button>

            <div className="loginOrLine">
              <span className="line1"></span>
              <span className="textOr">ou</span>
              <span className="line2"></span>
            </div>
            <p>
              Ainda não tem uma conta? faça o seu{" "}
              <Link to={"/signup"} style={{ color: "#f00" }}>
                {" "}
                Cadastro{" "}
              </Link>{" "}
            </p>
            <Link to={"/signup"}>
              <button className="register register-text">CADASTRE-SE</button>
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default LoginPage;
