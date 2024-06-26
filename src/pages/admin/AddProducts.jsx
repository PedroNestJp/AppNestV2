import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../../firebase";
import { Link } from "react-router-dom";
import "../../styles/AddProducts.css";
import ShortHeader from "../../components/ShortHeader";
import LoadingOverlay from "../../components/LoadingOverlay";

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
  const [addField, setAddField] = useState("");
  const [addValue, setAddValue] = useState("");



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

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0])); // Cria uma URL temporária para a prévia da imagem
  };
  const handleNameChange = (e) => setName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleOldPriceChange = (e) => setOldPrice(e.target.value);
  const handleInstallmentPriceChange = (e) =>
    setInstallmentPrice(e.target.value);
  const handleProductTypeChange = (e) => setProductType(e.target.value);
  const handlePlatformChange = (e) => setPlatform(e.target.value);
  const handleTypePcChange = (e) => setTypePc(e.target.value);
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

  const handleUpdateProduct = async (productId, field) => {
    try {
      const productRef = doc(db, "products", productId);
      let updatedField = {};

      switch (field) {
        case "name":
          updatedField = { name: updateName };
          break;
        case "description":
          updatedField = { description: updateDescription };
          break;
        case "price":
          updatedField = { price: Number(updatePrice) };
          break;
        case "oldPrice":
          updatedField = { oldPrice: Number(updateOldPrice) };
          break;
        case "installmentPrice":
          updatedField = { installmentPrice: Number(updateInstallmentPrice) };
          break;
        case "productType":
          updatedField = { productType: updateProductType };
          break;
        case "platform":
          updatedField = { platform: updatePlatform };
          break;
        case "typePc":
          updatedField = { typePc: updateTypePc };
          break;
        default:
          break;
      }

      await updateDoc(productRef, updatedField);
      alert("😎 Produto atualizado com sucesso ✅");

      // Reset the corresponding state after successful update
      switch (field) {
        case "name":
          setUpdateName("");
          break;
        case "description":
          setUpdateDescription("");
          break;
        case "price":
          setUpdatePrice("");
          break;
        case "oldPrice":
          setUpdateOldPrice("");
          break;
        case "installmentPrice":
          setUpdateInstallmentPrice("");
          break;
        case "productType":
          setUpdateProductType("");
          break;
        case "platform":
          setUpdatePlatform("");
          break;
        case "typePc":
          setUpdateTypePc("");
          break;
        default:
          break;
      }
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

  if (!products) {
    return <div>{<LoadingOverlay />}</div>;
  }

  return (
    <>
      <ShortHeader />
      {!products &
      (
        <div>
          <LoadingOverlay />
        </div>
      )}
      <div className="AddProductsMain">
        <div className="AddProductsContainer">
          <h2>Adicionar Produtos</h2>

          {auth.currentUser &&
          auth.currentUser.uid === process.env.REACT_APP_USER_ADMIN_UID ? (
            <form className="addProductsInputs" onSubmit={handleSubmit}>
              <label htmlFor="name">Nome do produto:</label>
              <input
                className="inputsAddProducts"
                placeholder="Nome"
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
              />

              <label htmlFor="description">Descrição:</label>
              <textarea
                className="inputsAddProducts"
                placeholder="Descrição"
                id="description"
                value={description}
                onChange={handleDescriptionChange}
              />

              <label htmlFor="price">Preço:</label>
              <input
                className="inputsAddProducts"
                placeholder="Valor"
                type="number"
                id="price"
                value={price}
                onChange={handlePriceChange}
              />

              <label htmlFor="OldPrice">Preço Antigo:</label>
              <input
                className="inputsAddProducts"
                placeholder="Preço Antigo"
                type="number"
                id="OldPrice"
                value={oldPrice}
                onChange={handleOldPriceChange}
              />

              <label htmlFor="InstallmentPrice">Valor Parcelado:</label>
              <input
                className="inputsAddProducts"
                placeholder="Preço Parcelado"
                type="number"
                id="InstallmentPrice"
                value={installmentPrice}
                onChange={handleInstallmentPriceChange}
              />

              <label htmlFor="productType">Tipo de Produto:</label>
              <input
                className="inputsAddProducts"
                placeholder="Tipo de produto"
                type="text"
                id="productType"
                value={productType}
                onChange={handleProductTypeChange}
              />

              <label htmlFor="platform">Plataforma:</label>
              <input
                className="inputsAddProducts"
                placeholder="Plataforma"
                type="text"
                id="platform"
                value={platform}
                onChange={handlePlatformChange}
              />

              <label htmlFor="typePc">Tipo de PC:</label>
              <input
                className="inputsAddProducts"
                placeholder="Tipo de produto"
                type="text"
                id="typePc"
                value={typePc}
                onChange={handleTypePcChange}
              />

              <label htmlFor="image">Imagem:</label>
              <input
                className="inputsAddProducts"
                placeholder="Imagem"
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
              <button className="button-buy" type="submit" disabled={uploading}>
                {uploading ? <LoadingOverlay /> : "Adicionar Produto"}
              </button>
            </form>
          ) : (
            console.log(`Sem acesso para ${auth.currentUser}`)
          )}
        </div>

        <h2>Atualizar Produtos</h2>

        {products.map((product) => (
          <div
            style={{ width: "30rem", height: "auto" }}
            className="styleBox"
            key={product.id}
          >
            <Link to="/">
              <img
                className="imgsBoxs"
                src={product.imageUrl}
                alt={product.name}
              />
            </Link>
            <span>{product.name}</span>
            <span
              style={{ textDecoration: "line-through" }}
              className="oldPrice"
            >
              DE: {product.oldPrice},00 POR:
            </span>
            <span className="currentPrice">R${product.price},00</span>
            <span className="installmentPrice">
              10X DE R${product.installmentPrice},00
            </span>
            <span className="descriptionProduct">{product.description}</span>
            <span>Product Type: {product.productType}</span>
            <span>Platform: {product.platform}</span>
            <span>Type of PC: {product.typePc}</span>

            <input
              className="inputsAddProducts"
              placeholder="Nome"
              type="text"
              value={updateName}
              onChange={handleUpdateNameChange}
            />
            <button
              className="inputsAddProducts"
              onClick={() => handleUpdateProduct(product.id, "name")}
            >
              Atualizar Nome
            </button>
            <textarea
              className="inputsAddProducts"
              placeholder="Descrição"
              type="text"
              value={updateDescription}
              onChange={handleUpdateDescriptionChange}
            />
            <button
              className="inputsAddProducts"
              onClick={() => handleUpdateProduct(product.id, "description")}
            >
              Atualizar Descrição
            </button>
            <input
              className="inputsAddProducts"
              placeholder="Preço Antigo"
              type="number"
              value={updateOldPrice}
              onChange={handleUpdateOldPriceChange}
            />
            <button
              className="inputsAddProducts"
              onClick={() => handleUpdateProduct(product.id, "oldPrice")}
            >
              Atualizar Preço Antigo
            </button>
            <input
              className="inputsAddProducts"
              placeholder="Preço atual"
              type="number"
              value={updatePrice}
              onChange={handleUpdatePriceChange}
            />
            <button
              className="inputsAddProducts"
              onClick={() => handleUpdateProduct(product.id, "price")}
            >
              Atualizar Preço
            </button>
            <input
              className="inputsAddProducts"
              placeholder="Preço Parcelado"
              type="number"
              value={updateInstallmentPrice}
              onChange={handleUpdateInstallmentPriceChange}
            />
            <button
              className="inputsAddProducts"
              onClick={() =>
                handleUpdateProduct(product.id, "installmentPrice")
              }
            >
              Atualizar Preço Parcelado
            </button>
            <input
              className="inputsAddProducts"
              placeholder="Tipo de Produto"
              type="text"
              value={updateProductType}
              onChange={handleUpdateProductTypeChange}
            />
            <button
              className="inputsAddProducts"
              onClick={() => handleUpdateProduct(product.id, "productType")}
            >
              Atualizar Tipo de Produto
            </button>
            <input
              className="inputsAddProducts"
              placeholder="Plataforma"
              type="text"
              value={updatePlatform}
              onChange={handleUpdatePlatformChange}
            />
            <button
              className="inputsAddProducts"
              onClick={() => handleUpdateProduct(product.id, "platform")}
            >
              Atualizar Plataforma
            </button>
            <input
              className="inputsAddProducts"
              placeholder="Tipo de PC"
              type="text"
              value={updateTypePc}
              onChange={handleUpdateTypePcChange}
            />
            <button
              className="inputsAddProducts"
              onClick={() => handleUpdateProduct(product.id, "typePc")}
            >
              Atualizar Tipo de PC
            </button>
            <button
              className="inputsAddProducts"
              onClick={() => handleDeleteProduct(product.id)}
            >
              Deletar
            </button>

            <div className="addField">
              <input
                className="inputsAddProducts"
                type="text"
                placeholder="Campo"
                value={addField}
                onChange={(e) => setAddField(e.target.value)}
              />
              <input
                className="inputsAddProducts"
                type="text"
                placeholder="Valor"
                value={addValue}
                onChange={(e) => setAddValue(e.target.value)}
              />
              <button
                className="inputsAddProducts"
                onClick={() => handleAddField(product.id, addField, addValue)}
              >
                Adicionar Campo
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductList;
