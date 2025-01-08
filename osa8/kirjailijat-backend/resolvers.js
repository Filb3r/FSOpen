const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')


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
        filters.genres = { $in: args.genres }
      }

      if (args.published) {
        filters.published = args.published
      }

      return Book.find(filters).populate('author')
    },
    allAuthors: async (root, args) => {
      console.log('allAuthors check')
      return Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async ({ _id }) => {
      console.log('bookCount check')
      const count = await Book.countDocuments({ author: _id })
      return count
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      let author = await Author.findOne({ name: args.author })
      const currentUser = context.currentUser

      if(!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      if(!author){
        author = new Author({ name: args.author })
        await author.save()
      }

      const book = new Book({...args, author: author._id})
      
      try {
        await book.save()
        
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      
      const populatedBook = await book.populate('author')

      pubsub.publish('BOOK_ADDED', { bookAdded: populatedBook})

      return populatedBook
    },
    editAuthor: async (root, args, context) => {
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
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if(!user || args.password !== 'secret') {
        throw new GraphQLError('Wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET)}
    }
  },
  Subscription: {
    bookAdded: {
        subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED')
        },
    },
}

module.exports = resolvers