import React, { useState, useEffect } from "react";
import axios from "axios";
import Book from "@/components/Book";
import { useRouter } from "next/router";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search input state
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Fetch books based on searchTerm
  const fetchBooks = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get("/api/books", {
        params: { search: query }, // Send search query as parameter
      });
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
      setMessage("Failed to load books.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch books when component mounts or searchTerm changes
  useEffect(() => {
    fetchBooks(searchTerm);
  }, [searchTerm]);

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Book List</h1>

      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => router.push("/books/create")}
      >
        Create Book
      </button>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={handleSearch}
          className="border p-2 rounded w-full"
        />
      </div>

      {loading && <p className="text-gray-500">Loading books...</p>}

      {/* Message Display */}
      {message && <p className="text-red-500">{message}</p>}

      {/* Book List */}
      {!loading && books.length > 0 ? (
        <ul className="space-y-4">
          {books.map((book) => (
            <li key={book.id} className="border rounded p-4 shadow-md">
              <Book book={book} />
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p className="text-gray-500">No books found.</p>
      )}
    </div>
  );
};

export default BookList;
