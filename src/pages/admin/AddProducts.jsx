import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../../firebase";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [installmentPrice, setInstallmentPrice] = useState("");
  const [productType, setProductType] = useState("");
  const [platform, setPlatform] = useState("");
  const [typePc, setTypePc] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const updatedProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(updatedProducts);
    });

    return () => unsubscribe();
  }, []);

  const handleNameChange = (e) => setName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleOldPriceChange = (e) => setOldPrice(e.target.value);
  const handleInstallmentPriceChange = (e) =>
    setInstallmentPrice(e.target.value);
  const handleProductTypeChange = (e) => setProductType(e.target.value);
  const handlePlatformChange = (e) => setPlatform(e.target.value);
  const handleTypePcChange = (e) => setTypePc(e.target.value);
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
        oldPrice: Number(oldPrice),
        installmentPrice: Number(installmentPrice),
        productType,
        platform,
        typePc,
        imageUrl,
      });

      alert("Produto adicionado com sucesso!");
      setName("");
      setDescription("");
      setPrice("");
      setOldPrice("");
      setInstallmentPrice("");
      setProductType("");
      setPlatform("");
      setTypePc("");
      setImage(null);
      setImageUrl(null);
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao adicionar o produto, verifique o log.");
    }
    setUploading(false);
  };

  const handleUpdateProduct = async (productId, newValues) => {
    try {
      const productRef = doc(db, "products", productId);
      await updateDoc(productRef, newValues);
      alert("Produto atualizado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao atualizar o produto, verifique o log.");
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const productRef = doc(db, "products", productId);
      await deleteDoc(productRef);
      alert("Produto excluído com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao excluir o produto, verifique o log.");
    }
  };

  const handleAddField = async (productId, field, value) => {
    try {
      const productRef = doc(db, "products", productId);
      await updateDoc(productRef, { [field]: value });
      alert("Campo adicionado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao adicionar o campo, verifique o log.");
    }
  };

  useEffect(() => {
    const updateExistingProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      querySnapshot.forEach(async (doc) => {
        const productData = doc.data();
        if (!productData.productType) {
          await updateDoc(doc.ref, { productType: "" });
        }
        if (!productData.platform) {
          await updateDoc(doc.ref, { platform: "" });
        }
        if (!productData.typePc) {
          await updateDoc(doc.ref, { typePc: "" });
        }
      });
    };

    updateExistingProducts();
  }, []);

  return (
    <div>
      <h2>Add Products</h2>
      {auth.currentUser.uid === process.env.REACT_APP_USER_ADMIN_UID ? (
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
            <label htmlFor="OldPrice">Old price:</label>
            <input
              type="number"
              id="OldPrice"
              value={oldPrice}
              onChange={handleOldPriceChange}
            />
          </div>
          <div>
            <label htmlFor="InstallmentPrice">Installment Price:</label>
            <input
              type="number"
              id="InstallmentPrice"
              value={installmentPrice}
              onChange={handleInstallmentPriceChange}
            />
          </div>
          <div>
            <label htmlFor="productType">Tipo de Produto:</label>
            <input
              type="text"
              id="productType"
              value={productType}
              onChange={handleProductTypeChange}
            />
          </div>
          <div>
            <label htmlFor="platform">Plataforma:</label>
            <input
              type="text"
              id="platform"
              value={platform}
              onChange={handlePlatformChange}
            />
          </div>
          <div>
            <label htmlFor="typePc">Tipo de PC:</label>
            <input
              type="text"
              id="typePc"
              value={typePc}
              onChange={handleTypePcChange}
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
          {image && (
            <div className="imgProduct">
              <img src={imageUrl} alt="Product preview" />
            </div>
          )}
          <button type="submit" disabled={uploading}>
            {uploading ? "Enviando..." : "Adicionar Produto"}
          </button>
        </form>
      ) : (
        console.log(`Sem acesso para ${auth.currentUser}`)
      )}

      <h2>Products List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <p>
              <img src={product.imageUrl} alt="Product" />
            </p>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            <p>Old Price: {product.oldPrice}</p>
            <p>Installment Price: {product.installmentPrice}</p>
            <p>Product Type: {product.productType}</p>
            <p>Platform: {product.platform}</p>
            <p>Type of PC: {product.typePc}</p>

            <button
              onClick={() =>
                handleUpdateProduct(product.id, { name: "Updated Product" })
              }
            >
              Update Name
            </button>
            <button onClick={() => handleDeleteProduct(product.id)}>
              Delete
            </button>
            <button
              onClick={() =>
                handleAddField(product.id, "newField", "New Value")
              }
            >
              Add Field
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
