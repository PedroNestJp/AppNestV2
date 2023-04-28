import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../../firebase";

function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  const handleNameChange = (e) => setName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      // Upload image to Firebase Storage
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      // Add new product to Firestore
      const docRef = await addDoc(collection(db, "products"), {
        name,
        description,
        price: Number(price),
        imageUrl,
      });
      console.log(docRef)
    } catch (error) {
      console.error(error);
      alert("🦓 Ocorreu um erro ao adicionar o produto, verifique o log.");
      setUploading(false);
    }
    alert("😎 Produto Adicionado com sucesso ✅");
    
    // Clear form fields
    setName("");
    setDescription("");
    setPrice("");
    setImage(null);
    setImageUrl(null);
  };
  
  return (
    <div>
      <h2>Add Products</h2>
      {auth.currentUser.uid === process.env.REACT_APPN_USER_ADMI ? 
      <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nome do produto:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          />
      </div>
      <div>
        <label htmlFor="description">Descrição:</label>
        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <div>
        <label htmlFor="price">Preço:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={handlePriceChange}
        />
      </div>
      <div>
        <label htmlFor="image">Imagem:</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      {imageUrl && (
        <div className="imgProducts" >
          <img   src={imageUrl}  alt="Product preview" />
        </div>
      )}
      <button type="submit" disabled={uploading}>
      {uploading ? "Enviando..." : "Adicionar Produto"}
      </button>
     
    </form> : 'Sem Acesso'}
      
    </div>
  );
}
export default AddProduct;
