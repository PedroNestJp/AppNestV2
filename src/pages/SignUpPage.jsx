import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthProvider";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import "../styles/Register.css";
import ShortHeader from "../components/ShortHeader";

// const SignUpPage = () => {
// const [fullName, setFullName] = useState("");
// const [cpf, setCpf] = useState("");
// const [dateOfBirth, setBirthDate] = useState("");
// const [email, setEmail] = useState("");
// const [password, setPassword] = useState("");
// const [cellPhone, setCell] = useState("");
// const [confirmPassword, setConfirmPassword] = useState("");
// const [acceptTermOne, setAcceptTermOne] = useState(Boolean);
// const [acceptTermTwo, setAcceptTermTwo] = useState(Boolean);
// const [error, setError] = useState("");
// const { signup } = useAuth();
// const navigate = useNavigate();
// const user = auth.currentUser;

// useEffect(() => {
//   if (user) {
//     const userRef = doc(db, "users", user.uid);
//     const userData = {
//       email: user.email,
//       name: user.displayName,
//       cellPhone: user.phoneNumber,
//       photoURL: user.photoURL,
//       createdAt: new Date(),
//     };
//     setDoc(userRef, userData, { merge: true })
//       .then(() => {
//         console.log("User data saved to Firestore");
//       })
//       .catch((error) => {
//         console.error("Error saving user data to Firestore: ", error);
//       });
//   }
// }, [user]);

// const handleSubmit = async (event) => {
//   event.preventDefault();
//   if (password !== confirmPassword) {
//     setError("Passwords do not match");
//     return;
//   }

//   const usersCollection = collection(db, "users");
//   try {
//     await addDoc(usersCollection, {
//       fullName,
//       cpf,
//       cellPhone,
//       email,
//       password,
//       dateOfBirth,
//       acceptTermOne,
//       acceptTermTwo,
//     });
//     alert("Usuário registrado com sucesso!");
//   } catch (error) {
//     console.error("Erro ao registrar usuário: ", error);
//     alert("Ocorreu um erro ao registrar o usuário: " + error.message);
//   }
//   try {
//     await signup(email, password, fullName, cpf, cellPhone);
//     navigate("/");
//   } catch (error) {
//     setError(error.message);
//     console.log("erro no segundo try");
//   }

//   return (
//     <form >
//       <h1>Sign up</h1>
//       {error && <div>{error}</div>}
//       <div>
//         <label>
//           Nome completo:
//           <input
//             type="text"
//             value={fullName}
//             onChange={(event) => setFullName(event.target.value)}
//           />
//         </label>
//         <label htmlFor="email">Email</label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={(event) => setEmail(event.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="password">Senha</label>
//         <input
//           type="password"
//           id="password"
//           value={password}
//           onChange={(event) => setPassword(event.target.value)}
//           required
//           pattern=".{6,}"
//           title="A senha precisa ter pelo menos 6 caracteres"
//         />
//       </div>
//       <div>
//         <label>Confirme a Senha</label>
//         <input
//           type="password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//         />
//       </div>
//       <button type="submit">Cadastrar</button>
//     </form>
//   );
// };

// export { SignUpPage };

