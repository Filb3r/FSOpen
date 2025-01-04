import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'


const Recommended = ({show, user}) => {
    const favoriteGenre = user?.data?.me.favoriteGenre
    const books = useQuery(ALL_BOOKS, {
        variables: {genres: favoriteGenre},
        skip: !favoriteGenre
    })

    if (!show) {
        return null
    }

    if (books.data != null) { 
        return(
            <div>
                <h2>recommendations</h2>
                books in your favorite genre <strong>{favoriteGenre}</strong>
                <table>
                    <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {books.data.allBooks.map((a) => (
                        <tr key={a.title}>
                        <td>{a.title}</td>
                        <td>{a.author.name}</td>
                        <td>{a.published}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
        }
}

export default Recommended