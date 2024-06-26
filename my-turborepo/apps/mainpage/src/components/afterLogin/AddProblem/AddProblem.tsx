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
import CreateProblemMutation from "../../../mutations/CreateProblemMutation.ts";
import {useNavigate} from "react-router-dom";
import NotesField from "@repo/ui/src/NotesFIeld";
import Cookies from "js-cookie";

const AddProblem: React.FC = () => {
    const navigate = useNavigate();
    const [problemData, setProblemData] = useState({
        title: '',
        level: '',
        description: '',
        user_description: '',
        frequency: '',
        link: '',
        data_structure: '',
        date: '',
        userId: Cookies.get('GC_USER_ID'),
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProblemData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCreateProblem = () => {
        const frequencyNumber = parseInt(problemData.frequency, 10);

        if (isNaN(frequencyNumber)) {
            console.log("Invalid frequency value. Please enter a valid number.");
            return;
        }

        CreateProblemMutation({
            ...problemData,
            frequency: frequencyNumber,
        }, (createdProblem) => {
            navigate('/dashboard');
        }, (error) => {
            console.log("error: ", error)
        });
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
                        <FieldTitle>Description</FieldTitle>
                        <DescriptionField
                            name="description"
                            value={problemData.description}
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
                        <FieldTitle>Level of Difficulty</FieldTitle>
                        <InfoField
                            name="level"
                            value={problemData.level}
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
                            value={problemData.frequency}
                            onChange={handleChange}
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <FieldTitle>Notes</FieldTitle>
                        <NotesField
                            name="user_description"
                            value={problemData.user_description}
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
