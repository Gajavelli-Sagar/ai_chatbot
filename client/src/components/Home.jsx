import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🛒 Products</h2>
      <ul>
        {products.map(p => (
          <li key={p._id}>
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <p>{p.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
