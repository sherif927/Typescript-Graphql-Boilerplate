import * as Mongoose from 'mongoose';
(<any>Mongoose).Promise = require("bluebird");

/**
 ** The class responsible for instantiating
 ** a mongodb client for future transactions.
 *
 * @class MongoDb
 */
class MongoDb {

  /**
   **Method to initialize the mongodb client
   *
   * @memberof MongoDb
   */

  public async initializeDbConfig() {

    //Normalize environment variables and generate DB Uri
    const dbName = process.env['DB_NAME'];
    const dbAddress = process.env['DB_HOST'] || "127.0.0.1";
    const dbPort = process.env['DB_PORT'] || 27017;
    const uri = `mongodb://${dbAddress}:${dbPort}/${dbName}`;

    const options: Mongoose.ConnectionOptions = { useNewUrlParser: true };

    if (process.env['DB_AUTH'] === "true") {
      options["user"] = process.env.DB_USER;
      options["pass"] = process.env.DB_PASS;
    }

    try {
      await Mongoose.connect(uri, options);
      let message = `MongoDB Client connected successfully to URL:${uri}`;
      console.log(message);
    } catch (error) {
      let message = "Error connecting to the DB, Maybe it's not running?";
      console.error(message);
      process.exit(1);
    }
  }
}

export default new MongoDb();