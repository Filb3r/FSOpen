const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')
const { GraphQLError } = require('graphql')
const author = require('./models/author')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type Author {
    name: String!
    born: Int,
    id: ID!,
    bookCount: Int!
  }

  type Book {
  title: String!
  published: Int!
  author: Author
  genres: [String]!
  id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!  
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genres: [String], published: Int): [Book!]!
    allAuthors(name: String): [Author!]!
    me: User
  }

  type Mutation {
    addBook(
    title: String!
    published: Int!
    author: String!
    genres: [String!]!
    ): Book!

    editAuthor(
    name: String!
    setBornTo: Int!
    ): Author

    createUser(
    username: String!
    favoriteGenre: String!
    ): User

    login(
    username: String!
    password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const filters = {}

      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (author) {
          filters.author = author._id 
        }
      }
      if(args.genres){
        filters.genres = { $in: args.genres}
      }

      if (args.published) {
        filters.published = args.published
      }

      return Book.find(filters).populate('author')
    },
    allAuthors: async (root, args) => {
      return Author.find({})
    }
  },
  Author: {
    bookCount: async ({ _id }) => {
      const count = await Book.countDocuments({ author: _id })
      return count
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      const author = await Author.findOne({ name: args.author })

      if(!author){
        const createdAuthor = new Author({ name: args.author })
        await createdAuthor.save()
      }

      const book = new Book({...args, author: author._id})
      
      try {
        return book.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }

    },
    editAuthor: async(root, args) => {
      const author = await Author.findOne({ name: args.name })
      if(!author){
        return null
      }
      author.born = args.setBornTo

      try {
        return author.save()
      } catch (error) {
        throw new GraphQLError('Editing failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
