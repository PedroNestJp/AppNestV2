import React from "react";
import { auth} from "../../firebase";
import AddProduct from "./AddProducts";

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
      {auth.currentUser.uid === process.env.REACT_APP_USER_ADMIN ? (
        <AddProduct />
      ) : (
        "Sem Acesso"
      )}
    </div>
  );
}

export default AdminPage;
