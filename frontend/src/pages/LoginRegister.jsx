import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function LoginRegister() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function submit(event) {
    event.preventDefault();
    setError('');
    try {
      if (mode === 'register') {
        await register(form.username, form.email, form.password);
      } else {
        await login(form.username, form.password);
      }
      navigate('/products');
    } catch {
      setError('Authentication failed. Check your details and try again.');
    }
  }

  return (
    <section className="auth-panel">
      <div className="segmented">
        <button className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>Login</button>
        <button className={mode === 'register' ? 'active' : ''} onClick={() => setMode('register')}>Register</button>
      </div>
      <form onSubmit={submit}>
        <label>
          Username
          <input name="username" value={form.username} onChange={updateField} required />
        </label>
        {mode === 'register' && (
          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={updateField} required />
          </label>
        )}
        <label>
          Password
          <input name="password" type="password" value={form.password} onChange={updateField} required minLength="8" />
        </label>
        <button className="primary-button" type="submit">{mode === 'register' ? 'Create account' : 'Login'}</button>
      </form>
      {error && <p className="error">{error}</p>}
    </section>
  );
}
