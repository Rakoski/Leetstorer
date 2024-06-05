import { commitMutation, graphql } from 'react-relay';
import environment from '../RelayEnvironment.ts';

const mutation = graphql`
    mutation CreateUserMutation($userInput: UserInput!) {
        createUser(userInput: $userInput) {
            _id
            username
            email
            createdProblems {
                _id
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
    }
`;

export default function createUser(username, email, password, callback, onError) {
    const variables = {
        userInput: {
            username,
            email,
            password
        }
    };

    commitMutation(environment, {
        mutation,
        variables,
        onCompleted: (response, errors) => {
            const { createUser } = response;
            if (createUser) {
                callback(createUser);
            } else if (errors && errors.length > 0) {
                onError(new Error("Email already in use!"));
            } else {
                onError(new Error("An unexpected error occurred."));
            }
        },
        onError: (error) => {
            console.error("Mutation error: ", error);
            onError(error);
        }
    });
}
