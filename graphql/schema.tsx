import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
    type Action {
        id: String
        inputType: String
        view: String
        createdAt: String
        usertype: String
        action: String
        label: String
        expstep: String
        expression: String
        value: String
        success: String
    }


    type Query {
        actions: [Action]!
    }
`;