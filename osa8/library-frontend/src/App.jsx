import { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm"
import { useApolloClient } from "@apollo/client";

const App = () => {
  const [page, setPage] = useState("authors")
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('library-user-token');
    if (token) {
      setToken(token);
    }
  }, [])

  const handleClick = () => {
    if(token) {
      setToken(null)
      localStorage.clear()
      client.resetStore()
      setPage("authors")
    } else {
      setPage("login")
    }
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && <button onClick={() => setPage("add")}>add book</button>}
        <button onClick={handleClick}>{token ? 'logout' : 'login'}</button>
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <LoginForm show={page === "login"} setToken={setToken} setPage={setPage}/>
    </div>
  );
};

export default App;
