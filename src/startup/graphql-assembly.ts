import * as path from 'path';
import * as fs from 'fs';
import { GraphQLSchema } from "graphql";
import { applyMiddleware } from "graphql-middleware";
import { mergeSchemas, makeExecutableSchema } from "graphql-tools";
import { importSchema } from 'graphql-import';
import { loggerMiddleware } from '../middleware/logging.middleware';
import { authMiddleware } from '../middleware/auth.middleware';



/**
 ** Class responsible for rounds all the schema
 ** files in the src directory and merging them
 *
 * @class GraphqlSchemaAssembler
 */
class GraphqlSchemaAssembler {

  /**
   ** method that merges the schema
   ** and applies the middleware, if needed
   *
   * @returns {GraphQLSchema}
   * @memberof GraphqlSchemaAssembler
   */

  public generateAndMergeSchemas(): GraphQLSchema {
    const schemas: GraphQLSchema[] = [];
    const folders = fs.readdirSync(path.join(__dirname, "../modules"));

    folders.forEach((folder) => {
      const { resolvers } = require(`../modules/${folder}/${folder}.resolvers`);
      const typeDefs = importSchema(path.join(__dirname, `../modules/${folder}/schema.graphql`));

      schemas.push((folder != 'registration' && folder != 'login') ?
        applyMiddleware(makeExecutableSchema({ resolvers, typeDefs }), loggerMiddleware, authMiddleware) :
        applyMiddleware(makeExecutableSchema({ resolvers, typeDefs }), loggerMiddleware));
    });
    return mergeSchemas({ schemas });
  }
}

export default new GraphqlSchemaAssembler();