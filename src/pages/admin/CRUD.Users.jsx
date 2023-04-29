import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

function Crudproducts() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", description: "", price: "" });
  const [updatingProduct, setUdatingProducts] = useState(null);

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

  const handleAddProduct = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "products"), newProduct);
    setProducts([...products, newProduct]);
    setNewProduct({ name: "", description: "", price: "" });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    await updateDoc(collection(db, "products"), updatingProduct.id, updatingProduct);
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
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <input
          type="price"
          placeholder="Digite a Senha"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <button type="submit">Add product</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>description</th>
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
              setUdatingProducts({ ...updatingProduct, description: e.target.value })
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
    </div>
  );
}

export default Crudproducts;
