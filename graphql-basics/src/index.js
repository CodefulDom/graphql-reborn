import { GraphQLServer } from 'graphql-yoga'

// Scalar(Single Value)-String, Boolean, Int, Float, ID

// Type definitions
const typeDefs = `
	type Query {
		users(query: String): [User!]!
		posts(query: String): [Post!]!
		me: User!
		post: Post!
		comments: [Comment!]!
	}

	type User {
		id: ID!
		name: String!
		email: String!
		age: Int
		posts: [Post!]!
	}

	type Post {
		id: ID!
		title: String!
		body: String!
		published: Boolean!
		author: User!
	}

	type Comment {
		id: ID!
		text: String!
	}
 `
	const comments = [{
		id: '102',
		text: 'This chicken taste like crap.'
	},{
		id: '201',
		text: 'Where are my pants?'
	},{
		id: '103',
		text: 'Why is it always so damn hot in here?'
	},{
		id: '203',
		text: 'Love you, pops.'
	}]

 const users = [{
	 id: '1',
	 name: 'Dominique',
	 email: 'dom@volley.com',
	 age: 35
 },{
	 id: '2',
	 name: 'Elijah',
	 email: 'elijah@volley.com',
	 age: 3
 }]

 // Dummy Data
 const posts = [{
	 id: '1',
	 title: "First Post",
	 body: "First.",
	 published: false,
	 author: '1'
 },{
	id: '2',
	title: "Second Post",
	body: "Second.",
	published: true,
	author: '2'
 },{
	id: '3',
	title: "Third Post",
	body: "Third.",
	published: true,
	author: '1'
 }]


// Resolvers
const resolvers = {
  Query: {
		comments(parent, args, ctx, info) {
			return comments
		},
		posts(parent, args, ctx, info) {
			if (!args.query) {
				return posts
			}

			return posts.filter((post) =>{
				return post.title.toLowerCase().includes(args.query.toLowerCase()) && post.body.toLowerCase().includes(args.query.toLowerCase())
			})
		},
		users(parent, args, ctx, info) {
			if (!args.query) {
				return users
			}

			return users.filter((user) => {
				return user.name.toLowerCase().includes(args.query.toLowerCase())
			})
		},
		me() {
			return {
				id: 'A123456',
				name: 'Mike',
				email: 'mikejones@getMaxListeners.com'
			}
		},
		post() {
			return {
				id: '432432432423',
				title: 'Playing Around in the Editor',
				body: 'This blog post is hella lame.',
				published: false
			}
		}
	},
	Post: {
		author(parent, args, ctx, info) {
		return users.find((user) =>{
				return user.id === parent.author
			})
		}
	},
	User: {
		posts(parent, args, ctx, info) {
			return posts.filter((post) => {
				return post.author === parent.id
			})
		}
	},
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => {
  console.log('Server Up!')
})
