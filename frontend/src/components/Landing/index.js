import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Context
import { Context } from '../../context';
// Styles
import {
    Wrapper,
    HeroContent,
    ButtonGroup,
    PrimaryButton,
    SecondaryButton,
    Features,
    FeatureCard
} from './Landing.styles';

const Landing = () => {
    const [user] = useContext(Context);
    const navigate = useNavigate();

    // Redirect if already logged in
    useEffect(() => {
        if (user && user.token) {
            navigate('/movies', { replace: true });
        }
    }, [user, navigate]);

    return (
        <Wrapper>
            <HeroContent>
                <h1>
                    Welcome to <span>RMDB</span>
                </h1>
                <p>
                    Discover millions of movies, explore detailed information, 
                    cast details, ratings, and more. Your ultimate movie database 
                    experience starts here.
                </p>
                <ButtonGroup>
                    <PrimaryButton onClick={() => navigate('/signup')}>
                        Get Started
                    </PrimaryButton>
                    <SecondaryButton onClick={() => navigate('/login')}>
                        Sign In
                    </SecondaryButton>
                </ButtonGroup>
            </HeroContent>

            <Features>
                <FeatureCard>
                    <div className="icon">🎬</div>
                    <h3>Explore Movies</h3>
                    <p>Browse through thousands of movies with detailed information and ratings.</p>
                </FeatureCard>
                <FeatureCard>
                    <div className="icon">⭐</div>
                    <h3>Rate & Review</h3>
                    <p>Share your opinions by rating movies and keeping track of your favorites.</p>
                </FeatureCard>
                <FeatureCard>
                    <div className="icon">🔍</div>
                    <h3>Search Anything</h3>
                    <p>Find any movie instantly with our powerful search functionality.</p>
                </FeatureCard>
            </Features>
        </Wrapper>
    );
};

export default Landing;
