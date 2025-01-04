import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommended = ({show}) => {
    const user = useQuery(ME)
    console.log("printing user:", user)

    const favoriteGenre = user?.me?.favoriteGenre

    if(user.data !== undefined) {
        console.log("userdata:::: ", user.data)
        /* 
        FETCHAA ALLBOOKSIT ANTAMALLA  favoriteGENRE!! MUUTEN PALAUTETAAN JOTAIN MUUTA.
        */
    }
    
    if (!show) {
        return null
    }

    /*
    return(
        <div>
            <h2>recommendations</h2>
            books in your favorite genre <strong>genre taha</strong>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>author</th>
                    <th>published</th>
                </tr>
                {booksData.allBooks.map((a) => (
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
        */

    return(
        <div>
            testi
        </div>
    )

}

export default Recommended