const { GraphQLServer } = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')
const utils = require('./utils')

const prisma = new PrismaClient()

const resolvers = {
  Query: {
    posts: async (_parent, args, context) => {
      return context.utils.paginate(args.paginationInput, context, 'post')
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: (context) => ({
    ...context,
    prisma,
    utils
  })
})

server.start({
  port: 3000
}, function() {
  console.log('Server is running on http://localhost:3000')
})