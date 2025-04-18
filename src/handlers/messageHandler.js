import logger from '../utils/logger.js';
import { WebSocket } from 'ws';

export const handleMessage = (ws, data) => {
    const { type, payload } = data;

    logger.debug(`Received message of type: ${type}`, { payload });

    switch (type) {
        case 'echo':
            logger.debug('Sending echo response');
            ws.send(JSON.stringify({
                type: 'echo',
                payload: payload
            }));
            break;

        case 'broadcast':
            logger.debug('Broadcasting message to all clients');
            // Broadcast message to all connected clients
            ws.clients.forEach(client => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({
                        type: 'broadcast',
                        payload: payload
                    }));
                }
            });
            break;

        default:
            logger.warn(`Unknown message type received: ${type}`);
            ws.send(JSON.stringify({
                type: 'error',
                message: 'Unknown message type'
            }));
    }
}; 