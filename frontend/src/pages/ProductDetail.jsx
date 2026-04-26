import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/client.js';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get(`/products/${id}/`).then((response) => setProduct(response.data));
  }, [id]);

  async function addToCart() {
    await api.post('/cart/', { product_id: product.id, quantity: 1 });
    setMessage('Added to cart');
  }

  if (!product) return <p>Loading product...</p>;

  return (
    <section className="detail-layout">
      <div className="detail-media">
        <img src={product.image_url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80'} alt={product.name} />
      </div>
      <div className="detail-copy">
        <p className="eyebrow">Product detail</p>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p className="price">${product.price}</p>
        <div className="detail-meta">
          <span>Stock available: {product.stock}</span>
          <span>Secure checkout</span>
        </div>
        <button className="primary-button" onClick={addToCart}>Add to cart</button>
        {message && <p className="success">{message}</p>}
      </div>
    </section>
  );
}
