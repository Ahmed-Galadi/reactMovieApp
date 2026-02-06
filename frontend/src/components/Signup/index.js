import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// Config
import { API_BACKEND_URL } from '../../config';
// Styles
import {
    Wrapper,
    Content,
    Form,
    InputGroup,
    Input,
    SubmitButton,
    ErrorMsg,
    SuccessMsg,
    LinkText
} from './Signup.styles';

const Signup = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        organization: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${API_BACKEND_URL}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fullName: formData.fullName,
                    email: formData.email,
                    password: formData.password,
                    organization: formData.organization || undefined
                })
            });

            const data = await response.json();

            if (data.success) {
                setSuccess('Account created successfully! Redirecting to login...');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }

        setLoading(false);
    };

    return (
        <Wrapper>
            <Content>
                <h2>Create Account</h2>
                <p className="subtitle">Join RMDB and start exploring movies</p>
                
                <Form onSubmit={handleSubmit}>
                    {error && <ErrorMsg>{error}</ErrorMsg>}
                    {success && <SuccessMsg>{success}</SuccessMsg>}
                    
                    <InputGroup>
                        <label>Full Name *</label>
                        <Input
                            type="text"
                            name="fullName"
                            placeholder="John Doe"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </InputGroup>

                    <InputGroup>
                        <label>Email *</label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </InputGroup>

                    <InputGroup>
                        <label>Password *</label>
                        <Input
                            type="password"
                            name="password"
                            placeholder="Min. 8 characters"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </InputGroup>

                    <InputGroup>
                        <label>Confirm Password *</label>
                        <Input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </InputGroup>

                    <InputGroup>
                        <label>Organization (Optional)</label>
                        <Input
                            type="text"
                            name="organization"
                            placeholder="Your company or organization"
                            value={formData.organization}
                            onChange={handleChange}
                        />
                    </InputGroup>

                    <SubmitButton type="submit" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </SubmitButton>
                </Form>

                <LinkText>
                    Already have an account? <Link to="/login">Sign in</Link>
                </LinkText>
            </Content>
        </Wrapper>
    );
};

export default Signup;
