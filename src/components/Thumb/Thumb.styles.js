import styled from "styled-components";

export const Image = styled.img`
    width: 100%;
    max-width: 720px;
    max-height: 100%;
    transition: all 0.3s;
    object-fit: cover;
    border-radius: 20px;
    animation: animateThumb 0.5s;

    img {
        max-height: 1080px;
    }

    :hover {
        opacity: 0.8;
    }

    @keyframes animateThumb {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
