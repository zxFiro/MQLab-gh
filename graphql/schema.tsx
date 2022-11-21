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
        fixedSuccess: String
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
        allActions(dmin:String dmax:String value:String): [Action]!
    }

    type Mutation {
        addAction(
            inputType: String
            view: String
            usertype: String
            action: String
            userId: Int
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

    type Mutation {
        fix(id:Int newsucc:String): Action
    }
`;