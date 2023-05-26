import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import ShortHeader from "../components/ShortHeader";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleEmailSet = (event) => {
    setEmail(event.target.value);
  };

  const handleResetPassword = (event) => {
    event.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Email de redefinição de senha enviado com sucesso
        alert("E-mail de redefinição de senha enviado com sucesso!");
      })
      .catch((error) => {
        // Ocorreu um erro ao enviar o e-mail de redefinição de senha
        console.error("Erro ao conectar: ", error);
        setError("Endereço de email incorreto");
      });
  };

  return (
    <>
      <ShortHeader />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h1 style={{ textAlign: "center", lineHeight: "26px" }}>
          Redefinir Senha
        </h1>
        <div style={{ flexDirection: "column" }}>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onSubmit={handleResetPassword}
          >
            <label
              style={{
                textAlign: "center",
                lineHeight: "20px",
                marginTop: "2rem",
              }}
            >
              {" "}
              Enviar email de redefinição de senha{" "}
            </label>
            <input
              className=""
              placeholder="email para receber link"
              type="email"
              onChange={handleEmailSet}
              value={email}
            />
            <label>
              <button
                className="btn"
                style={{ borderRadius: "5px" }}
                type="submit"
              >
                {" "}
                Enviar{" "}
              </button>
            </label>
            {error && <span className="error">{error}</span>}
          </form>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;