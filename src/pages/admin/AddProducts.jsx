import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function AddProducts() {
  // estado para armazenar informações do produto
  const [imageUrl, setImageUrl] = useState(null);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: ""
  });

  // manipulador de eventos para enviar informações do produto ao Firestore
  const handleSubmit = async (event) => {
    event.preventDefault();
    const productRef = collection(db, "products");
    const newProduct = await addDoc(productRef, product);
    console.log("Novo produto adicionado com o ID: ", newProduct.id);
  };

  // manipulador de eventos para carregar arquivo de imagem do produto
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const storageRef = ref(storage, `images/${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      imageUrl  = await getDownloadURL(storageRef);
      console.log("Arquivo de imagem carregado com sucesso!");
          // Clear form fields
        setImageUrl(null);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="main">
      <div>AddProducts</div>

      <form onSubmit={handleSubmit}>
        <h2>Cadastrar Produto</h2>
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />
        <br />
        <label htmlFor="price">Preço:</label>
        <input
          type="number"
          id="price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />
        <br />
        <label htmlFor="description">Descrição:</label>
        <textarea
          id="description"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
        ></textarea>
        <br />
        <label htmlFor="image">Imagem:</label>
        <input 
          type="file" 
          id="image"
          accept="image/*"
          onChange={handleImageUpload} />
        {imageUrl && (
          <div className="imgProducts">
            <img src={imageUrl} alt="Product preview" />
          </div>
        )}
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default AddProducts;
