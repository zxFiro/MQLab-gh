export const resolvers = {
  Query: {
    allActions: (_parent, _args, ctx) => {
      return ctx.prisma.action.findMany(
        {where: {
          createdAt:{gte:_args.dmin,lte:_args.dmax},
          value:{equals:_args.value,},
        },orderBy: [
          {id:'asc'}],
        }
      )
    },
  },
  Mutation: {
    addAction: (_parent, args, ctx) => {
      return ctx.prisma.action.create({
        data: {
          inputType:args.inputType,
          view:args.view,
          usertype:args.usertype,
          action:args.action,
          userId:args.userId,
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
    fix: (_parent, args, ctx) => {
      return ctx.prisma.action.update({
        data:{
          fixedSuccess:args.newsucc,
        },
        where:{
          id:args.id,
        }
      })
    },
  },
}