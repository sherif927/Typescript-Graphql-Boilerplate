import { GQL } from "../../types/schema";
import { ResolverMap } from "../../types/graphql.utils";

export const resolvers: ResolverMap = {
  Query: {
    bye: () => 'bye'
  },
  Mutation: {
    register: async (_, { name, email, password, phoneNumber }: GQL.IRegisterOnMutationArguments) => {
      return null;
    }
  }
};