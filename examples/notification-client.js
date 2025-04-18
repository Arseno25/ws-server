import WebSocket from 'ws';

class NotificationClient {
    constructor(url, clientId) {
        this.url = url;
        this.clientId = clientId;
        this.ws = null;
        this.isConnected = false;
        this.subscribedCategories = new Set();
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.ws = new WebSocket(this.url);

            this.ws.on('open', () => {
                console.log('Connected to notification server');
                this.isConnected = true;
                resolve();
            });

            this.ws.on('message', (data) => {
                try {
                    const message = JSON.parse(data);
                    this.handleMessage(message);
                } catch (error) {
                    console.error('Error parsing message:', error);
                }
            });

            this.ws.on('close', () => {
                console.log('Disconnected from notification server');
                this.isConnected = false;
            });

            this.ws.on('error', (error) => {
                console.error('WebSocket error:', error);
                this.isConnected = false;
                reject(error);
            });
        });
    }

    handleMessage(message) {
        switch (message.type) {
            case 'notification':
                this.handleNotification(message);
                break;
            case 'welcome':
                console.log('Received welcome:', message.message);
                break;
            case 'error':
                console.error('Received error:', message.message);
                break;
            default:
                console.log('Received unknown message:', message);
        }
    }

    handleNotification(message) {
        const { category, payload } = message;
        console.log(`[${category}] New notification:`, payload);
        
        // Di sini Anda bisa menambahkan logika untuk menampilkan notifikasi
        // Misalnya: menampilkan toast, mengupdate UI, dll.
        this.showNotification(category, payload);
    }

    showNotification(category, payload) {
        // Contoh implementasi menampilkan notifikasi
        console.log('----------------------------------------');
        console.log(`Notification Category: ${category}`);
        console.log(`Title: ${payload.title}`);
        console.log(`Message: ${payload.message}`);
        console.log(`Time: ${new Date(payload.timestamp).toLocaleString()}`);
        console.log('----------------------------------------');
    }

    subscribe(categories) {
        if (!Array.isArray(categories)) {
            categories = [categories];
        }

        const message = {
            type: 'subscribe',
            categories
        };

        this.ws.send(JSON.stringify(message));
        categories.forEach(category => this.subscribedCategories.add(category));
        console.log('Subscribed to categories:', categories);
    }

    unsubscribe(categories) {
        if (!Array.isArray(categories)) {
            categories = [categories];
        }

        const message = {
            type: 'unsubscribe',
            categories
        };

        this.ws.send(JSON.stringify(message));
        categories.forEach(category => this.subscribedCategories.delete(category));
        console.log('Unsubscribed from categories:', categories);
    }

    close() {
        if (this.ws) {
            this.ws.close();
        }
    }
}

// Contoh penggunaan
async function main() {
    // Buat client notifikasi
    const client = new NotificationClient('ws://localhost:8080', 'Client1');

    try {
        // Hubungkan ke server
        await client.connect();

        // Subscribe ke beberapa kategori notifikasi
        client.subscribe(['news', 'updates', 'alerts']);

        // Tunggu beberapa detik untuk menerima notifikasi
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Unsubscribe dari beberapa kategori
        client.unsubscribe(['news']);

        // Tunggu beberapa detik lagi
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Tutup koneksi
        client.close();
    } catch (error) {
        console.error('Error:', error);
    }
}

// Jalankan contoh
main(); 