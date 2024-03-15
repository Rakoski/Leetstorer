import React, { useState } from 'react';
import styled from 'styled-components';

interface ProblemData {
    title: string;
    level: string;
    description: string;
    user_description: string;
    frequency: number;
    link: string;
    data_structure: string;
    date: string;
}

const ProblemInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
`;

const ProblemTitle = styled.h2`
    font-size: 2rem;
    margin-bottom: 1rem;
`;

const FieldsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 1200px;
`;

const LeftColumn = styled.div`
    flex: 1;
    margin-right: 5rem;
`;

const RightColumn = styled.div`
    flex: 1;
`;

const FieldContainer = styled.div`
    margin-bottom: 1.5rem;
`;

const FieldTitle = styled.h3`
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
`;

const InfoField = styled.input`
    width: 100%;
    padding: 0.8rem;
    font-size: 1.1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const DescriptionField = styled.textarea`
    width: 100%;
    height: 130px;
    padding: 0.8rem;
    font-size: 1.1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
`;

const DateField = styled.input`
    width: 100%;
    padding: 0.8rem;
    font-size: 1.1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

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

const AddProblem: React.FC = () => {
    const [problemData, setProblemData] = useState<ProblemData>({
        title: '',
        level: '',
        description: '',
        user_description: '',
        frequency: 0,
        link: '',
        data_structure: '',
        date: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProblemData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCreateProblem = () => {
        // Handle problem creation logic here
        console.log('Creating new problem:', problemData);
    };

    return (
        <ProblemInfoContainer>
            <ProblemTitle>Create New Problem</ProblemTitle>
            <FieldsContainer>
                <LeftColumn>
                    <FieldContainer>
                        <FieldTitle>Title</FieldTitle>
                        <InfoField
                            name="title"
                            value={problemData.title}
                            onChange={handleChange}
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <FieldTitle>Level of Difficulty</FieldTitle>
                        <InfoField
                            name="level"
                            value={problemData.level}
                            onChange={handleChange}
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <FieldTitle>Description</FieldTitle>
                        <DescriptionField
                            name="description"
                            value={problemData.description}
                            onChange={handleChange}
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <FieldTitle>Notes</FieldTitle>
                        <DescriptionField
                            name="user_description"
                            value={problemData.user_description}
                            onChange={handleChange}
                        />
                    </FieldContainer>
                </LeftColumn>
                <RightColumn>
                    <FieldContainer>
                        <FieldTitle>Link</FieldTitle>
                        <InfoField
                            name="link"
                            value={problemData.link}
                            onChange={handleChange}
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <FieldTitle>Data Structure</FieldTitle>
                        <InfoField
                            name="data_structure"
                            value={problemData.data_structure}
                            onChange={handleChange}
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <FieldTitle>Date of Completion</FieldTitle>
                        <DateField
                            name="date"
                            type="date"
                            value={problemData.date}
                            onChange={handleChange}
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <FieldTitle>Frequency</FieldTitle>
                        <InfoField
                            name="frequency"
                            type="number"
                            value={problemData.frequency}
                            onChange={handleChange}
                        />
                    </FieldContainer>
                </RightColumn>
            </FieldsContainer>
            <CreateButton onClick={handleCreateProblem}>Create</CreateButton>
        </ProblemInfoContainer>
    );
};

export default AddProblem;