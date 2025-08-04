import { render, screen } from '@testing-library/react';
import App from './App';

// Prueba para verificar que el formulario de inicio de sesión se renderiza correctamente
test('renders login form', () => {
  render(<App />); // Renderiza la aplicación

  // Verifica que el título "Iniciar sesión" esté en el documento
  const loginTitle = screen.getByText(/Iniciar sesión/i);
  expect(loginTitle).toBeInTheDocument();

  // Verifica que el campo de usuario esté en el documento
  const usernameInput = screen.getByLabelText(/Usuario/i);
  expect(usernameInput).toBeInTheDocument();

  // Verifica que el campo de contraseña esté en el documento
  const passwordInput = screen.getByLabelText(/Contraseña/i);
  expect(passwordInput).toBeInTheDocument();

  // Verifica que el botón de ingreso esté en el documento
  const loginButton = screen.getByRole('button', { name: /Ingresar/i });
  expect(loginButton).toBeInTheDocument();
});