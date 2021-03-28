import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom/extend-expect';

test('Renders App with header', async () => {
    render(<App />);
    const header = await screen.findByTestId('header');
    expect(header).toBeInTheDocument();
});
