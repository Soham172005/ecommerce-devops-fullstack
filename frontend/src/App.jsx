import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import Cart from './pages/Cart.jsx';
import Home from './pages/Home.jsx';
import LoginRegister from './pages/LoginRegister.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Products from './pages/Products.jsx';

function ProtectedRoute({ children }) {
  const { accessToken } = useAuth();
  return accessToken ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const { accessToken, logout } = useAuth();

  return (
    <div>
      <header className="site-header">
        <Link className="brand" to="/">CommerceOps</Link>
        <nav>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          {accessToken ? (
            <button className="link-button" onClick={logout}>Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route
            path="/cart"
            element={(
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            )}
          />
          <Route path="/login" element={<LoginRegister />} />
        </Routes>
      </main>
    </div>
  );
}
