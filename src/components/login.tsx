import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

class MyFormComponent extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    signup: false,
    token: ''
  };

  checkCredentials = async () => {
    try {
      const response = await fetch(`http://localhost:4001/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        }),
      });
      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem('token', token);
        console.log('Login successful')
        window.location.href = "/";
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error adding message", error);
    }
  }

  createCredentials = async () => {
    try {
      const response = await fetch(`http://localhost:4001/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.state.username,
          email: this.state.email,
          password: this.state.password
        }),
      });
      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem('token', token);
        console.log('User created')
        window.location.href = "/";
      } else {
        console.error("Failed to create user");
      }
    } catch (error) {
      console.error("Error adding message", error);
    }
  }

  handleSubmitLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!this.state.signup) {
      this.checkCredentials()
    } else {
      this.setState({ signup: false })
    }
  }

  handleSubmitSignup = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (this.state.signup) {
      console.log('Username:', this.state.username);
      console.log('Password:', this.state.password);
      console.log('Email:', this.state.email);
      this.createCredentials()
    } else {
      this.setState({ signup: true })
    }
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmitLogin} className='center'>
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
          value={this.state.username}
          onChange={this.handleInputChange}
        />
        <div className='div-login-one' />
        {this.state.signup ?
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
              value={this.state.email}
              onChange={this.handleInputChange}
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
          value={this.state.password}
          onChange={this.handleInputChange}
        />
        <div className="div-login-two" />
        <div className='login-signup'>
          <Button onClick={this.handleSubmitSignup} variant="outlined">Signup</Button>
          <div className='div-login-three' />
          <Button type="submit" variant="outlined">Login</Button>
        </div>
      </form>
    );
  }
}

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
