import React, {useEffect, useState} from 'react';
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
import {useLocation, useNavigate} from "react-router-dom";
import EditProblemMutation from "../../../mutations/EditProblemMutation.ts";
import NotesField from "@repo/ui/src/NotesFIeld";
import Cookies from 'js-cookie'

interface ProblemData {
    _id: string
    title: string;
    level: string;
    description: string;
    user_description: string;
    frequency: string;
    link: string;
    data_structure: string;
    date: string;
    userId: string | undefined;
}

const EditProblem: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const initialProblemData = location.state?.problem as ProblemData;
    const [problemData, setProblemData] = useState<ProblemData>(initialProblemData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProblemData((prevProblemData) => ({
            ...prevProblemData,
            [name]: value,
        }));
    };

    function handleEditProblem() {
        EditProblemMutation(
            problemData._id,
            {
                date: problemData.date,
                data_structure: problemData.data_structure,
                level: problemData.level,
                link: problemData.link,
                description: problemData.description,
                title: problemData.title,
                user_description: problemData.user_description,
                frequency: Number(problemData.frequency),
                userId: Cookies.get('GC_USER_ID')
            },
            (editedProblem: unknown) => {
                console.log("editedProblem: ", editedProblem)
                navigate('/dashboard');
            },
            (error: unknown) => {
                console.log("error: ", error);
            }
        );
    }

    return (
        <ProblemInfoContainer>
            <ProblemTitle>Edit Problem</ProblemTitle>
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
                            type="number"
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
            <CreateButton onClick={handleEditProblem}>Save</CreateButton>
        </ProblemInfoContainer>
    );
};

export default EditProblem;
