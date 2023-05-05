import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (!id) {
      setLoading(false);
      return;
    }

    fetch(`https://dummyjson.com/users/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch user data");
        }
      })
      .then((data) => {
        dispatch({
          type: "SET_USER",
          payload: data,
        });
        setUser(data);
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, userId]);

  return (
    <div className="profile">
      <h2>Profile</h2>
      {loading && <p>Loading user data...</p>}
      {!loading && user && (
        <div>
          <img src={user.image} alt="Profile" />
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>ID: {user.id}</p>
          <p>Gender: {user.gender}</p>
        </div>
      )}
      {!loading && !user && <p>No user data found</p>}
    </div>
  );
}

export default Profile;
