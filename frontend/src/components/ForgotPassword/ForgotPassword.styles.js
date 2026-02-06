import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 180px);
    background: var(--darkGrey);
    padding: 20px;
`;

export const Content = styled.div`
    background: var(--medGrey);
    border-radius: 20px;
    padding: 40px;
    max-width: 400px;
    width: 100%;

    h2 {
        color: var(--white);
        text-align: center;
        margin-bottom: 15px;
        font-size: var(--fontSuperBig);
    }

    .subtitle {
        color: var(--lightGrey);
        text-align: center;
        margin-bottom: 30px;
        font-size: var(--fontSmall);
        line-height: 1.5;
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const Input = styled.input`
    width: 100%;
    height: 50px;
    padding: 0 20px;
    border-radius: 25px;
    border: none;
    font-size: var(--fontMed);
    background: var(--darkGrey);
    color: var(--white);
    outline: none;

    ::placeholder {
        color: #666;
    }

    :focus {
        box-shadow: 0 0 0 2px var(--lightGrey);
    }
`;

export const SubmitButton = styled.button`
    width: 100%;
    height: 50px;
    border-radius: 25px;
    border: none;
    background: linear-gradient(to left, #22c1c3, #fdbb2d);
    color: var(--darkGrey);
    font-size: var(--fontBig);
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
    margin-top: 10px;

    :hover {
        opacity: 0.8;
    }

    :disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const ErrorMsg = styled.div`
    color: #ff6b6b;
    background: rgba(255, 107, 107, 0.1);
    padding: 12px;
    border-radius: 10px;
    text-align: center;
    font-size: var(--fontSmall);
`;

export const SuccessMsg = styled.div`
    color: #51cf66;
    background: rgba(81, 207, 102, 0.1);
    padding: 12px;
    border-radius: 10px;
    text-align: center;
    font-size: var(--fontSmall);
`;

export const LinkText = styled.p`
    color: var(--lightGrey);
    text-align: center;
    margin-top: 20px;
    font-size: var(--fontSmall);

    a {
        color: #22c1c3;
        text-decoration: none;

        :hover {
            text-decoration: underline;
        }
    }
`;

export const BackIcon = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--lightGrey);
    font-size: var(--fontSmall);
    margin-bottom: 20px;
    cursor: pointer;
    transition: color 0.3s;

    :hover {
        color: var(--white);
    }

    svg {
        width: 16px;
        height: 16px;
    }
`;
