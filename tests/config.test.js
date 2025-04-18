import { config } from '../src/config.js';

describe('Config', () => {
    test('should have default port', () => {
        expect(config.PORT).toBeDefined();
    });

    test('should have allowed origins', () => {
        expect(config.ALLOWED_ORIGINS).toBeDefined();
        expect(Array.isArray(config.ALLOWED_ORIGINS)).toBe(true);
    });
}); 