import React from "react";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";

// async function createCartCollectionIfNotExists() {
//   const cartRef = collection(db, "carts");

//   //Verifica se a coleção já existe
//   const cartSnapshot = await getDocs(cartRef);
//   if (!cartSnapshot.empty) {
//     return console.log(" A coleção já existe, não é necessário fazer nada");
//   }

//   //A coleção não existe, cria-a e adiciona um documento de exemplo
//   const exampleItem = {
//     name: "Exemplo de produto",
//     price: 10,
//     quantity: 1,
//   };
//   await setDoc(doc(db, "cart", "example-item"), exampleItem);

//   console.log("Coleção 'cart' criada com sucesso.");
// }

// createCartCollectionIfNotExists();

function AdminPage() {
  return (
    <div className="main">
      <h1>Admin Page</h1>
      {auth.currentUser.uid === process.env.REACT_APP_USER_ADMIN_UID ? (
        <ul>
          <li >
            <Link to="/addProducts" style={{color:'#f00'}}> Add Products </Link>
          </li>
          <li>
            <Link to="/CRUDProducts" style={{color:'#f00'}}> Crud Users </Link>
          </li>
          <li>
            <Link to="/addImage" style={{color:'#f00'}}> Add Image </Link>
          </li>
        </ul>
      ) : (
        "Sem Acesso"
      )}
    </div>
  );
}

export default AdminPage;
