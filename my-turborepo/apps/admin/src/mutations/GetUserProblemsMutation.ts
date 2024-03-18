import { commitMutation, graphql } from 'react-relay';
import environment from '../RelayEnvironment.ts';

const mutation = graphql`
    mutation GetUserProblemsMutation($userId: ID!) {
        getUserProblems(userId: $userId) {
            title
            level
            description
            user_description
            frequency
            link
            data_structure
            date
        }
    }
`;

export default (userId: string, callback, errorCallback) => {
    const variables = {
        userId,
    };

    commitMutation(
        environment,
        {
            mutation,
            variables,
            onCompleted: (response: {getUserProblems: object}, errors) => {
                if (errors) {
                    errorCallback(errors);
                } else {
                    callback(response.getUserProblems);
                }
            },
            onError: err => errorCallback(err),
        },
    );
};
