import { ResolverMap } from '../../types/graphql.utils';
import UserService from '../../services/UserService';
import { GQL } from '../../types/schema';
import User from '../../typegoose-models/User.model';

export const resolvers: ResolverMap = {
  Query: {
    bye: () => 'bye'
  },
  Mutation: {
    register: async (_, { name, email, password, phoneNumber }: GQL.IRegisterOnMutationArguments) => {
      const user = { name, email, password, phoneNumber }
      const results = await UserService.createUser(user as User);
      return results;
    }
  }
};