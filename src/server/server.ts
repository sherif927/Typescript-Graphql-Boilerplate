import 'reflect-metadata';
import EnvironmentConfig from '../config/config';
import MongoDbConfig from '../config/db.config';
import GraphQlSchemaAssembler from '../startup/graphql-assembly';
import { Server as HttpServer } from 'http';
import { Server as HttpsServer } from 'https';
import { GraphQLServer } from 'graphql-yoga';


/**
 * @export
 * @class Server
 */
export class Server {

  public AppServerInstance: HttpServer | HttpsServer;

  constructor() {
    EnvironmentConfig.initializeEnvironment();
  }

  /**
   ** bootstraps the application
   *
   * @static
   * @returns {Server}
   * @memberof Server
   */

  public static bootstrap(): Server {
    return new Server();
  }


  /**
   ** connects to the db, merges the schema
   ** and starts up the graphql server
   
   * @returns {(Promise<HttpServer | HttpsServer>)}
   * @memberof Server
   */

  public initialize(): Promise<HttpServer | HttpsServer> {
    return new Promise(async (resolve: Function, reject: Function) => {
      await MongoDbConfig.initializeDbConfig();
      const schema = GraphQlSchemaAssembler.generateAndMergeSchemas();
      const server = new GraphQLServer({ schema });
      this.AppServerInstance = await server.start();
      resolve(this.AppServerInstance);
    });
  }
}