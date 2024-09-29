import { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../utils/api";

export default function CreateAuthor() {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
  });

  const [errors, setErrors] = useState({});

  async function handleCreate(e) {
    e.preventDefault();

    try {
      const data = await apiFetch("/api/authors", "POST", token, formData);
      navigate("/"); // Navigate on successful creation
    } catch (error) {
      // Handle validation errors
      if (error.message.includes("validation")) {
        setErrors(error.errors);
      } else {
        console.error("Error creating author:", error);
      }
    }
  }

  return (
    <>
      <h1 className="title">Create a new Author</h1>

      <form onSubmit={handleCreate} className="w-1/2 mx-auto space-y-6">
        <div>
          <input
            type="text"
            placeholder="Author Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <p className="error">{errors.name[0]}</p>}
        </div>

        <div>
          <textarea
            rows="6"
            placeholder="Author Bio"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          ></textarea>
          {errors.bio && <p className="error">{errors.bio[0]}</p>}
        </div>

        <button className="primary-btn">Create</button>
      </form>
    </>
  );
}
