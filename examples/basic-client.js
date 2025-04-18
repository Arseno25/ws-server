import WebSocket from 'ws';

class BasicClient {
    constructor(url) {
        this.url = url;
        this.ws = null;
        this.isConnected = false;
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.ws = new WebSocket(this.url);

            this.ws.on('open', () => {
                console.log('Connected to WebSocket server');
                this.isConnected = true;
                resolve();
            });

            this.ws.on('message', (data) => {
                try {
                    const message = JSON.parse(data);
                    console.log('Received:', message);
                } catch (error) {
                    console.error('Error parsing message:', error);
                }
            });

            this.ws.on('close', () => {
                console.log('Disconnected from WebSocket server');
                this.isConnected = false;
            });

            this.ws.on('error', (error) => {
                console.error('WebSocket error:', error);
                reject(error);
            });
        });
    }

    send(type, payload) {
        if (!this.isConnected) {
            console.error('Not connected to server');
            return;
        }

        const message = JSON.stringify({ type, payload });
        this.ws.send(message);
    }

    close() {
        if (this.ws) {
            this.ws.close();
        }
    }
}

// Example usage
async function main() {
    const client = new BasicClient('ws://localhost:8080');

    try {
        await client.connect();

        // Send echo message
        client.send('echo', 'Hello, Server!');

        // Wait for response
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Close connection
        client.close();
    } catch (error) {
        console.error('Error:', error);
    }
}

// Run the example
main(); 