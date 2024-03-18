import {
    commitMutation,
    graphql
} from 'react-relay'
import environment from '../RelayEnvironment.ts'

// createProblem(problemInput: ProblemInput!): Problem
const mutation = graphql`
    mutation CreateProblemMutation($problemInput: ProblemInput!) {
        createProblem(problemInput: $problemInput) {
            _id
            title
            level
            description
            user_description
            frequency
            link
            data_structure
            date
            creator {
                _id
                username
                email
            }
        }
    }
`;

export default (
    problemInput: {
        date: string;
        data_structure: string;
        level: string;
        link: string;
        description: string;
        title: string;
        user_description: string;
        frequency: number
        userId: string
    },
    callback: (createdProblem: unknown) => void,
    onError: (error: unknown) => void,
) => {
    const variables = {
        problemInput: {
            title: problemInput.title,
            level: problemInput.level,
            description: problemInput.description,
            user_description: problemInput.user_description,
            frequency: problemInput.frequency,
            link: problemInput.link,
            data_structure: problemInput.data_structure,
            date: problemInput.date,
            userId: problemInput.userId
        },
    };

    commitMutation(
        environment,
        {
            mutation,
            variables,
            onCompleted: (response: { createProblem: unknown }) => {
                const createdProblem = response.createProblem;
                callback(createdProblem);
                console.log("createdProblem: ", createdProblem)
            },
            onError: (err) => onError(err),
        },
    );
};