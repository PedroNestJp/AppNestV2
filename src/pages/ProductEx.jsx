import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

function ProductEx({ nome, preco, descricao, foto, id }) {

  const adicionarAoCarrinho = async () => {
    const user = auth.currentUser;
    if (!user) {
      return; // early return
    }

    const product = { id, nome, preco, descricao };
    const cartRef = doc(db, "carrinho", user.uid);

    try {
      await updateDoc((db, product)); //await updateDoc
    } catch (error) {
      console.error(error); //log error to console
    }
  }

  return (
    <div>
      <h2>{nome}</h2>
      <p>{preco}</p>
      <p>{descricao}</p>
      <img src={''} alt={nome} />
      <button onClick={adicionarAoCarrinho}>Adicionar ao carrinho</button>
    </div>
  );
}

export default ProductEx;
