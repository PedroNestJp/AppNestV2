import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import { useState } from "react";

function AddImage() {
  const [imageUrl, setImageUrl] = useState(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleImageChange = (e) => setImage(e.target.files[0]);

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
    <div>
      <h2>Add Products</h2>
      {message && <p>{message}</p>}{" "}
      <form onSubmit={handleSubmit}>
        {" "}
        <div>
          <label htmlFor="image">Imagem:</label>{" "}
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        {image && (
          <div className="imgProduct">
            <div src={imageUrl} alt="Product preview" />
          </div>
        )}
        <button type="submit" disabled={uploading}>
          {uploading ? "Enviando..." : "Adicionar Produto"}
        </button>
      </form>
    </div>
  );
}
export default AddImage