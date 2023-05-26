import { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Header from '../components/Header';
import { imgAmdType, imgIntelType } from '../img/imgs';
import ProductCard from '../components/ProductCard';

export const FilterPcsByPlatform = () => {
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [plataformaSelecionada, setPlataformaSelecionada] = useState('');

  useEffect(() => {
    const carregarProdutos = async () => {
      const querySnapshot = await getDocs(query(collection(db, 'products')));
      const produtos = querySnapshot.docs.map(doc => doc.data());

      // Filtrar os produtos pela plataforma selecionada
      const produtosFiltrados = produtos.filter(product => product.platform === plataformaSelecionada);
      setProdutosFiltrados(produtosFiltrados);
    };

    carregarProdutos();
  }, [plataformaSelecionada]);

  const handleSelecionarPlataforma = plataforma => {
    setPlataformaSelecionada(plataforma);
  };

  return (
    <>
    <Header />
    <div>
      <section
        style={{ marginTop: "7rem" }}
        className="buyByPlatform"
        id="buyByPlatformHome"
      >
        <div className="text-buy-by-platform"> COMPRE POR PLATAFORMA </div>
        <div className="divBuyByPlatform">
          <div className="divPlatformIntel" id="textPlatform">
            <span className="text-platform-intel"> INTEL </span>
            <button  onClick={() => handleSelecionarPlataforma('intel')}> intel </button>
            <img 
              className="platform-intel"
              src={imgIntelType}
              alt="Plataforma Intel"
            />
          </div>
          <div className="divPlatformAmd" id="textPlatform">
            <span className="text-platform-amd"> AMD </span>
            <img onClick={() => handleSelecionarPlataforma('amd')}
              className="platform-amd"
              src={imgAmdType}
              alt="Plataforma AMD"
            />
          </div>
        </div>
      </section>
      
      <h2>Produtos Filtrados</h2>
      <div>
      {produtosFiltrados.map(({ id, ...product }) => (
                  <ProductCard key={id} id={id} {...product} />
                ))}\
      </div>
    </div>
    </>

  );
};
