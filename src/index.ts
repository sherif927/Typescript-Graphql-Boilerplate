import { Server } from './server/server';
import { Server as HttpServer } from 'http';
import { Server as HttpsServer } from 'https';

Server.bootstrap().initialize().then((serverInstance: HttpServer | HttpsServer) => {
  console.log(`Server running successfully on ${process.env['BASE_URL']} ✅`);
}).catch((error: any) => {
  console.log(error);
});