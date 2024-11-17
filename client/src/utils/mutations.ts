import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation Mutation($input: UserInput!) {
        addUser(input: $input) {
            user {
                _id
                username
            }
            token
        }
    }
`;

export const searchYuGiOhCard = (cardProperty: string, cardInfo: string) => {
    return fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?${cardProperty}=${cardInfo}`);
};
