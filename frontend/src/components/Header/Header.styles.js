import styled from "styled-components";

export const Wrapper = styled.div`
  background: var(--darkGrey);
  padding: 0 20px;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--maxWidth);
  padding: 20px 0;
  margin: 0 auto;
`;

export const LogoImg = styled.img`
    width: 200px;

    @media screen and (max-width: 500px) {
        width: 150px
    }
`;

export const TMDBLogoImg = styled.img`
    width: 100px;

    @media screen and (max-width: 500px) {
        width: 80px;
    }
`;

export const RightContent = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

export const UserInfo = styled.span`
    color: var(--white);
    font-size: var(--fontMed);

    @media screen and (max-width: 500px) {
        display: none;
    }
`;

export const LoginButton = styled.button`
    background: transparent;
    border: 2px solid var(--white);
    color: var(--white);
    padding: 8px 20px;
    border-radius: 20px;
    font-size: var(--fontSmall);
    cursor: pointer;
    transition: all 0.3s;

    :hover {
        background: var(--white);
        color: var(--darkGrey);
    }
`;

export const LogoutButton = styled.button`
    background: transparent;
    border: 2px solid #ff6b6b;
    color: #ff6b6b;
    padding: 8px 20px;
    border-radius: 20px;
    font-size: var(--fontSmall);
    cursor: pointer;
    transition: all 0.3s;

    :hover {
        background: #ff6b6b;
        color: var(--white);
    }
`;