// src/__tests__/App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders welcome message', () => {
  render(<App />);
  const welcomeMessage = screen.getByText(/Willkommen zu OFT/i);
  expect(welcomeMessage).toBeInTheDocument();
});

test('renders Open-Food-Tracker text', () => {
  render(<App />);
  const oftText = screen.getByText(/Open-Food-Tracker/i);
  expect(oftText).toBeInTheDocument();
});
