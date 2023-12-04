
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        username,
        password,
      });
  
      const { jwt } = response.data;
      console.log(jwt);
      localStorage.setItem('jwtToken', jwt);
  
      console.log('Login successful:', response.data);
      navigate("/");
    } catch (error) {
      console.error('Login failed:', error.response.data);
    }
  };
  

  return (
    <div className='login_container'>

    
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
      <button type="button" onClick={handleLogin}>
        Login
      </button>
    </form>
    </div>
  );
};

export default LoginPage;