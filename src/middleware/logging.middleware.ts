export const loggerMiddleware = async (resolve, parent, args, context, info) => {
  // You can you middleware to override arguments
  const argsWithDefault = { name: 'Bob', ...args }
  const result = await resolve(parent, argsWithDefault, context, info)
  // Or change the returned values of resolvers
  console.log('logger');
  return result;
}
