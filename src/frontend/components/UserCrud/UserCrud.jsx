import React, { useState } from 'react';
import './UserCrud.css'; 
import Header from '../Header/Header';

const UserCrud = (props) => {
  const [users, setUsers] = useState([
    { id: 1, username: 'admin', password: 'password' },
    { id: 2, username: 'kirostina', password: 'password' },
  ]);

  const [newUser, setNewUser] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = () => {
    if (!newUser.username || !newUser.password) {
        setError('Please fill in all fields.');
        return;
      }
    setUsers([...users, { id: users.length + 1, ...newUser }]);
    setNewUser({ username: '', password: '' });
    setError('');
  };

  const handleUpdateUser = (id) => {
    const selectedUser = users.find((user) => user.id === id);
    if (selectedUser) {
        setNewUser({ username: selectedUser.username, password: selectedUser.password });
      }
    if (!newUser.username || !newUser.password) {
        setError('Please fill in all fields.');
        return;
      }
  
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, ...newUser } : user
    );
    setUsers(updatedUsers);
    setNewUser({ username: '', password: '' });
    setError('');
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className=''>
      <Header userRole={props.userRole} setUserRole={props.setUserRole}/>
      <div className="user-table-container">
        <h2>User Table</h2>
        <div className="add-user-form">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={newUser.username}
            onChange={handleInputChange}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={newUser.password}
            onChange={handleInputChange}
          />
          <button onClick={handleAddUser} className="add-user-btn">
            Add User
          </button>
          {error && <p className="error-message">{error}</p>}
        </div>
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>
                  <button
                    onClick={() => handleUpdateUser(user.id)}
                    className="update-btn"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserCrud;
