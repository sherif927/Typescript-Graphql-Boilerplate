import { ResolverMap } from "../../types/graphql.utils";
import { GQL } from "../../types/schema";
import UserService from "../../services/UserService";

export const resolvers: ResolverMap = {
  Query: {
    bye2: () => 'bye'
  },
  Mutation: {
    login: async (_, { email, password }: GQL.ILoginOnMutationArguments) => {
      const result = await UserService.login(email, password);
      return result;
    }
  }
};