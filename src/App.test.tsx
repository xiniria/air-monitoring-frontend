import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { render, screen } from '@testing-library/react';
import { configure } from 'enzyme';
import App from 'App';

configure({ adapter: new Adapter() });

test('renders without crashing', () => {
  render(<App />);
});

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
