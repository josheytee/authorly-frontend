import React, { useState } from "react";
import { useRouter } from "next/router";
import { createAuthor } from "../../services/api";

const CreateAuthor = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAuthor({ name });
      router.push("/authors");
    } catch (err) {
      setError("Failed to create author.");
    }
  };

  return (
    <div>
      <h2>Create Author</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <button type="submit">Create</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default CreateAuthor;
