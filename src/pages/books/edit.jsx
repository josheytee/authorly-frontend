import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { updateBook, fetchBooks } from "../../services/api"; // Update the path as needed

const EditBook = () => {
  const router = useRouter();
  const { id } = router.query; // Get the book ID from the URL
  const [title, setTitle] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [error, setError] = useState("");

  // Fetch the book details on component load
  useEffect(() => {
    if (!id) return; // Ensure the ID is available before making requests

    const getBook = async () => {
      try {
        const response = await fetchBooks();
        const book = response.data.find((book) => book.id === parseInt(id));
        if (book) {
          setTitle(book.title);
          setAuthorId(book.author_id);
        }
      } catch (err) {
        console.log(err);
        setError("Failed to fetch book details.");
      }
    };

    getBook();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await updateBook(id, { title, author_id: authorId });
      router.push("/books"); // Navigate back to the books list after successful update
    } catch (err) {
      console.log(err);
      setError("Failed to update book.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Edit Book
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Book Title"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="authorId"
              className="block text-sm font-medium text-gray-700"
            >
              Author ID
            </label>
            <input
              id="authorId"
              type="number"
              value={authorId}
              onChange={(e) => setAuthorId(e.target.value)}
              placeholder="Author ID"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
