import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import FieldTitle from '@repo/ui/src/FieldTitle'
import FieldContainer from "@repo/ui/src/FieldContainer";
import LeftColumn from "@repo/ui/src/LeftColumn";
import FieldsContainer from "@repo/ui/src/FieldsContainer";
import ProblemTitle from "@repo/ui/src/ProblemTItle";
import ProblemInfoContainer from "@repo/ui/src/ProblemInfoContainer";
import InfoField from "@repo/ui/src/InfoField";
import RightColumn from "@repo/ui/src/RightColumn";
import DescriptionField from "@repo/ui/src/DescriptionField";
import DateField from "@repo/ui/src/DateField";
import CreateButton from "@repo/ui/src/CreateButton";
import NotesField from "@repo/ui/src/NotesFIeld";

interface ProblemData {
    _id: string
    title: string;
    level: string;
    description: string;
    user_description: string;
    frequency: number;
    link: string;
    data_structure: string;
    date: string;
}

const ProblemInfo: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate()
    // state needs to be undefined as to be called from the app.tsx as a route alternative
    const problem = location.state?.problem as ProblemData;

    const navigateToEditProblem = () => {
        navigate('/edit', { state: { problem } });
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div>
            <ProblemInfoContainer>
                <ProblemTitle>{problem?.title}</ProblemTitle>
                {problem ? (
                    <FieldsContainer>
                        <LeftColumn>
                            <FieldContainer>
                                <FieldTitle>Description</FieldTitle>
                                <DescriptionField
                                    value={problem.description}
                                    readOnly
                                />
                            </FieldContainer>
                        </LeftColumn>
                        <RightColumn>
                            <FieldContainer>
                                <FieldTitle>Link</FieldTitle>
                                <InfoField
                                    value={problem.link}
                                    name={"Link"}
                                    onChange={null}
                                    link
                                    readOnly
                                />
                            </FieldContainer>
                            <FieldContainer>
                                <FieldTitle>Level of Difficulty</FieldTitle>
                                <InfoField
                                    value={problem.level}
                                    name={"Level"}
                                    onChange={null}
                                    readOnly
                                />
                            </FieldContainer>
                            <FieldContainer>
                                <FieldTitle>Data Structure</FieldTitle>
                                <InfoField
                                    value={problem.data_structure}
                                    name={"Data Structures"}
                                    onChange={null}
                                    readOnly
                                />
                            </FieldContainer>
                            <FieldContainer>
                                <FieldTitle>Date of Completion</FieldTitle>
                                <DateField
                                    value={formatDate(problem.date)}
                                    readOnly
                                />
                            </FieldContainer>
                            <FieldContainer>
                                <FieldTitle>Frequency</FieldTitle>
                                <InfoField
                                    value={problem.frequency.toString()}
                                    name={"Frequency"}
                                    onChange={null}
                                    readOnly
                                />
                            </FieldContainer>
                            <FieldContainer>
                                <FieldTitle>Notes</FieldTitle>
                                <NotesField
                                    value={problem.user_description}
                                    readOnly
                                />
                            </FieldContainer>
                        </RightColumn>
                    </FieldsContainer>
                ) : (
                    <p>No problem selected.</p>
                )}
                <CreateButton onClick={navigateToEditProblem}>Edit</CreateButton>
            </ProblemInfoContainer>
        </div>
    );
};

export default ProblemInfo;