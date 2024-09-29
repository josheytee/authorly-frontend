import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { apiFetch } from "../utils/api"; // Import the apiFetch utility
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Add state for search term
  const [errors, setErrors] = useState({});

  // Fetch books from the API, optionally including a search query
  async function getBooks(query = "") {
    try {
      const url = query ? `/api/books?search=${query}` : "/api/books";
      const data = await apiFetch(url, "GET", token);
      setBooks(data); // Set books from the response
    } catch (error) {
      setErrors(error.errors);
      console.error("Error fetching books:", error);
    }
  }

  // Trigger fetching books when the component mounts or the search term changes
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    getBooks(searchTerm);
  }, [token, searchTerm]); // Refetch books if token or searchTerm changes

  // Handle search input change
  function handleSearch(e) {
    setSearchTerm(e.target.value);
  }

  return (
    <>
      <h1 className="title">Latest Books</h1>

      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      {/* Show errors if any */}
      {errors && (
        <div className="error-messages">
          {Object.values(errors).map((error, idx) => (
            <p key={idx} className="error">
              {error}
            </p>
          ))}
        </div>
      )}

      {/* Book list */}
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
        <p>No books found</p>
      )}
    </>
  );
}
