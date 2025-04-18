import WebSocket from 'ws';

class BroadcastClient {
    constructor(url, clientName) {
        this.url = url;
        this.clientName = clientName;
        this.ws = null;
        this.isConnected = false;
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.ws = new WebSocket(this.url);

            this.ws.on('open', () => {
                console.log(`${this.clientName} connected to WebSocket server`);
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
                console.log(`${this.clientName} disconnected from WebSocket server`);
                this.isConnected = false;
            });

            this.ws.on('error', (error) => {
                console.error(`${this.clientName} WebSocket error:`, error);
                reject(error);
            });
        });
    }

    handleMessage(message) {
        switch (message.type) {
            case 'welcome':
                console.log(`${this.clientName} received welcome:`, message.message);
                break;
            case 'broadcast':
                console.log(`${this.clientName} received broadcast:`, message.payload);
                break;
            case 'error':
                console.error(`${this.clientName} received error:`, message.message);
                break;
            default:
                console.log(`${this.clientName} received unknown message:`, message);
        }
    }

    broadcast(message) {
        if (!this.isConnected) {
            console.error(`${this.clientName} is not connected to server`);
            return;
        }

        const payload = {
            from: this.clientName,
            message: message,
            timestamp: new Date().toISOString()
        };

        this.ws.send(JSON.stringify({
            type: 'broadcast',
            payload: payload
        }));
    }

    close() {
        if (this.ws) {
            this.ws.close();
        }
    }
}

// Example usage with multiple clients
async function main() {
    // Create multiple clients
    const client1 = new BroadcastClient('ws://localhost:8080', 'Client1');
    const client2 = new BroadcastClient('ws://localhost:8080', 'Client2');
    const client3 = new BroadcastClient('ws://localhost:8080', 'Client3');

    try {
        // Connect all clients
        await Promise.all([
            client1.connect(),
            client2.connect(),
            client3.connect()
        ]);

        // Client1 sends a broadcast
        client1.broadcast('Hello everyone!');

        // Wait for messages to propagate
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Client2 sends a broadcast
        client2.broadcast('Hi there!');

        // Wait for messages to propagate
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Close all connections
        client1.close();
        client2.close();
        client3.close();
    } catch (error) {
        console.error('Error:', error);
    }
}

// Run the example
main(); 