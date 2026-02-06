import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// Context
import { Context } from '../../context';
// Config
import { API_BACKEND_URL } from '../../config';
// Styles
import { Wrapper, Content, Form, Input, SubmitButton, ErrorMsg, LinkText } from './Login.styles';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [_user, setUser] = useContext(Context);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch(`${API_BACKEND_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.success) {
                // Store user data and tokens
                const userData = {
                    id: data.user.id,
                    email: data.user.email,
                    fullName: data.user.fullName,
                    organization: data.user.organization,
                    role: data.user.role,
                    token: data.token,
                    refreshToken: data.refreshToken
                };
                
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
                localStorage.setItem('token', data.token);
                localStorage.setItem('refreshToken', data.refreshToken);
                navigate('/movies');
            } else {
                setError(data.message || 'Invalid email or password');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }

        setLoading(false);
    };

    return (
        <Wrapper>
            <Content>
                <h2>Welcome Back</h2>
                <p>Sign in to your RMDB account</p>
                <Form onSubmit={handleSubmit}>
                    {error && <ErrorMsg>{error}</ErrorMsg>}
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <SubmitButton type="submit" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </SubmitButton>
                </Form>
                <LinkText>
                    Don't have an account? <Link to="/signup">Create one</Link>
                </LinkText>
            </Content>
        </Wrapper>
    );
};

export default Login;
