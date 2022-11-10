import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
    type Action {
        id: Int
        inputType: String
        view: String
        createdAt: String
        usertype: String
        action: String
        user: User
        userId: Int
        label: String
        expstep: String
        expression: String
        value: String
        success: Boolean
    }
    type User {
        id: Int
        usertype: String
        createdAt: String
        SessionData: String
        stagescompleted: String
        action: [Action]
    }


    type Query {
        actions: [Action]!
    }

    type Mutation {
        addAction(
            label: String
            expstep: String
            expression: String
            value: String
            success: Boolean
        ): Action
    }

    type Mutation {
        addUser(usertype:String): User
    }
    type Mutation {
        updateUser(id:Int usertype:String): User
    }
`;