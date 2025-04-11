import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      setError('Failed to fetch products');
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post('http://localhost:5000/api/products', form, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setForm({ name: '', price: '', description: '' });
      fetchProducts();
    } catch (err) {
      setError('Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchProducts();
    } catch (err) {
      setError('Failed to delete product');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>🛍️ Admin Dashboard</h2>

      <form onSubmit={addProduct} className="product-form">
        <h3>Add Product</h3>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Product'}
        </button>
        {error && <p className="error">{error}</p>}
      </form>

      <h3>📦 All Products</h3>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product._id}>
            <strong>{product.name}</strong> - ₹{product.price}
            <p>{product.description}</p>
            <button onClick={() => deleteProduct(product._id)}>🗑️ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
