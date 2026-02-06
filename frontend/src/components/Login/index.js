import React, { useState, useContext, useEffect, useCallback, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// Context
import { Context } from '../../context';
// Config
import { API_BACKEND_URL, GOOGLE_CLIENT_ID } from '../../config';
// Styles
import { Wrapper, Content, Form, Input, SubmitButton, ErrorMsg, LinkText, Divider, GoogleButton, HiddenGoogleButton } from './Login.styles';

// Google Icon SVG Component
const GoogleIcon = () => (
    <svg viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
);

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [googleReady, setGoogleReady] = useState(false);

    const [user, setUser] = useContext(Context);
    const navigate = useNavigate();
    const hiddenButtonRef = useRef(null);

    // Redirect if already logged in
    useEffect(() => {
        if (user && user.token) {
            navigate('/movies');
        }
    }, [user, navigate]);

    // Handle Google Sign-In response
    const handleGoogleResponse = useCallback(async (response) => {
        setGoogleLoading(true);
        setError('');

        try {
            const res = await fetch(`${API_BACKEND_URL}/api/auth/google`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: response.credential })
            });

            const data = await res.json();

            if (data.success) {
                const userData = {
                    id: data.user.id,
                    email: data.user.email,
                    fullName: data.user.fullName,
                    organization: data.user.organization,
                    role: data.user.role,
                    avatar: data.user.avatar,
                    token: data.token,
                    refreshToken: data.refreshToken
                };
                
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
                localStorage.setItem('token', data.token);
                localStorage.setItem('refreshToken', data.refreshToken);
                navigate('/movies');
            } else {
                setError(data.message || 'Google sign-in failed');
            }
        } catch (err) {
            setError('Google sign-in failed. Please try again.');
        }

        setGoogleLoading(false);
    }, [navigate, setUser]);

    // Initialize Google Sign-In with hidden rendered button
    useEffect(() => {
        const initGoogle = () => {
            if (window.google && GOOGLE_CLIENT_ID && hiddenButtonRef.current) {
                window.google.accounts.id.initialize({
                    client_id: GOOGLE_CLIENT_ID,
                    callback: handleGoogleResponse,
                });
                
                // Render hidden Google button - this creates a real Google button that works in Brave
                window.google.accounts.id.renderButton(
                    hiddenButtonRef.current,
                    {
                        type: 'standard',
                        size: 'large',
                        text: 'continue_with',
                        width: 300,
                    }
                );
                setGoogleReady(true);
            }
        };

        // Try immediately
        initGoogle();
        
        // Also try after a short delay in case script hasn't loaded
        const timer = setTimeout(initGoogle, 500);
        return () => clearTimeout(timer);
    }, [handleGoogleResponse]);

    // Trigger Google Sign-In by clicking the hidden real Google button
    const handleGoogleSignIn = () => {
        if (!googleReady) {
            setError('Google Sign-In is loading, please try again');
            return;
        }
        
        // Find and click the actual Google button inside the hidden container
        const googleBtn = hiddenButtonRef.current?.querySelector('[role="button"]') 
            || hiddenButtonRef.current?.querySelector('div[style]')
            || hiddenButtonRef.current?.querySelector('iframe');
        
        if (googleBtn) {
            googleBtn.click();
        } else {
            setError('Google Sign-In is not available. Please disable ad blockers or try a different browser.');
        }
    };

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
                
                {error && <ErrorMsg>{error}</ErrorMsg>}
                
                {/* Hidden Google button - the real GIS button is here but invisible */}
                <HiddenGoogleButton ref={hiddenButtonRef} />
                
                <GoogleButton type="button" onClick={handleGoogleSignIn} disabled={googleLoading || !googleReady}>
                    <GoogleIcon />
                    {googleLoading ? 'Signing in...' : 'Continue with Google'}
                </GoogleButton>

                <Divider><span>or sign in with email</span></Divider>

                <Form onSubmit={handleSubmit}>
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
                    <Link to="/forgot-password">Forgot your password?</Link>
                </LinkText>
                <LinkText>
                    Don't have an account? <Link to="/signup">Create one</Link>
                </LinkText>
            </Content>
        </Wrapper>
    );
};

export default Login;
