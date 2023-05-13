import { useState } from "react";
import { auth } from "../firebase";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleEmailSet = (event) => {
    setEmail(event.target.value);
  };

  const handleResetPassword = (event) => {
    event.preventDefault();

    auth
      .sendPasswordResetEmail(email)
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
    <div>
      <div>Redefinir Senha</div>
      <form onSubmit={handleResetPassword}>
        <label>
          <input type="email" onChange={handleEmailSet} value={email} />
        </label>
        <button type="submit"> Enviar email de redefinição de senha </button>
        {error && <span className="error">{error}</span>}
      </form>
    </div>
  );
}

export default ResetPassword;
