import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { apiFetch } from "../../utils/api";

export default function UpdateBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useContext(AppContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    published_at: null,
    author_id: 0,
  });
  const [authors, setAuthors] = useState([]);

  const [errors, setErrors] = useState({});

  async function getBook() {
    try {
      const data = await apiFetch(`/api/books/${id}`, "GET", token);
      setFormData({
        title: data.title,
        description: data.description,
        published_at: data.published_at,
        author_id: data.author_id,
      });
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }

  async function getAuthors() {
    try {
      const data = await apiFetch(`/api/authors`, "GET", token);
      setAuthors(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();

    const data = await apiFetch(`/api/books/${id}`, "PUT", token, formData);
    console.log(data);

    if (data.errors) {
      setErrors(data.errors);
    } else {
      navigate("/");
    }
  }

  useEffect(() => {
    getBook();
    getAuthors();
  }, []);

  return (
    <>
      <h1 className="title">Update your post</h1>

      <form onSubmit={handleUpdate} className="w-1/2 mx-auto space-y-6">
        <div>
          <input
            type="text"
            placeholder="Post Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          {errors.title && <p className="error">{errors.title[0]}</p>}
        </div>
        <div>
          <input
            type="date"
            placeholder="Post Published "
            value={formData.published_at}
            onChange={(e) =>
              setFormData({ ...formData, published_at: e.target.value })
            }
          />
          {errors.published_at && (
            <p className="error">{errors.published_at[0]}</p>
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

        <div>
          <textarea
            rows="6"
            placeholder="Post Content"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          ></textarea>
          {errors.description && (
            <p className="error">{errors.description[0]}</p>
          )}
        </div>

        <button className="primary-btn">Update</button>
      </form>
    </>
  );
}
