import { useEffect, useState } from "react";
import axios from "axios";

const BookPage = ({ book }) => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch authors from the API based on authorIds in the book object
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const authorPromises = book.authorIds.map(async (id) => {
          const response = await axios.get(`/api/authors/${id}`);
          return response.data;
        });
        const authorsData = await Promise.all(authorPromises);
        setAuthors(authorsData);
      } catch (error) {
        console.error("Error fetching authors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, [book.authorIds]);

  if (loading) {
    return <p className="text-center text-lg text-gray-500">Loading...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-6">
          {book.title}
        </h1>
        <p className="text-gray-700 text-lg mb-4 text-center">
          {book.description}
        </p>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Authors</h2>
          {authors.length > 0 ? (
            <ul className="list-disc pl-5 space-y-2">
              {authors.map((author) => (
                <li key={author.id} className="text-gray-700">
                  {author.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No authors available for this book.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Example static data fetching in Next.js
export async function getServerSideProps(context) {
  const { id } = context.params;

  // Fetch book data here based on the ID
  const response = await axios.get(`/api/books/${id}`);
  const book = response.data;

  return {
    props: { book }, // Will be passed to the page component as props
  };
}

export default BookPage;
