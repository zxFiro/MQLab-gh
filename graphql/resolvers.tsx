export const resolvers = {
  Query: {
    actions: (_parent, _args, ctx) => {
      return ctx.prisma.action.findMany()
    },
  },
  Mutation: {
    addAction: (_parent, args, ctx) => {
      return ctx.prisma.action.create({
        data: {
          expression:args.expression,
          expstep:args.expstep,
          label:args.label,
          success:args.success,
          value:args.value,
        },
      })
    },
    addUser: (_parent, args, ctx) => {
      return ctx.prisma.user.create({
        data: {
          usertype:args.usertype,
        },
      })
    },
    updateUser: (_parent, args, ctx) => {
      return ctx.prisma.user.update({
        data: {
          usertype:args.usertype,
        },
        where: {
          id:args.id,
        }
      })
    },
  },
}