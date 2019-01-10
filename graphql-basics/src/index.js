import { GraphQLServer } from 'graphql-yoga'

// Scalar(Single Value)-String, Boolean, Int, Float, ID

// Type definitions
const typeDefs = `
  type Query {
    title: String!
    price: Float!
    releaseYear: Int!
    rating: Float!
    inStock: Boolean!
  }
`

// Resolvers
const resolvers = {
  Query: {
    title() {
      return 'Return of the Mack'
    },
    price() {
      return 29.99
    },
    releaseYear() {
      return 1994
    },
    rating() {
      return 5.0
    },
    inStock() {
      return false
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