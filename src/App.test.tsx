import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    // Add more specific assertions based on App.tsx content
    // For now, we just check if the app renders something
    expect(document.body).toBeDefined();
  });
});
