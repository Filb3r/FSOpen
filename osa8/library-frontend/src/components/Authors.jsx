import { gql, useMutation, useQuery } from '@apollo/client'
import { useState, React } from 'react'
import Select from 'react-select'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name,
      born,
      bookCount,
      id
    }
  }
`

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

const Authors = (props) => {
  const [name, setName] = useState('')
  const [birthyear, setBirthyear] = useState('')

  const [ changeBirthYear ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const authors = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  if(authors.loading) {
    return <div>loading....</div>
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    changeBirthYear({ variables: { name, setBornTo: parseInt(birthyear, 10) } })

    setName('')
    setBirthyear('')
  }

  const authorToSelect = authors.data.allAuthors.map( author => ({
    value: author.name,
    label: author.name
  }))

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name
          <Select options={authorToSelect} value={authorToSelect.find(option => option.value === name)} onChange={(selectedOption) => setName(selectedOption.value)}/>
        </div>
        <div>
          born
          <input
          value={birthyear}
          onChange={({ target }) => setBirthyear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
