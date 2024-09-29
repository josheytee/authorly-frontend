import { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

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

    const res = await fetch("http://127.0.0.1:8000/api/authors", {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Set the content type
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.errors) {
      setErrors(data.errors);
    } else {
      navigate("/");
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
