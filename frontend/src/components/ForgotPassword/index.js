import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Config
import { API_BACKEND_URL } from '../../config';
// Styles
import {
    Wrapper,
    Content,
    Form,
    Input,
    SubmitButton,
    ErrorMsg,
    SuccessMsg,
    LinkText,
    BackIcon
} from './ForgotPassword.styles';

// Arrow Icon
const ArrowLeft = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
    </svg>
);

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await fetch(`${API_BACKEND_URL}/api/auth/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(data.message || 'If an account with that email exists, a password reset link has been sent.');
                setEmail('');
            } else {
                setError(data.message || 'Failed to send reset email');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }

        setLoading(false);
    };

    return (
        <Wrapper>
            <Content>
                <Link to="/login">
                    <BackIcon>
                        <ArrowLeft />
                        Back to Login
                    </BackIcon>
                </Link>
                
                <h2>Forgot Password?</h2>
                <p className="subtitle">
                    No worries! Enter your email address and we'll send you a link to reset your password.
                </p>
                
                <Form onSubmit={handleSubmit}>
                    {error && <ErrorMsg>{error}</ErrorMsg>}
                    {success && <SuccessMsg>{success}</SuccessMsg>}
                    
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <SubmitButton type="submit" disabled={loading}>
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </SubmitButton>
                </Form>

                <LinkText>
                    Remember your password? <Link to="/login">Sign in</Link>
                </LinkText>
            </Content>
        </Wrapper>
    );
};

export default ForgotPassword;
