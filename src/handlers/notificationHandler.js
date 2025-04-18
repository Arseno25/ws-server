import logger from '../utils/logger.js';

class NotificationHandler {
    constructor() {
        this.subscribers = new Map(); // Map untuk menyimpan subscriber berdasarkan kategori
    }

    // Subscribe ke kategori notifikasi tertentu
    subscribe(client, categories) {
        if (!Array.isArray(categories)) {
            categories = [categories];
        }

        categories.forEach(category => {
            if (!this.subscribers.has(category)) {
                this.subscribers.set(category, new Set());
            }
            this.subscribers.get(category).add(client);
            logger.info(`Client subscribed to category: ${category}`);
        });
    }

    // Unsubscribe dari kategori notifikasi
    unsubscribe(client, categories) {
        if (!Array.isArray(categories)) {
            categories = [categories];
        }

        categories.forEach(category => {
            if (this.subscribers.has(category)) {
                this.subscribers.get(category).delete(client);
                logger.info(`Client unsubscribed from category: ${category}`);
            }
        });
    }

    // Kirim notifikasi ke semua subscriber dalam kategori tertentu
    sendNotification(category, notification) {
        if (!this.subscribers.has(category)) {
            logger.warn(`No subscribers for category: ${category}`);
            return;
        }

        const message = {
            type: 'notification',
            category,
            payload: {
                ...notification,
                timestamp: new Date().toISOString()
            }
        };

        this.subscribers.get(category).forEach(client => {
            if (client.readyState === 1) { // WebSocket.OPEN
                client.send(JSON.stringify(message));
                logger.info(`Notification sent to client in category: ${category}`);
            }
        });
    }

    // Kirim notifikasi ke client tertentu
    sendNotificationToClient(client, category, notification) {
        const message = {
            type: 'notification',
            category,
            payload: {
                ...notification,
                timestamp: new Date().toISOString()
            }
        };

        if (client.readyState === 1) { // WebSocket.OPEN
            client.send(JSON.stringify(message));
            logger.info(`Notification sent to specific client in category: ${category}`);
        }
    }

    // Hapus client dari semua kategori saat disconnect
    removeClient(client) {
        this.subscribers.forEach((clients, category) => {
            if (clients.has(client)) {
                clients.delete(client);
                logger.info(`Client removed from category: ${category}`);
            }
        });
    }
}

export const notificationHandler = new NotificationHandler(); 