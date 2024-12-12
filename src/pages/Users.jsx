import {useState, useEffect,} from 'react'
import axios from 'axios'

const Users = () => {
    const [users, setUsers] = useState([]);
    const [reload, setReload] = useState(false)
    const [editingUser, setEditingUser] = useState(null);
    const startEditing = (user) => {
      setEditingUser(user); 
    };
    const handleCreateUser = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const user = Object.fromEntries(formData);
      
        axios
          .post("http://localhost:3003/users", user)
          .then(() => {
            setReload((prev) => !prev);
            e.target.reset();
          })
          .catch((err) => console.error(err));
      };
    const handleDeleteUser = (id) => {
        axios
          .delete(`http://localhost:3003/users/${id}`)
          .then(() => setReload((prev) => !prev))
          .catch((err) => console.error(err));
    };
    const handleUpdateUser = (id) => {
        axios
          .put(`http://localhost:3003/users/${id}`, editingUser)
          .then(() => {
            setReload((prev) => !prev); 
            setEditingUser(null);
          })
          .catch((err) => console.error(err));
    };
    useEffect(() => {
        axios
          .get("http://localhost:3003/users")
          .then((res) => setUsers(res.data))
          .catch((err) => console.error(err));
    }, [reload]);

  return (
    <div>
        <form className='inputs' onSubmit={handleCreateUser}>
            <input type="text" name='img' placeholder='Img'/>
            <input type="text" name="name" placeholder="Name" required />
            <input type="email" name="email" placeholder="Email" required />
            <button>Add User</button>
        </form>

        <div className='header'>
            {users.map((user) => (
                <div className='card' key={user.id}>
                    <img className='card_img' src={user.img} />
                    <b>{user.name}</b>
                    <p>{user.email}</p>
                    <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                    <button onClick={() => startEditing(user)}>Edit</button>
                    <hr />
                </div>
            ))}
        </div>

        <form 
            className='inputs'
            onSubmit={(e) => {
                e.preventDefault();
                handleUpdateUser(editingUser.id);
            }}
            >
            <input
                type="text"
                name="img"
                placeholder="Img"
                value={editingUser?.img || ""}
                onChange={(e) =>
                setEditingUser({ ...editingUser, img: e.target.value })
                }
                required
            />
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={editingUser?.name || ""}
                onChange={(e) =>
                setEditingUser({ ...editingUser, name: e.target.value })
                }
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={editingUser?.email || ""}
                onChange={(e) =>
                setEditingUser({ ...editingUser, email: e.target.value })
                }
                required
            />
            <button type="submit">Update User</button>
        </form>
    </div>
  )
}

export default Users