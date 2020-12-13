import React from 'react';
import { render, screen } from '@testing-library/react';
import App from 'App';

test('renders Location link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Location/i);
  expect(linkElement).toBeInTheDocument();
});

test('Displays an error when geolocation is not supported', () => {
  render(<App />);
  const errorDisplay = screen.getByText(/Erreur/i);
  expect(errorDisplay).toBeInTheDocument();
});
