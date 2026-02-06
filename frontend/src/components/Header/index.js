import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Images
import RMDBLogo from '../../images/react-movie-logo.svg';
import TMDBLogo from '../../images/tmdb_logo.svg';
// Context
import { Context } from '../../context';
// Styles
import { 
    Wrapper, 
    Content, 
    LogoImg, 
    TMDBLogoImg, 
    RightContent,
    UserInfo,
    LoginButton,
    LogoutButton 
} from './Header.styles';

const Header = () => {
    const [user, setUser] = useContext(Context);
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        navigate('/');
    };

    return (
        <Wrapper>
            <Content>
                <Link to={user ? '/movies' : '/'}>
                    <LogoImg src={RMDBLogo} alt='rmdb logo' />
                </Link>
                <RightContent>
                    <TMDBLogoImg src={TMDBLogo} alt='TMDB logo' />
                    {user ? (
                        <>
                            <UserInfo>Hi, {user.fullName}</UserInfo>
                            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
                        </>
                    ) : (
                        <Link to='/login'>
                            <LoginButton>Login</LoginButton>
                        </Link>
                    )}
                </RightContent>
            </Content>
        </Wrapper>
    );
};

export default Header;