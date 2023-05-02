import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function Crudproducts() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: ""
  });
  const [updatingProduct, setUdatingProducts] = useState(null);
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

  const handleAddImage = async (e) => {
    try {
      // Upload image to Firebase Storage
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);
    } catch (error) {
      console.error(error);
      alert("🦓 Ocorreu um erro ao adicionar o produto, verifique o log.");
      setUploading(false);
    }
    alert("😎 Produto Adicionado com sucesso ✅");
  }

  const handleAddProduct = async (e) => {
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
      console.log(docRef);
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

  useEffect(() => {
    const getProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsFromFirestore = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setProducts(productsFromFirestore);
    };
    getProducts();
  }, []);

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    await updateDoc(
      collection(db, "products"),
      updatingProduct.id,
      updatingProduct
    );
    const updatedproducts = products.map((product) => {
      if (product.id === updatingProduct.id) {
        return updatingProduct;
      }
      return product;
    });
    setProducts(updatedproducts);
    setUdatingProducts(null);
  };

  const handleDeleteProduct = async (id) => {
    await deleteDoc(collection(db, "products"), id);
    const filteredproducts = products.filter((product) => product.id !== id);
    setProducts(filteredproducts);
  };

  return (
    <div>
      <form onSubmit={handleAddProduct}>
        {" "}
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
        />
        <input
          type="price"
          placeholder="Digite a Senha"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        <div>
          <label htmlFor="image">Imagem:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit">Add product</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>description</th>
            <th>price</th>
            <th>price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>
                <button onClick={() => setUdatingProducts(product)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteProduct(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {updatingProduct && (
        <form onSubmit={handleUpdateProduct}>
          <input
            type="text"
            placeholder="Name"
            value={updatingProduct.name}
            onChange={(e) =>
              setUdatingProducts({ ...updatingProduct, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="description"
            value={updatingProduct.description}
            onChange={(e) =>
              setUdatingProducts({
                ...updatingProduct,
                description: e.target.value,
              })
            }
          />
          <input
            type="price"
            placeholder="price"
            value={updatingProduct.price}
            onChange={(e) =>
              setUdatingProducts({ ...updatingProduct, price: e.target.value })
            }
          />
          <button type="submit">Save Changes</button>
        </form>
      )}
          <div>
      <h2>Add Products</h2>
      {auth.currentUser.uid === process.env.REACT_APP_USER_ADMIN ? 
      <form onSubmit={handleAddProduct}>
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
    </div>
    
  );
}

export default Crudproducts;
