import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client.js';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/products/')
      .then((response) => setProducts(response.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Curated catalog</p>
          <h1>Premium products</h1>
        </div>
        <p>
          Browse refined everyday essentials selected for a modern commerce experience.
        </p>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <article className="product-card" key={product.id}>
            <div className="product-media">
              <img src={product.image_url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80'} alt={product.name} />
              <span className="product-badge">In stock</span>
            </div>
            <div className="product-body">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <div className="card-footer">
                <strong>${product.price}</strong>
                <Link to={`/products/${product.id}`}>View details</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
