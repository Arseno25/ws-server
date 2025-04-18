import { WebSocket } from 'ws';
import { jest } from '@jest/globals';
import { handleConnection } from '../src/handlers/connectionHandler.js';
import { handleMessage } from '../src/handlers/messageHandler.js';

// Mock WebSocketServer to avoid port conflicts
jest.mock('ws', () => {
    const originalModule = jest.requireActual('ws');
    return {
        ...originalModule,
        WebSocketServer: jest.fn().mockImplementation(() => ({
            on: jest.fn(),
            close: jest.fn()
        }))
    };
});

describe('WebSocket Server', () => {
    let mockWs;

    beforeEach(() => {
        // Create mock WebSocket instance
        mockWs = {
            send: jest.fn(),
            on: jest.fn(),
            clients: new Set(),
            readyState: WebSocket.OPEN
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Connection Handler', () => {
        test('should send welcome message on connection', () => {
            handleConnection(mockWs);

            expect(mockWs.send).toHaveBeenCalledWith(
                JSON.stringify({
                    type: 'welcome',
                    message: 'Connected to WebSocket server'
                })
            );
        });

        test('should handle message events', () => {
            handleConnection(mockWs);

            // Get the message event handler
            const messageHandler = mockWs.on.mock.calls.find(
                call => call[0] === 'message'
            )[1];

            // Test echo message
            const echoMessage = JSON.stringify({
                type: 'echo',
                payload: 'test message'
            });

            messageHandler(echoMessage);

            expect(mockWs.send).toHaveBeenCalledWith(
                JSON.stringify({
                    type: 'echo',
                    payload: 'test message'
                })
            );
        });

        test('should handle invalid JSON messages', () => {
            handleConnection(mockWs);

            // Get the message event handler
            const messageHandler = mockWs.on.mock.calls.find(
                call => call[0] === 'message'
            )[1];

            // Test invalid JSON
            messageHandler('invalid json');

            expect(mockWs.send).toHaveBeenCalledWith(
                JSON.stringify({
                    type: 'error',
                    message: 'Invalid message format'
                })
            );
        });
    });

    describe('Message Handler', () => {
        test('should handle echo messages', () => {
            const message = {
                type: 'echo',
                payload: 'test message'
            };

            handleMessage(mockWs, message);

            expect(mockWs.send).toHaveBeenCalledWith(
                JSON.stringify({
                    type: 'echo',
                    payload: 'test message'
                })
            );
        });

        test('should handle broadcast messages', () => {
            const message = {
                type: 'broadcast',
                payload: 'test broadcast'
            };

            // Create mock clients
            const mockClient1 = {
                send: jest.fn(),
                readyState: WebSocket.OPEN
            };
            const mockClient2 = {
                send: jest.fn(),
                readyState: WebSocket.OPEN
            };

            mockWs.clients.add(mockClient1);
            mockWs.clients.add(mockClient2);
            mockWs.clients.add(mockWs); // Add self to clients

            handleMessage(mockWs, message);

            // Should send to other clients but not self
            expect(mockClient1.send).toHaveBeenCalledWith(
                JSON.stringify({
                    type: 'broadcast',
                    payload: 'test broadcast'
                })
            );
            expect(mockClient2.send).toHaveBeenCalledWith(
                JSON.stringify({
                    type: 'broadcast',
                    payload: 'test broadcast'
                })
            );
            expect(mockWs.send).not.toHaveBeenCalled();
        });

        test('should handle unknown message types', () => {
            const message = {
                type: 'unknown',
                payload: 'test message'
            };

            handleMessage(mockWs, message);

            expect(mockWs.send).toHaveBeenCalledWith(
                JSON.stringify({
                    type: 'error',
                    message: 'Unknown message type'
                })
            );
        });
    });
}); 