import React, { useState } from 'react';
import FieldTitle from '@repo/ui/src/FieldTitle'
import FieldContainer from "@repo/ui/src/FieldContainer";
import LeftColumn from "@repo/ui/src/LeftColumn";
import FieldsContainer from "@repo/ui/src/FieldsContainer";
import ProblemTitle from "@repo/ui/src/ProblemTItle";
import ProblemInfoContainer from "@repo/ui/src/ProblemInfoContainer";
import InfoField from "@repo/ui/src/InfoField";
import RightColumn from "@repo/ui/src/RightColumn";
import DescriptionField from "@repo/ui/src/DescriptionField";
import CreateButton from "@repo/ui/src/CreateButton";
import DateField from "@repo/ui/src/DateField";

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