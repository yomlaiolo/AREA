import { IoAdapter } from '@nestjs/platform-socket.io';
import * as socketio from 'socket.io';

export class SocketIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: socketio.ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.attach('/path', {
      cors: {
        origin: 'http://localhost:8081',
        methods: ['GET', 'POST'],
      },
    });
    return server;
  }
}
