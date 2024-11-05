import '@testing-library/jest-dom';

jest.mock('./src/config/config', () => ({
    config: {
        VITE_APP_API_MODE: 'LOCALMOCK',
    },
}));
