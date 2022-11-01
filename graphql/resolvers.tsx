export const resolvers = {
  Query: {
    actions: (_parent, _args, ctx) => {
      return ctx.prisma.action.findMany()
    },
  },
}