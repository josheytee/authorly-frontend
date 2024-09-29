import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { apiFetch } from "../../utils/api";

export default function ShowBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useContext(AppContext);

  const [book, setBook] = useState(null);

  async function getBook() {
    try {
      const data = await apiFetch(`/api/books/${id}`, "GET", token);
      setBook(data); // Set books from the response
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }

  async function handleDelete(e) {
    e.preventDefault();

    // if (user && user.id === post.user_id) {

    const data = await apiFetch(`/api/books/${id}`, "DELETE", token);
    if (data) {
      navigate("/");
    }
    // }
  }

  useEffect(() => {
    getBook();
  }, []);

  return (
    <>
      {book ? (
        <div
          key={book.id}
          className="mt-4 p-4 border rounded-md border-dashed border-slate-400"
        >
          <div className="mb-2 flex items-start justify-between">
            <div>
              <h2 className="font-bold text-2xl">{book.title}</h2>
              <small className="text-xs text-slate-600">
                Created by {book.author.name} on{" "}
                {new Date(book.created_at).toLocaleTimeString()}
              </small>
            </div>
          </div>
          <p>{book.description}</p>

          {user && (
            <div className="flex items-center justify-end gap-4">
              <Link
                to={`/books/update/${book.id}`}
                className="bg-green-500 text-white text-sm rounded-lg px-3 py-1"
              >
                Update
              </Link>

              <form onSubmit={handleDelete}>
                <button className="bg-red-500 text-white text-sm rounded-lg px-3 py-1">
                  Delete
                </button>
              </form>
            </div>
          )}
        </div>
      ) : (
        <p className="title">Book not found!</p>
      )}
    </>
  );
}
