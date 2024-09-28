import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/user", {
          withCredentials: true, // Send the HTTPOnly cookie with the request
        });
        setUser(response.data);
      } catch (error) {
        console.log("Not authenticated", error);
        router.push("/login");
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <div className="">
        <button onClick={() => navigate("/books")}>Book List</button>
        <button onClick={() => navigate("/authors")}>Author List</button>
        {/* <a href="{route('books')}"></a> */}
      </div>
    </div>
  );
};

export default Dashboard;
