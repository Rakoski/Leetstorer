import {
    commitMutation,
    graphql
} from 'react-relay'
import environment from '../RelayEnvironment.ts'

// editProblem(problemInput: ProblemInput, problemId: ID!): Problem
const mutation = graphql`
    mutation EditProblemMutation($problemInput: ProblemInput!, $problemId: ID!) {
        editProblem(problemInput: $problemInput, problemId: $problemId) {
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
    problemId: string,
    problemInput: {
        date: string;
        data_structure: string;
        level: string;
        link: string;
        description: string;
        title: string;
        user_description: string;
        frequency: number;
        userId: string
    },
    callback: (editedProblem: unknown) => void,
    onError: (error: unknown) => void,
) => {
    const variables = {
        problemId,
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
            onCompleted: (response: { updateProblem: unknown }) => {
                const editedProblem = response.updateProblem;
                callback(editedProblem);
                console.log("edited Problem: ", editedProblem)
            },
            onError: (err) => onError(err),
        },
    );
};