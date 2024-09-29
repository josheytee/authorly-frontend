// src/components/CreateBook/CreateBook.js

import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../../utils/api";

export default function CreateBook() {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author_id: "",
  });
  const [authors, setAuthors] = useState([]);
  const [errors, setErrors] = useState({});

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

  async function handleCreate(e) {
    e.preventDefault();

    try {
      const data = await apiFetch("/api/books", "POST", token, formData);
      navigate("/"); // Navigate on successful creation
    } catch (error) {
      // Handle validation errors
      if (error.message.includes("validation")) {
        setErrors(error.errors);
      } else {
        console.error("Error creating book:", error);
      }
    }
  }

  return (
    <>
      <h1 className="title">Create a new Book</h1>
      <form onSubmit={handleCreate} className="w-1/2 mx-auto space-y-6">
        <div>
          <input
            type="text"
            placeholder="Book Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          {errors.title && <p className="error">{errors.title[0]}</p>}
        </div>

        <div>
          <textarea
            rows="6"
            placeholder="Book Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          ></textarea>
          {errors.description && (
            <p className="error">{errors.description[0]}</p>
          )}
        </div>

        <div>
          <select
            value={formData.author_id}
            onChange={(e) =>
              setFormData({ ...formData, author_id: e.target.value })
            }
          >
            <option value="">Select Author</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
          {errors.author_id && <p className="error">{errors.author_id[0]}</p>}
        </div>

        <button className="primary-btn">Create</button>
      </form>
      <div className="w-1/2 mx-auto mt-5 space-y-6">
        <Link to={`/authors/create`} className="bg-gray-500 primary-btn">
          Or Create Author
        </Link>
      </div>
    </>
  );
}
