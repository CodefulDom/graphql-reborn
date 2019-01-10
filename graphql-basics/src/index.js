import { GraphQLServer } from 'graphql-yoga'

// Scalar(Single Value)-String, Boolean, Int, Float, ID

// Type definitions
const typeDefs = `
  type Query {
    hello: String!
    name: String!
    location: String!
    bio: String!
  }
`

// Resolvers
const resolvers = {
  Query: {
    hello() {
      return `This is my first query!`
    },
    name() {
      return 'Dominique Israel Hallan'
    },
    location() {
      return 'St. Louis, Missouri'
    },
    bio() {
      return 'Hey! My name is Dominique and I love learning!'
    }
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => {
  console.log('Server Up!')
})