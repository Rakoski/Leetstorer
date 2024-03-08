import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@repo/ui/src/Header';

interface ProblemData {
    title: string;
    level: string;
    description: string;
    frequency: number;
    link: string;
    data_structure: string;
    date: string;
}

interface ProblemDetailsPageProps {
    problem?: ProblemData;
}

const ProblemInfo: React.FC = () => {
    const location = useLocation();
    const problem = location.state?.problem as ProblemData | undefined;

    return (
        <div>
            <Header />
            <h2>Problem Details</h2>
            {problem ? (
                <>
                    <div>
                        <label>Title:</label>
                        <input type="text" value={problem.title} readOnly />
                    </div>
                    <div>
                        <label>Level:</label>
                        <input type="text" value={problem.level} readOnly />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea value={problem.description} readOnly />
                    </div>
                    <div>
                        <label>Frequency:</label>
                        <input type="text" value={problem.frequency} readOnly />
                    </div>
                    <div>
                        <label>Link:</label>
                        <input type="text" value={problem.link} readOnly />
                    </div>
                    <div>
                        <label>Data Structure:</label>
                        <input type="text" value={problem.data_structure} readOnly />
                    </div>
                    <div>
                        <label>Date:</label>
                        <input type="text" value={problem.date} readOnly />
                    </div>
                </>
            ) : (
                <p>No problem selected.</p>
            )}
        </div>
    );
};

export default ProblemInfo;