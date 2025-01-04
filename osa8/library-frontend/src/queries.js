import { gql } from '@apollo/client'

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
    value
    }
}
`
export const ALL_BOOKS = gql`
query allBooks($author: String, $genres: [String], $published: Int) {
  allBooks(author: $author, genres: $genres, published: $published) {
    title,
    published,
    author{
    name
    },
    id
  }
}
`

export const CREATE_BOOK = gql`
  mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(
    title: $title,
    published: $published,
    author: $author,
    genres: $genres
    ) {
      title
      published
      author{
      name
      }
      id
      genres
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name,
      born,
      bookCount,
      id
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`