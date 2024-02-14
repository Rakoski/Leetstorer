import { commitMutation, graphql } from 'react-relay';
import environment from '../RelayEnvironment.ts';

const mutation = graphql`
    mutation LoginMutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            userId
            token
            tokenExpiration
        }
    }
`;

export default (email, password, callback, p: (error) => void) => {
    const variables = {
        email,
        password
    };

    commitMutation(
        environment,
        {
            mutation,
            variables,
            onCompleted: (response: {login: {userId: string, token: string}}) => {
                const id = response.login.userId;
                const token = response.login.token;
                callback(id, token);
            },
            onError: err => console.error(err),
        },
    );
};


