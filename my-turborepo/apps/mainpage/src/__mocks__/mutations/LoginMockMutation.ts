import { graphql } from 'relay-runtime';

export const LoginMockMutation = graphql`
    mutation LoginMockMutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            userId
            token
            tokenExpiration
        }
    }
`;