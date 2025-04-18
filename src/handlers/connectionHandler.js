import { handleMessage } from './messageHandler.js';
import logger from '../utils/logger.js';

export const handleConnection = (ws) => {
    logger.info('New client connected');

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            handleMessage(ws, data);
        } catch (error) {
            logger.error('Error parsing message:', error);
            ws.send(JSON.stringify({
                type: 'error',
                message: 'Invalid message format'
            }));
        }
    });

    ws.on('close', () => {
        logger.info('Client disconnected');
    });

    ws.on('error', (error) => {
        logger.error('WebSocket error:', error);
    });

    // Send welcome message
    ws.send(JSON.stringify({
        type: 'welcome',
        message: 'Connected to WebSocket server'
    }));
}; 