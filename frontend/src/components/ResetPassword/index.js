import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
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
    LinkText,
    PasswordStrength,
    StrengthLabel
} from './ResetPassword.styles';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    // Password strength checker
    const getPasswordStrength = (pass) => {
        if (!pass) return '';
        if (pass.length < 6) return 'weak';
        if (pass.length < 8) return 'medium';
        
        const hasUpper = /[A-Z]/.test(pass);
        const hasLower = /[a-z]/.test(pass);
        const hasNumber = /[0-9]/.test(pass);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
        
        const score = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
        
        if (score >= 3 && pass.length >= 8) return 'strong';
        if (score >= 2) return 'medium';
        return 'weak';
    };

    const passwordStrength = getPasswordStrength(password);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validation
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        if (!token) {
            setError('Invalid reset link. Please request a new password reset.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${API_BACKEND_URL}/api/auth/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, newPassword: password })
            });

            const data = await response.json();

            if (data.success) {
                setSuccess('Password reset successfully! Redirecting to login...');
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                setError(data.message || 'Failed to reset password');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }

        setLoading(false);
    };

    // Show error if no token
    if (!token) {
        return (
            <Wrapper>
                <Content>
                    <h2>Invalid Link</h2>
                    <p className="subtitle">
                        This password reset link is invalid or has expired.
                    </p>
                    <ErrorMsg>
                        Please request a new password reset link.
                    </ErrorMsg>
                    <LinkText>
                        <Link to="/forgot-password">Request new link</Link>
                    </LinkText>
                </Content>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <Content>
                <h2>Reset Password</h2>
                <p className="subtitle">
                    Enter your new password below.
                </p>
                
                <Form onSubmit={handleSubmit}>
                    {error && <ErrorMsg>{error}</ErrorMsg>}
                    {success && <SuccessMsg>{success}</SuccessMsg>}
                    
                    <InputGroup>
                        <label>New Password</label>
                        <Input
                            type="password"
                            placeholder="Min. 8 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {password && (
                            <>
                                <PasswordStrength>
                                    <div className={`bar ${passwordStrength === 'weak' || passwordStrength === 'medium' || passwordStrength === 'strong' ? passwordStrength : ''}`} />
                                    <div className={`bar ${passwordStrength === 'medium' || passwordStrength === 'strong' ? passwordStrength : ''}`} />
                                    <div className={`bar ${passwordStrength === 'strong' ? passwordStrength : ''}`} />
                                </PasswordStrength>
                                <StrengthLabel strength={passwordStrength}>
                                    {passwordStrength === 'weak' && 'Weak password'}
                                    {passwordStrength === 'medium' && 'Medium password'}
                                    {passwordStrength === 'strong' && 'Strong password'}
                                </StrengthLabel>
                            </>
                        )}
                    </InputGroup>

                    <InputGroup>
                        <label>Confirm New Password</label>
                        <Input
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </InputGroup>

                    <SubmitButton type="submit" disabled={loading || success}>
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </SubmitButton>
                </Form>

                <LinkText>
                    Remember your password? <Link to="/login">Sign in</Link>
                </LinkText>
            </Content>
        </Wrapper>
    );
};

export default ResetPassword;
