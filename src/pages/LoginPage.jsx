import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";

function LoginPage() {
  // estado para armazenar informações do usuário logado
  const [user, setUser] = useState(null);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  // manipulador de eventos para fazer login do usuário com email e senha
  const handleSignIn = async (event) => {
    event.preventDefault();
    const email = Email;
    const password = Password;
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredentials.user);
      alert("Usuário logado com sucesso!");
      console.log("Usuário logado com sucesso!");
    } catch (error) {
      console.error(error.message);
    }
  };

  // manipulador de eventos para fazer logout do usuário
  const handleSignOut = async (event) => {
    event.preventDefault();
    try {
      await signOut(auth);
      setUser(null);
      alert("Usuário deslogado com sucesso!");
      console.log("Usuário deslogado com sucesso!");
    } catch (error) {
      console.error(error.message);
    }
  };

  // efeito para monitorar o estado de autenticação do usuário
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        console.log("Usuário autenticado:", user.email);
      } else {
        setUser(null);
        console.log("Usuário deslogado.");
      }
    });
    return unsubscribe;
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <p>Usuário autenticado como {user.email}.</p>
          <button onClick={handleSignOut}>Sair</button>
        </div>
      ) : (
        <div>
          <h2>Fazer Login</h2>
          <form onSubmit={handleSignIn}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={Email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <br />
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={Password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <br />
            <button type="submit">Entrar</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
