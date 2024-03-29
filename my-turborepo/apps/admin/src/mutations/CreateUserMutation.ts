import {
    commitMutation,
    graphql
} from 'react-relay'
import environment from '../RelayEnvironment.ts'

const a: number = 5;

const mutation = graphql`
    mutation CreateUserMutation($userInput: UserInput!, $email: String!, $password: String!) {
        createUser(userInput: $userInput) {
            _id
            username
            email
            password
            createdProblems {
                _id
                title
                level
                description
                frequency
                link
                data_structure
                date
            }
        }

        login(email: $email, password: $password) {
            userId
            token
            tokenExpiration
        }
      }
`;

export default (username, email, password, callback, p: (error) => void) => {
    const variables = {
        userInput: {
            username,
            email,
            password
        },
        email,
        password
    };

    commitMutation(
        environment,
        {
            mutation,
            variables,
            onCompleted: (response: {createUser: {_id: string}, login: {token: string}}) => {
                const id = response.createUser._id;
                const token = response.login.token;
                callback(id, token);
            },
            onError: err => alert("Senha ou login incorretos!"),
        },
    );
};


