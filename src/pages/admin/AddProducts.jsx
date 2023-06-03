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
import { Link } from "react-router-dom";
import '../../styles/AddProducts.css'

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
  const [updateName, setUpdateName] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updatePrice, setUpdatePrice] = useState("");
  const [updateOldPrice, setUpdateOldPrice] = useState("");
  const [updateInstallmentPrice, setUpdateInstallmentPrice] = useState("");
  const [updateProductType, setUpdateProductType] = useState("");
  const [updatePlatform, setUpdatePlatform] = useState("");
  const [updateTypePc, setUpdateTypePc] = useState("");
  const [addField, setAddField] = useState('');
  const [addValue, setAddValue] = useState('');

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
  const handleUpdateNameChange = (e) => setUpdateName(e.target.value);
  const handleUpdateDescriptionChange = (e) =>
    setUpdateDescription(e.target.value);
  const handleUpdatePriceChange = (e) => setUpdatePrice(e.target.value);
  const handleUpdateOldPriceChange = (e) => setUpdateOldPrice(e.target.value);
  const handleUpdateInstallmentPriceChange = (e) =>
    setUpdateInstallmentPrice(e.target.value);
  const handleUpdateProductTypeChange = (e) =>
    setUpdateProductType(e.target.value);
  const handleUpdatePlatformChange = (e) => setUpdatePlatform(e.target.value);
  const handleUpdateTypePcChange = (e) => setUpdateTypePc(e.target.value);

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

      alert("😎 Produto Adicionado com sucesso ✅");
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

  const handleUpdateProduct = async (productId) => {
    try {
      const productRef = doc(db, "products", productId);
      await updateDoc(productRef, {
        name: updateName,
        description: updateDescription,
        price: Number(updatePrice),
        oldPrice: Number(updateOldPrice),
        installmentPrice: Number(updateInstallmentPrice),
        productType: updateProductType,
        platform: updatePlatform,
        typePc: updateTypePc,
      });
      alert("😎 Produto Adicionado com sucesso ✅")
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
    <div className="AddProductsMain">
      <div className="AddProductsContainer">
        <h2>Add Products</h2>
        {auth.currentUser.uid === process.env.REACT_APP_USER_ADMIN_UID ? (

          <form className="addProductsInputs" onSubmit={handleSubmit}>

            <label htmlFor="name">Nome do produto:</label>
            <input
              placeholder="Name"
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
            />

            <label htmlFor="description">Descrição:</label>
            <textarea
              placeholder="description"
              id="description"
              value={description}
              onChange={handleDescriptionChange}
            />

            <label htmlFor="price">Preço:</label>
            <input
              placeholder="price"
              type="number"
              id="price"
              value={price}
              onChange={handlePriceChange}
            />

            <label htmlFor="OldPrice">Old price:</label>
            <input
              placeholder="old price"
              type="number"
              id="OldPrice"
              value={oldPrice}
              onChange={handleOldPriceChange}
            />

            <label htmlFor="InstallmentPrice">Installment Price:</label>
            <input
              placeholder="Installment Price"
              type="number"
              id="InstallmentPrice"
              value={installmentPrice}
              onChange={handleInstallmentPriceChange}
            />

            <label htmlFor="productType">Tipo de Produto:</label>
            <input
              placeholder="Product Type"
              type="text"
              id="productType"
              value={productType}
              onChange={handleProductTypeChange}
            />

            <label htmlFor="platform">Plataforma:</label>
            <input
              placeholder="Platform"
              type="text"
              id="platform"
              value={platform}
              onChange={handlePlatformChange}
            />

            <label htmlFor="typePc">Tipo de PC:</label>
            <input
              placeholder="PC Type"
              type="text"
              id="typePc"
              value={typePc}
              onChange={handleTypePcChange}
            />

            <label htmlFor="image">Imagem:</label>
            <input
              placeholder="Image"
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />

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
      </div>

      <h2>Products List</h2>

      {products.map((product) => (
        <div className="hl-1 styleBox" key={product.id}>
          <Link to="/">
            <img
              className="img-hl-1"
              src={product.imageUrl}
              alt={product.name}
            />
          </Link>
          <span>{product.name}</span>
          <span className="oldPrice-hl-1 oldPrice-hl">
            {" "}
            DE: {product.oldPrice} POR:
          </span>
          <span className="currentPrice-hl-1 currentPrice-hl">
            R${product.price},00
          </span>
          <span className="installmentPrice-hl-1 installmentPrice-hl">
            12x DE R${product.installmentPrice},00
          </span>
          <span className="descriptionProduct">{product.description}</span>
          <span>Product Type: {product.productType}</span>
          <span>Platform: {product.platform}</span>
          <span>Type of PC: {product.typePc}</span>

          <input
            placeholder="name"
            type="text"
            value={updateName}
            onChange={handleUpdateNameChange}
          />
          <textarea
            placeholder="description"
            type="text"
            value={updateDescription}
            onChange={handleUpdateDescriptionChange}
          />
          <input
            placeholder="Price"
            type="number"
            value={updatePrice}
            onChange={handleUpdatePriceChange}
          />
          <input
            placeholder="Old Price"
            type="number"
            value={updateOldPrice}
            onChange={handleUpdateOldPriceChange}
          />
          <input
            placeholder="Installment Price"
            type="number"
            value={updateInstallmentPrice}
            onChange={handleUpdateInstallmentPriceChange}
          />
          <input
            placeholder="Product type"
            type="text"
            value={updateProductType}
            onChange={handleUpdateProductTypeChange}
          />
          <input
            placeholder="Platform"
            type="text"
            value={updatePlatform}
            onChange={handleUpdatePlatformChange}
          />
          <input
            placeholder="PC Type"
            type="text"
            value={updateTypePc}
            onChange={handleUpdateTypePcChange}
          />

          <button onClick={() => handleUpdateProduct(product.id)}>
            Update
          </button>
          <button onClick={() => handleDeleteProduct(product.id)}>
            Delete
          </button>

          <div className="addField">
            <input
              type="text"
              placeholder="Field"
              value={addField}
              onChange={(e) => setAddField(e.target.value)}
            />
            <input
              type="text"
              placeholder="Value"
              value={addValue}
              onChange={(e) => setAddValue(e.target.value)}
            />
            <button onClick={() => handleAddField(product.id, addField, addValue)}>
              Add Field
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
