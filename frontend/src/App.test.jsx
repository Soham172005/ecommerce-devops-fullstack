import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect, test } from 'vitest';
import { AuthProvider } from './context/AuthContext.jsx';
import App from './App.jsx';

test('renders storefront brand', () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>,
  );
  expect(screen.getAllByText(/CommerceOps/i).length).toBeGreaterThan(0);
});
