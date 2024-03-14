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

export default (problemInput: {title: string, level: string, description: string
userDescription: string, frequency: string, link: string, dataStructure: string
date: string, userId: string}, callback, p: (error) => void) => {
    const variables = {
        problemInput: {
            title: problemInput.title,
            level: problemInput.level,
            description: problemInput.description,
            user_description: problemInput.userDescription,
            frequency: problemInput.frequency,
            link: problemInput.link,
            data_structure: problemInput.dataStructure,
            date: problemInput.date,
            userId: problemInput.userId,
        },
    };

    commitMutation(
        environment,
        {
            mutation,
            variables,
            onCompleted: (response: {createProblem: unknown}) => {
                const createdProblem = response.createProblem;
                callback(createdProblem);
            },
            onError: (err) => console.log(err),
        },
    );
};


