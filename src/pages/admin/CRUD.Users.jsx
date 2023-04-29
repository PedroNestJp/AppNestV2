import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

function CrudUsers() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [updatingUser, setUpdatingUser] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersFromFirestore = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setUsers(usersFromFirestore);
    };
    getUsers();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "users"), newUser);
    setUsers([...users, newUser]);
    setNewUser({ name: "", email: "" });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    await updateDoc(collection(db, "users"), updatingUser.id, updatingUser);
    const updatedUsers = users.map((user) => {
      if (user.id === updatingUser.id) {
        return updatingUser;
      }
      return user;
    });
    setUsers(updatedUsers);
    setUpdatingUser(null);
  };

  const handleDeleteUser = async (id) => {
    await deleteDoc(collection(db, "users"), id);
    const filteredUsers = users.filter((user) => user.id !== id);
    setUsers(filteredUsers);
  };

  return (
    <div>
      <form onSubmit={handleAddUser}>
        {" "}
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button type="submit">Add User</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => setUpdatingUser(user)}>Edit</button>
                <button onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {updatingUser && (
        <form onSubmit={handleUpdateUser}>
          <input
            type="text"
            placeholder="Name"
            value={updatingUser.name}
            onChange={(e) =>
              setUpdatingUser({ ...updatingUser, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Email"
            value={updatingUser.email}
            onChange={(e) =>
              setUpdatingUser({ ...updatingUser, email: e.target.value })
            }
          />
          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
}

export default CrudUsers;
