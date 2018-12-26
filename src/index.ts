import { Server } from './server/server';

Server.bootstrap().initialize().then((serverInstance: Server) => {
  console.log(`Server running successfully on ${process.env['BASE_URL']}`);
}).catch((error: any) => {
  console.log(error);
});