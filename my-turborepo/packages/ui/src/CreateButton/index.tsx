import styled from 'styled-components';

const CreateButton = styled.button`
    background-color: orange;
    color: white;
    padding: 0.8rem 1.6rem;
    font-size: 1.1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #ff8c00;
    }
`;

export default CreateButton;