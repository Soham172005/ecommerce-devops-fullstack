import { useEffect, useState } from 'react';
import api from '../api/client.js';

export default function Cart() {
  const [cart, setCart] = useState(null);

  async function loadCart() {
    const { data } = await api.get('/cart/');
    setCart(data);
  }

  async function removeItem(itemId) {
    const { data } = await api.delete('/cart/', { data: { item_id: itemId } });
    setCart(data);
  }

  useEffect(() => {
    loadCart();
  }, []);

  if (!cart) return <p>Loading cart...</p>;

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Checkout</p>
          <h1>Your cart</h1>
        </div>
        <p>Review your selected products before moving to the next step.</p>
      </div>
      {cart.items.length === 0 ? (
        <div className="empty-state">
          <h2>Your cart is empty</h2>
          <p>Explore the catalog and add something worth shipping.</p>
        </div>
      ) : (
        <div className="cart-list">
          {cart.items.map((item) => (
            <div className="cart-row" key={item.id}>
              <div>
                <strong>{item.product.name}</strong>
                <span>Qty {item.quantity}</span>
              </div>
              <div>
                <strong>${item.subtotal}</strong>
                <button onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="cart-total">Total: ${cart.total}</div>
        </div>
      )}
    </section>
  );
}