const RegisterComponents = () => {
  const [fullName, setFullName] = useState("");
  const [cpf, setCpf] = useState("");
  const [dateOfBirth, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [cellPhone, setCellPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [typePerson, setTypePerson] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTermOne, setAcceptTermOne] = useState(Boolean);
  const [acceptTermTwo, setAcceptTermTwo] = useState(Boolean);
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const userData = {
        address: address,
        fullName: fullName,
        cpf: cpf,
        cellPhone: cellPhone,
        email: email,
        password: password,
        dateOfBirth: dateOfBirth,
        acceptTermOne: acceptTermOne,
        acceptTermTwo: acceptTermTwo,
        photoURL: user.photoURL,
        createdAt: new Date(),
      };
      setDoc(userRef, userData, { merge: true })
        .then(() => {
          console.log("User data saved to Firestore");
        })
        .catch((error) => {
          console.error("Error saving user data to Firestore: ", error);
        });
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const usersCollection = collection(db, "users");
    try {
      await addDoc(usersCollection, {
        address,
        fullName,
        cpf,
        cellPhone,
        email,
        password,
        dateOfBirth,
        acceptTermOne,
        acceptTermTwo,
      });
      alert("Usuário registrado com sucesso!");
    } catch (error) {
      console.error("Erro ao registrar usuário: ", error);
      alert("Ocorreu um erro ao registrar o usuário: " + error.message);
    }
    try {
      await signup(
        email,
        password,
        fullName,
        cpf,
        cellPhone,
        address,
        typePerson,
        dateOfBirth,
        acceptTermOne,
        acceptTermTwo
      );
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.log("erro no segundo try");
    }
  };

  return (
    <main className="main">
      <ShortHeader/>
      <form onSubmit={handleSubmit}>
        <div className="content">
          <h1 className="title"> CRIAR CONTA </h1>

          <div className="typePerson">
            <div className="physicalPerson"> PESSOA FÍSICA </div>
            <input
              className="circlePPerson"
              id="circlePPerson"
              type="radio"
              defaultChecked
              value={typePerson}
              onChange={(event) => setTypePerson(event.target.value)}
            />
            {/* <div className="legalPerson"> PESSOA JURÍDICA </div>
            <Link to='/'>
            <input
              className="circleLegalPerson"
              id="circleLegalPerson"
              type="radio"
            />
            </Link> */}
          </div>

          <section className="inputs">
            <input
              className="input-name inputsRegister"
              placeholder="Nome completo*:"
              type="text"
              name="fullName"
              id="fullName"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
            />
            <input
              className="input-cpf inputsRegister"
              placeholder="CPF*:"
              type="number"
              name="cpf"
              id="cpf"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}-[0-9]{2}"
              value={cpf}
              onChange={(event) => setCpf(event.target.value)}
            />
            <input
              className="input-birthDate inputsRegister"
              placeholder="Data de Nascimento*:"
              type="date"
              name="birthDate"
              id="input-birthDate"
              pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}"
              value={dateOfBirth}
              onChange={(event) => setBirthDate(event.target.value)}
            />
            <input
              className="input-tell inputsRegister"
              placeholder="cellPhone*:"
              type="number"
              name="Tell"
              id="input-tell"
              value={cellPhone}
              onChange={(event) => setCellPhone(event.target.value)}
            />
            <input
              className="input-email inputsRegister"
              placeholder="E-mail*:"
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              className="input-address inputsRegister"
              placeholder="address*:"
              type="text"
              name="address"
              id="address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
            <input
              className="input-password inputsRegister"
              placeholder="password*:"
              type="password"
              name="password"
              id="password"
              pattern=".{6,}"
              title="A senha precisa ter pelo menos 6 caracteres"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <input
              className="input-repeatPassword inputsRegister"
              placeholder="Repetir password*:"
              type="password"
              name="repeatPassword"
              id="repeatPassword"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
            <h3 className="required-field"> (*) Campos obrigatórios </h3>
          </section>
        </div>

        <div className="termsBtnRegister">
          <section className="terms">
            <div className="term">
              <input
                className="acceptTermsInput1"
                type="checkbox"
                value={acceptTermOne}
                onChange={(event) => setAcceptTermOne(event.target.value)}
                required
              />
              <h2 className="accept-terms-1">
                Quero receber ofertas e novidades por e-mail, SMS ou WhatsApp
              </h2>
            </div>
            <div className="term2">
              <input
                className="acceptTermsInput2"
                type="checkbox"
                value={acceptTermTwo}
                onChange={(event) => setAcceptTermTwo(event.target.value)}
                required
              />
              <h2 className="accept-terms-2">
                Li e estou de acordo com as políticas da empresa e políticas de
                privacidade.*
              </h2>
            </div>
          </section>

          <div className="btnCreateAccount">
            <button
              className="creat-account"
              type="submit"
              name="btnCreateAccount"
            >
              <span className="creat-account-text"> CRIAR CONTA </span>
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default RegisterComponents;
