import { WebSocketServer } from 'ws';
import { handleConnection } from './handlers/connectionHandler.js';
import { config } from './config.js';
import logger from './utils/logger.js';

const wss = new WebSocketServer({ port: config.PORT });

wss.on('connection', handleConnection);

logger.info(`WebSocket server is running on port ${config.PORT}`);

// Handle server errors
wss.on('error', (error) => {
    logger.error('WebSocket server error:', error);
}); 