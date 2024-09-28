import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { updateAuthor, fetchAuthors } from "../../../services/api";

const EditAuthor = () => {
  const router = useRouter();
  const { id } = router.query; // Get the author ID from the URL
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  // Fetch the author details on component load
  useEffect(() => {
    if (!id) return; // Ensure the ID is available before making requests

    const getAuthor = async () => {
      try {
        const response = await fetchAuthors();
        const author = response.data.find(
          (author) => author.id === parseInt(id)
        );
        if (author) setName(author.name);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch author details.");
      }
    };

    getAuthor();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await updateAuthor(id, { name });
      router.push("/authors"); // Navigate back to the authors list after successful update
    } catch (err) {
      console.log(err);
      setError("Failed to update author.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Edit Author
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Author Name"
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
            Update Author
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAuthor;
