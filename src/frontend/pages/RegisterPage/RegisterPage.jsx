
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8080/auth/register', {
        username,
        password,
      });
      console.log('Registration successful:', response.data);
      navigate("/login");
    } catch (error) {
      console.error('Registration failed:', error.response.data);
    }
  };

  return (
    <div className="login_container">
    <form className='form'>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button type="button" onClick={handleRegister}>
        Register
      </button>
    </form>
    </div>
  );
};

export default RegisterPage;