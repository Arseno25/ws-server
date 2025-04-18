import logger from '../utils/logger.js';
import { notificationHandler } from './notificationHandler.js';

export function handleMessage(ws, message) {
    try {
        // Handle both string and object messages
        const data = typeof message === 'string' ? JSON.parse(message) : message;
        
        if (!data || typeof data !== 'object') {
            throw new Error('Invalid message format');
        }

        switch (data.type) {
            case 'echo':
                handleEcho(ws, data);
                break;
            case 'broadcast':
                handleBroadcast(ws, data);
                break;
            case 'subscribe':
                handleSubscribe(ws, data);
                break;
            case 'unsubscribe':
                handleUnsubscribe(ws, data);
                break;
            default:
                handleUnknownMessage(ws);
        }
    } catch (error) {
        handleError(ws, error);
    }
}

function handleEcho(ws, data) {
    const response = {
        type: 'echo',
        payload: data.payload
    };
    ws.send(JSON.stringify(response));
    logger.info('Echo message sent');
}

function handleBroadcast(ws, data) {
    const response = {
        type: 'broadcast',
        payload: {
            ...data.payload,
            timestamp: new Date().toISOString()
        }
    };
    ws.send(JSON.stringify(response));
    logger.info('Broadcast message sent');
}

function handleSubscribe(ws, data) {
    const { categories } = data;
    notificationHandler.subscribe(ws, categories);
    
    const response = {
        type: 'subscribed',
        categories
    };
    ws.send(JSON.stringify(response));
    logger.info(`Client subscribed to categories: ${categories.join(', ')}`);
}

function handleUnsubscribe(ws, data) {
    const { categories } = data;
    notificationHandler.unsubscribe(ws, categories);
    
    const response = {
        type: 'unsubscribed',
        categories
    };
    ws.send(JSON.stringify(response));
    logger.info(`Client unsubscribed from categories: ${categories.join(', ')}`);
}

function handleUnknownMessage(ws) {
    const response = {
        type: 'error',
        message: 'Unknown message type'
    };
    ws.send(JSON.stringify(response));
    logger.warn('Unknown message type received');
}

function handleError(ws, error) {
    const response = {
        type: 'error',
        message: error.message || 'Invalid message format'
    };
    ws.send(JSON.stringify(response));
    logger.error('Error handling message:', error.message);
} 