import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const MyFormComponent: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    signup: false
  });

  const checkCredentials = async () => {
    try {
      const response = await fetch(`http://localhost:4001/user/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user_id', data.data.id);
        localStorage.setItem('progress', data.data.progress);
        localStorage.setItem('level', data.data.level);
        console.log('Login successful');
        window.location.href = "/";
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error adding message", error);
    }
  };

  const createCredentials = async () => {
    try {
      const response = await fetch(`http://localhost:4001/user/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        }),
      });
      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem('token', token);
        console.log('User created');
        window.location.href = "/";
      } else {
        console.error("Failed to create user");
      }
    } catch (error) {
      console.error("Error adding message", error);
    }
  };

  const handleSubmitLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.signup) {
      checkCredentials();
    } else {
      setFormData({ ...formData, signup: false });
    }
  };

  const handleSubmitSignup = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (formData.signup) {
      console.log('Username:', formData.username);
      console.log('Password:', formData.password);
      console.log('Email:', formData.email);
      createCredentials();
    } else {
      setFormData({ ...formData, signup: true });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmitLogin} className='center'>
      <TextField
        className="width-rg"
        id="Username"
        label="Username"
        variant="outlined"
        InputLabelProps={{ style: { color: '#1976d2' } }}
        InputProps={{ style: { color: '#1976d2' } }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#1976d2' },
            '&:hover fieldset': { borderColor: 'white' },
            '&.Mui-focused fieldset': { borderColor: 'white' },
          },
        }}
        name="username"
        value={formData.username}
        onChange={handleInputChange}
      />
      <div className='div-login-one' />
      {formData.signup ?
        <div>
          <TextField
            className="width-rg"
            id="email"
            label="Email"
            variant="outlined"
            InputLabelProps={{ style: { color: '#1976d2' } }}
            InputProps={{ style: { color: '#1976d2' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#1976d2' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' },
              },
            }}
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <div className='div-login-one' />
        </div> : ''
      }
      <TextField
        className="width-rg login-form"
        id="password"
        label="Password"
        variant="outlined"
        InputLabelProps={{ style: { color: '#1976d2' } }}
        InputProps={{ style: { color: '#1976d2' } }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#1976d2' },
            '&:hover fieldset': { borderColor: 'white' },
            '&.Mui-focused fieldset': { borderColor: 'white' },
          },
        }}
        name="password"
        type="password"
        value={formData.password}
        onChange={handleInputChange}
      />
      <div className="div-login-two" />
      <div className='login-signup'>
        <Button onClick={handleSubmitSignup} variant="outlined">Signup</Button>
        <div className='div-login-three' />
        <Button type="submit" variant="outlined">Login</Button>
      </div>
    </form>
  );
};

const Login: React.FC = () => {
  return (
    <div className='height-full center login-page'>
      <div className='login-title'>
        <h1>Welcome to Quizzer</h1>
        <p>The quiz for junior devs!</p>
      </div>
      <div></div>
      <MyFormComponent />
    </div>
  );
};

export default Login;
