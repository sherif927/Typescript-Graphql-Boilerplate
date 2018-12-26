import { ResolverMap } from "../../types/graphql.utils";
import { GQL } from "../../types/schema";
import * as Bcrypt from 'bcryptjs';

export const resolvers: ResolverMap = {
  Query: {
    bye2: () => 'bye'
  },
  Mutation: {
    login: async (_, { email, password }: GQL.ILoginOnMutationArguments) => {
      return null;
    }
  }
};