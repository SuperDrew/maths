import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom/extend-expect';

describe('render App', () => {
    it('should not throw any exceptions', () => {
        expect(render(<App />)).not.toThrow();
    });
});
