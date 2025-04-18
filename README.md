# WebSocket Server

[English](#english) | [Bahasa Indonesia](#bahasa-indonesia)

<a name="english"></a>
# English

A clean architecture WebSocket server implementation for real-time communication with robust features and comprehensive examples.

## Features

- Clean and modular architecture
- Real-time bidirectional communication
- Message broadcasting
- Error handling
- Configuration management
- Structured logging with Winston
  - Console logs with colors
  - File-based logging
  - Separate error log file
- Auto-reconnect capability
- Message queuing
- Multiple client support

## Installation

1. Clone the repository
```bash
git clone https://github.com/Arseno25/ws-server.git
cd ws-server
```

2. Install dependencies:
```bash
npm install
```

## Configuration

Create a `.env` file in the root directory with the following variables:
```
PORT=8080
ALLOWED_ORIGINS=*
LOG_LEVEL=info
```

## Logging

The server uses Winston for structured logging with the following features:
- Console output with colored log levels
- All logs are saved to `logs/combined.log`
- Error logs are separately saved to `logs/error.log`
- Timestamp format: YYYY-MM-DD HH:mm:ss

Log levels used:
- `error`: For errors and exceptions
- `warn`: For warning conditions
- `info`: For general information
- `debug`: For detailed debugging information

## Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## Message Types

The server supports the following message types:

1. `echo` - Echoes back the received message
2. `broadcast` - Broadcasts the message to all connected clients

Example message format:
```javascript
{
    "type": "echo",
    "payload": "Hello, World!"
}
```

## Client Examples

The repository includes three different client implementations:

### 1. Basic Client (`examples/basic-client.js`)
Simple client for basic WebSocket communication:
```javascript
const client = new BasicClient('ws://localhost:8080');
await client.connect();
client.send('echo', 'Hello, Server!');
```

### 2. Broadcast Client (`examples/broadcast-client.js`)
Client with broadcast capabilities and multiple client simulation:
```javascript
const client = new BroadcastClient('ws://localhost:8080', 'Client1');
await client.connect();
client.broadcast('Hello everyone!');
```

### 3. Auto-reconnect Client (`examples/auto-reconnect-client.js`)
Robust client with auto-reconnect and message queuing:
```javascript
const client = new AutoReconnectClient('ws://localhost:8080', {
    reconnectInterval: 2000,
    maxReconnectAttempts: 3
});
await client.connect();
```

## Ubuntu Server Setup with PM2

1. Install Node.js and npm:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

2. Install PM2 globally:
```bash
sudo npm install -g pm2
```

3. Clone your repository:
```bash
git clone <your-repository-url>
cd ws-server
```

4. Install project dependencies:
```bash
npm install
```

5. Create environment file:
```bash
cp .env.example .env
# Edit .env file with your configuration
nano .env
```

6. Start the application with PM2:
```bash
pm2 start src/index.js --name "ws-server"
```

7. Configure PM2 to start on system boot:
```bash
pm2 startup
pm2 save
```

8. Useful PM2 commands:
```bash
# View logs
pm2 logs ws-server

# Monitor application
pm2 monit

# Restart application
pm2 restart ws-server

# Stop application
pm2 stop ws-server

# Delete application from PM2
pm2 delete ws-server
```

## Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<a name="bahasa-indonesia"></a>
# Bahasa Indonesia

Implementasi server WebSocket dengan arsitektur bersih untuk komunikasi real-time dengan fitur lengkap dan contoh yang komprehensif.

## Fitur

- Arsitektur bersih dan modular
- Komunikasi dua arah real-time
- Penyiaran pesan (broadcasting)
- Penanganan kesalahan
- Manajemen konfigurasi
- Pencatatan terstruktur dengan Winston
  - Log konsol dengan warna
  - Pencatatan berbasis file
  - File log kesalahan terpisah
- Kemampuan auto-reconnect
- Antrian pesan
- Dukungan multi-client

## Instalasi

1. Clone repositori
```bash
git clone https://github.com/Arseno25/ws-server.git
cd ws-server
```

2. Pasang dependensi:
```bash
npm install
```

## Konfigurasi

Buat file `.env` di direktori utama dengan variabel berikut:
```
PORT=8080
ALLOWED_ORIGINS=*
LOG_LEVEL=info
```

## Pencatatan (Logging)

Server menggunakan Winston untuk pencatatan terstruktur dengan fitur berikut:
- Output konsol dengan level log berwarna
- Semua log disimpan di `logs/combined.log`
- Log kesalahan disimpan terpisah di `logs/error.log`
- Format timestamp: YYYY-MM-DD HH:mm:ss

Level log yang digunakan:
- `error`: Untuk kesalahan dan pengecualian
- `warn`: Untuk kondisi peringatan
- `info`: Untuk informasi umum
- `debug`: Untuk informasi debugging detail

## Menjalankan Server

Mode pengembangan:
```bash
npm run dev
```

Mode produksi:
```bash
npm start
```

## Tipe Pesan

Server mendukung tipe pesan berikut:

1. `echo` - Mengembalikan pesan yang diterima
2. `broadcast` - Menyebarkan pesan ke semua klien yang terhubung

Contoh format pesan:
```javascript
{
    "type": "echo",
    "payload": "Halo, Dunia!"
}
```

## Contoh Client

Repositori menyertakan tiga implementasi client yang berbeda:

### 1. Basic Client (`examples/basic-client.js`)
Client sederhana untuk komunikasi WebSocket dasar:
```javascript
const client = new BasicClient('ws://localhost:8080');
await client.connect();
client.send('echo', 'Halo, Server!');
```

### 2. Broadcast Client (`examples/broadcast-client.js`)
Client dengan kemampuan broadcast dan simulasi multi-client:
```javascript
const client = new BroadcastClient('ws://localhost:8080', 'Client1');
await client.connect();
client.broadcast('Halo semua!');
```

### 3. Auto-reconnect Client (`examples/auto-reconnect-client.js`)
Client tangguh dengan auto-reconnect dan antrian pesan:
```javascript
const client = new AutoReconnectClient('ws://localhost:8080', {
    reconnectInterval: 2000,
    maxReconnectAttempts: 3
});
await client.connect();
```

## Setup Server Ubuntu dengan PM2

1. Install Node.js dan npm:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

2. Install PM2 secara global:
```bash
sudo npm install -g pm2
```

3. Clone repositori Anda:
```bash
git clone <url-repositori-anda>
cd ws-server
```

4. Pasang dependensi proyek:
```bash
npm install
```

5. Buat file environment:
```bash
cp .env.example .env
# Edit file .env dengan konfigurasi Anda
nano .env
```

6. Jalankan aplikasi dengan PM2:
```bash
pm2 start src/index.js --name "ws-server"
```

7. Konfigurasi PM2 untuk start otomatis saat boot:
```bash
pm2 startup
pm2 save
```

8. Perintah PM2 yang berguna:
```bash
# Lihat log
pm2 logs ws-server

# Monitor aplikasi
pm2 monit

# Restart aplikasi
pm2 restart ws-server

# Hentikan aplikasi
pm2 stop ws-server

# Hapus aplikasi dari PM2
pm2 delete ws-server
```

## Testing

Jalankan test:
```bash
npm test
```

Jalankan test dalam mode watch:
```bash
npm run test:watch
```

## Kontribusi

1. Fork repositori
2. Buat branch fitur Anda (`git checkout -b fitur/fitur-keren`)
3. Commit perubahan Anda (`git commit -m 'Menambahkan fitur keren'`)
4. Push ke branch (`git push origin fitur/fitur-keren`)
5. Buat Pull Request

## Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT - lihat file [LICENSE](LICENSE) untuk detailnya. 