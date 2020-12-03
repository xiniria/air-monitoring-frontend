import React from 'react';
import { render, screen } from '@testing-library/react';
import App from 'App';

test('renders Location link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Location/i);
  expect(linkElement).toBeInTheDocument();
});
