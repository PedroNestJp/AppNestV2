import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, storage } from "../../firebase";
import { useState } from "react";
import "../../styles/AddProducts.css";
import ShortHeader from "../../components/ShortHeader";
import LoadingOverlay from "../../components/LoadingOverlay";

function AddImage() {
  const [imageUrl, setImageUrl] = useState(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0])); // Cria uma URL temporária para a prévia da imagem
  };

  const handleAddImage = async () => {
    try {
      // Upload image to Firebase Storage
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);
      const downloadURL = await getDownloadURL(imageRef);
      setImageUrl(downloadURL);
      setMessage("Produto adicionado com sucesso! 🎉");
    } catch (error) {
      console.error(error);
      setMessage(`Ocorreu um erro ao adicionar o produto: ${error} 😓`);
    }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    await handleAddImage();
  };

  return (
    <div className="AddProductsMain">
      <ShortHeader />
      <div className="AddProductsContainer">
        <h2>Add Imagem a cloud</h2>
        {message && <p>{message}</p>}
        {auth.currentUser & auth.currentUser.uid === process.env.REACT_APP_USER_ADMIN_UID ? (
          <form className="formAddImagem" onSubmit={handleSubmit}>
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
              <div className="imgProduct">
                <img src={imageUrl} alt="Product preview" />
              </div>
            )}
            <button className="button-buy" type="submit" disabled={uploading}>
              {uploading ? <LoadingOverlay/> : "Adicionar Produto"}
            </button>
          </form>
        ) : (
          console.log(`Sem acesso para ${auth.currentUser}`)
        )}
      </div>
    </div>

  );
}

export default AddImage;
