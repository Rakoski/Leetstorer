import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@repo/ui/src/Header';
import styled from 'styled-components';

interface ProblemData {
    title: string;
    level: string;
    description: string;
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

const ProblemInfo: React.FC = () => {
    const location = useLocation();
    const problem = location.state?.problem as ProblemData | undefined;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div>
            <Header />
            <ProblemInfoContainer>
                <ProblemTitle>{problem?.title}</ProblemTitle>
                {problem ? (
                    <FieldsContainer>
                        <LeftColumn>
                            <FieldContainer>
                                <FieldTitle>Level of Difficulty</FieldTitle>
                                <InfoField value={problem.level} readOnly />
                            </FieldContainer>
                            <FieldContainer>
                                <FieldTitle>Description</FieldTitle>
                                <DescriptionField value={problem.description} readOnly />
                            </FieldContainer>
                            <FieldContainer>
                                <FieldTitle>Frequency</FieldTitle>
                                <InfoField value={problem.frequency.toString()} readOnly />
                            </FieldContainer>
                        </LeftColumn>
                        <RightColumn>
                            <FieldContainer>
                                <FieldTitle>Link</FieldTitle>
                                <InfoField value={problem.link} readOnly />
                            </FieldContainer>
                            <FieldContainer>
                                <FieldTitle>Data Structure</FieldTitle>
                                <InfoField value={problem.data_structure} readOnly />
                            </FieldContainer>
                            <FieldContainer>
                                <FieldTitle>Date of Completion</FieldTitle>
                                <DateField value={formatDate(problem.date)} readOnly />
                            </FieldContainer>
                        </RightColumn>
                    </FieldsContainer>
                ) : (
                    <p>No problem selected.</p>
                )}
            </ProblemInfoContainer>
        </div>
    );
};

export default ProblemInfo;