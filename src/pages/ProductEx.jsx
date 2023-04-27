import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useFirestore } from "reactfire";
import { auth } from "../firebase";


function ProductEx({ name, price, desc, foto, id }) {
  const firestore = useFirestore();

  function AddToCart() {
    const user = auth.currentUser;
    if (!user) {
      // usuário não autenticado
      return;
    }

    const produto = {
      id,
      name,
      price,
      desc,
      foto
    };

    const cartRef = doc(firestore, "carrinho", user.uid);
    updateDoc(cartRef, {
      produtos: arrayUnion(produto)
    });
  }

  return (
    <div>
      <h2>{name}</h2>
      <p>{price}</p>
      <p>{desc}</p>
      <img src={foto} alt={name} />
      <button onClick={AddToCart}>Adicionar ao carrinho</button>
    </div>
  );
}
export default ProductEx