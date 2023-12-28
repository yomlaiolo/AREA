// notification.gateway.ts
import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';

@WebSocketGateway()
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;

  handleConnection(client: any) {
    // Gérer la connexion d'un client
  }

  handleDisconnect(client: any) {
    // Gérer la déconnexion d'un client
  }

  @SubscribeMessage('sendNotification')
  async handleNotification(client, payload) {
    // Logique pour envoyer des notifications aux clients connectés
    this.server.emit('notification', payload);
  }
}
