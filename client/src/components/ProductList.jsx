import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to fetch products');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">🛍️ Our Products</h1>
      {products.length === 0 ? (
        <p className="no-products">No products available</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product._id}>
              <h3>{product.name}</h3>
              <p className="price">₹{product.price}</p>
              <p className="description">{product.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
