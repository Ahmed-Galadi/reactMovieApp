import styled from "styled-components";

export const Wrapper = styled.div`
    min-height: calc(100vh - 180px);
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.9) 0%,
        rgba(0, 0, 0, 0.7) 50%,
        rgba(0, 0, 0, 0.9) 100%
    ),
    url('https://image.tmdb.org/t/p/original/628Dep6AxEtDxjZoGP78TsOxYbK.jpg');
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    text-align: center;
`;

export const HeroContent = styled.div`
    max-width: 800px;
    margin: 0 auto;

    h1 {
        font-size: 4rem;
        color: var(--white);
        margin-bottom: 20px;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

        span {
            background: linear-gradient(to right, #22c1c3, #fdbb2d);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        @media screen and (max-width: 768px) {
            font-size: 2.5rem;
        }
    }

    p {
        font-size: 1.4rem;
        color: var(--lightGrey);
        margin-bottom: 40px;
        line-height: 1.6;

        @media screen and (max-width: 768px) {
            font-size: 1.1rem;
        }
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
`;

export const PrimaryButton = styled.button`
    background: linear-gradient(to right, #22c1c3, #fdbb2d);
    color: var(--darkGrey);
    border: none;
    padding: 15px 40px;
    border-radius: 30px;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
    text-decoration: none;

    :hover {
        transform: scale(1.05);
        box-shadow: 0 10px 30px rgba(34, 193, 195, 0.3);
    }
`;

export const SecondaryButton = styled.button`
    background: transparent;
    color: var(--white);
    border: 2px solid var(--white);
    padding: 15px 40px;
    border-radius: 30px;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
    text-decoration: none;

    :hover {
        background: var(--white);
        color: var(--darkGrey);
    }
`;

export const Features = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    max-width: 1000px;
    margin-top: 60px;

    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 20px;
    }
`;

export const FeatureCard = styled.div`
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 30px;
    border: 1px solid rgba(255, 255, 255, 0.1);

    h3 {
        color: var(--white);
        font-size: 1.3rem;
        margin-bottom: 15px;
    }

    p {
        color: var(--lightGrey);
        font-size: 1rem;
        margin: 0;
    }

    .icon {
        font-size: 2.5rem;
        margin-bottom: 15px;
    }
`;
