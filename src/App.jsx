import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppContext } from "./Context/AppContext";
import { useContext } from "react";

import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import Create from "./Pages/Posts/Create";
import CreateBook from "./Pages/Books/CreateBook";
import CreateAuthor from "./Pages/Authors/CreateAuthor";
import BookList from "./Pages/Books/BookList";
import Show from "./Pages/Posts/Show";
import Update from "./Pages/Posts/Update";
import "./App.css";

export default function App() {
  const { user } = useContext(AppContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />

          <Route
            path="/books/create"
            element={user ? <CreateBook /> : <Login />}
          />
          <Route path="/books/:id" element={user ? <Create /> : <Login />} />
          <Route path="/books" element={user ? <BookList /> : <Login />} />

          <Route
            path="/authors/create"
            element={user ? <CreateAuthor /> : <Login />}
          />
          <Route path="/authors/:id" element={user ? <Create /> : <Login />} />
          <Route path="/authors" element={user ? <Create /> : <Login />} />

          <Route path="/create" element={user ? <Create /> : <Login />} />

          <Route path="/posts/:id" element={<Show />} />

          <Route
            path="/posts/update/:id"
            element={user ? <Update /> : <Login />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
