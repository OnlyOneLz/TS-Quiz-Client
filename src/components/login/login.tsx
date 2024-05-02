import React, { useState } from 'react';
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
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                })
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);

                localStorage.setItem('token', data.token);
                localStorage.setItem('user_id', data.data[0].user.id);
                localStorage.setItem('progress', data.data[0].user.progress);
                localStorage.setItem('level', data.data[0].user.level);
                localStorage.setItem('previous_progress_needed', data.data[1].previousProgressNeeded);
                localStorage.setItem('progress_needed', data.data[2].progressNeeded);
                console.log('Login successful');
                window.location.href = '/';
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error adding message', error);
        }
    };

    const createCredentials = async () => {
        try {
            const response = await fetch(`http://localhost:4001/user/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                })
            });
            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                localStorage.setItem('token', token);
                console.log('User created');
                window.location.href = '/';
            } else {
                console.error('Failed to create user');
            }
        } catch (error) {
            console.error('Error adding message', error);
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
        console.log(event);

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
        <form onSubmit={handleSubmitLogin} className="center">
            <input
                className="width-rg height-input"
                id="Username"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
            />
            <div className="div-login-one" />
            {formData.signup ? (
                <div>
                    <input
                        className="width-rg height-input"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <div className="div-login-one" />
                </div>
            ) : (
                ''
            )}
            <input
                className="width-rg login-form height-input"
                id="password"
                name="password"
                placeholder="Password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
            />
            <div className="div-login-two" />
            <div className="login-signup">
                <Button onClick={handleSubmitSignup} variant="outlined">
                    Signup
                </Button>
                <div className="div-login-three" />
                <Button type="submit" variant="outlined">
                    Login
                </Button>
            </div>
        </form>
    );
};

const Login: React.FC = () => {
    return (
        <div className="height-full center login-page">
            <div className="login-title">
                <h1>Welcome to Quizzer</h1>
                <p>The quiz for junior devs!</p>
            </div>
            <div></div>
            <MyFormComponent />
        </div>
    );
};

export default Login;
