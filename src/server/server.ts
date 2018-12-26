import 'reflect-metadata';
import EnvironmentConfig from '../config/config';
import MongoDbConfig from '../config/db.config';

export class Server {

  constructor() {
    EnvironmentConfig.initializeEnvironment();
  }

  public static bootstrap(): Server {
    return new Server();
  }

  public initialize(): Promise<Server> {
    return new Promise(async (resolve: Function, reject: Function) => {
      await MongoDbConfig.initializeDbConfig();
      resolve(this);
    });
  }
}

//reject({message:'Failed to initialize server'})