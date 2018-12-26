import * as dotenv from "dotenv";

/**
 ** Class responsible for handling
 ** and initializing the environment variables.
 *
 * @export
 * @class EnvironmentConfig
 */
export class EnvironmentConfig {

  private path: string;
  public environment: string = (process.env.NODE_ENV || 'development').trim();

  /**
   * @constructor
   */

  constructor() {
    dotenv.config();
  }

  /**
   ** sets the path of the needed 
   ** environment (.env) file
   *
   * @memberof EnvironmentConfig
   */

  public initializeEnvironment(): void {
    switch (this.environment) {
      case "test":
        this.path = `${__dirname}/../env/.env`;
        break;
      case "production":
        this.path = `${__dirname}/../env/.env.production`;
        break;
      default:
        this.path = `${__dirname}/../env/.env.development`;
    }
    dotenv.config({ path: this.path });
  }
}


export default new EnvironmentConfig();


