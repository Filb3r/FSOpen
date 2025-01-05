import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries' 

const Books = (props) => {
  const [filter, setFilter] = useState(null)
  const {data, loading, refetch } = useQuery(ALL_BOOKS, {
    variables: {genres: filter ? [filter] : null}
  }) 

  useEffect(() => {
    if(data) {
      refetch()
    }
  },[filter])
  
  if (!props.show) {
    return null
  }

  if(loading) {
    return <div>loading....</div>
  }

  const books = data.allBooks

  const allGenres = [...new Set(books.flatMap(book  => book.genres))]
 
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setFilter(null)}>all</button>
      {allGenres.map((genre) => (
        <button key={genre} onClick={() => setFilter(genre)}>{genre}</button>
      ))}
    </div>
  )
}

export default Books
