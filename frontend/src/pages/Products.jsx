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
        <p className="eyebrow">Catalog</p>
        <h1>Products</h1>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <article className="product-card" key={product.id}>
            <img src={product.image_url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80'} alt={product.name} />
            <div>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <div className="card-footer">
                <strong>${product.price}</strong>
                <Link to={`/products/${product.id}`}>View</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
