# WebSocket Server

[English](#english) | [Bahasa Indonesia](#bahasa-indonesia)

<a name="english"></a>
# English

A clean architecture WebSocket server implementation for real-time communication.

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

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
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

## Configuration

Create a `.env` file in the root directory with the following variables:
```
PORT=8080
ALLOWED_ORIGINS=http://localhost:3000,http://example.com
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

## Client Implementation

Example client connection:
```javascript
const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
    console.log('Connected to server');
};

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('Received:', data);
};

// Send a message
ws.send(JSON.stringify({
    type: 'echo',
    payload: 'Hello, Server!'
}));
```

---

<a name="bahasa-indonesia"></a>
# Bahasa Indonesia

Implementasi server WebSocket dengan arsitektur bersih untuk komunikasi real-time.

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

## Instalasi

1. Clone repositori
2. Pasang dependensi:
```bash
npm install
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

## Konfigurasi

Buat file `.env` di direktori utama dengan variabel berikut:
```
PORT=8080
ALLOWED_ORIGINS=http://localhost:3000,http://example.com
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

## Implementasi Klien

Contoh koneksi klien:
```javascript
const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
    console.log('Terhubung ke server');
};

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('Diterima:', data);
};

// Kirim pesan
ws.send(JSON.stringify({
    type: 'echo',
    payload: 'Halo, Server!'
}));
``` 