import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import GetUserProblemsMutation from '../../../mutations/GetUserProblemsMutation.ts';
import Cookies from 'js-cookie'

interface ProblemData {
    title: string;
    level: string;
    description: string;
    frequency: string;
    link: string;
    data_structure: string;
    date: string;
}

const Dashboard: React.FC = () => {
    const [problems, setProblems] = useState<ProblemData[]>([]);
    const [selectedProblemIndex, setSelectedProblemIndex] = useState<number | null>(null);
    const userId = Cookies.get('GC_USER_ID');
    const navigate = useNavigate();

    const getUserProblems = () => {
        GetUserProblemsMutation(
            userId,
            (response: ProblemData[]) => {
                setProblems(response);
            },
            (error) => {
                console.log('Error: ', error);
            }
        );
    };

    useEffect(() => {
        getUserProblems();
    }, []);

    const handleProblemClick = (problem: ProblemData, index: number) => {
        setSelectedProblemIndex(index);
        navigate('/info', { state: { problem } });
    };

    return (
        <>
            <div className="problem-list">
                {problems.map((problem, index) => (
                    <div
                        key={index}
                        className={`problem-item ${selectedProblemIndex === index ? 'selected' : ''}`}
                        onClick={() => handleProblemClick(problem, index)}
                    >
                        <h3 className="problem-title">{problem.title}</h3>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Dashboard;
