import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { apiFetch } from "../utils/api"; // Import the apiFetch utility

export default function Home() {
  const [books, setBooks] = useState([]);
  const { token } = useContext(AppContext);

  async function getAuthors() {
    try {
      const data = await apiFetch("/api/authors", "GET", token);
      setAuthors(data); // Set authors from the response
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  }

  useEffect(() => {
    getAuthors();
  }, [token]); // Refetch when token changes

  async function getBooks() {
    try {
      const data = await apiFetch("/api/books", "GET", token);
      setBooks(data); // Set books from the response
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }

  useEffect(() => {
    getBooks();
  }, [token]); // Add token as a dependency

  return (
    <>
      <h1 className="title">Latest Books</h1>

      {books.length > 0 ? (
        books.map((book) => (
          <div
            key={book.id}
            className="mb-4 p-4 border rounded-md border-dashed border-slate-400"
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <h2 className="font-bold text-2xl">{book.title}</h2>
                <small className="text-xs text-slate-600">
                  Created by {book.author.name} on{" "}
                  {new Date(book.created_at).toLocaleTimeString()}
                </small>
              </div>
              <Link
                to={`/books/${book.id}`}
                className="bg-blue-500 text-white text-sm rounded-lg px-3 py-1"
              >
                Read more
              </Link>
            </div>
            {/* <p>{book.body}</p> */}
          </div>
        ))
      ) : (
        <p>There are no books yet</p>
      )}
    </>
  );
}
