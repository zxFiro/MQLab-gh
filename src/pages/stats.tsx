import { Flex, Heading, Button,Box,HStack,Alert,AlertIcon,VStack} from '@chakra-ui/react'
import { gql, useQuery , useMutation} from '@apollo/client'
const allActions = gql`
    query {
        actions {
            action
            createdAt
            expression
        }
    }
`;

const addAction = gql`
    mutation(
        $label: String
        $expstep: String
        $expression: String
        $value: String
        $success: Boolean
        ) {
            addAction(
                label: $label
                expstep: $expstep
                expression: $expression
                value: $value
                success: $success
            ) {
                label
                expstep
                expression
                value
                success
        }
        }

`;

const addUser = gql`
    mutation(
        $usertype:String
        ) {
            addUser(
                usertype:$usertype
            ) {
                id
        }
        }

`;

const updateUser = gql`
    mutation(
        $id:Int
        $usertype:String
        ) {
            updateUser(
                id:$id
                usertype:$usertype
            ) {
                id
                usertype
        }
        }

`;

const stats = () => {
    const { data, loading, error } = useQuery(allActions)
    const [addAct, { datam, loadingm, errorm }] = useMutation(addAction);
    const [addUsr, { datau, loadingu, erroru }] = useMutation(addUser);
    const [updateUsr, { datauu, loadinguu, erroruu }] = useMutation(updateUser);

    if (loading) return <p>Loading...</p>
    if (error) return <p>Oh no... {error.message}</p>
    if (loadingm) return 'Submitting...';
    if (errorm) return `Submission error! ${errorm.message}`;
    if (loadingu) return 'Submitting...U';
    if (erroru) return `Submission errorU! ${erroru.message}`;

    const showRows = () => {
        return(
            <Box>
                {data.actions.map( a => (
                    <HStack>
                        <Box>{a.action}</Box>
                        <Box>{a.createdAt}</Box>
                        <Box>{a.expression}</Box>
                    </HStack>
                ))}
            </Box>
        )
    }

    const testaction = () => {
        addAct({
            variables: {
                    expression:"a+b",
                    expstep:"exp",
                    label:"aa",
                    success:false,
                    value:"aa",
        }})
    }
    const testuser = async () => {
        var a = await addUsr({variables:{usertype:"B"}});
        var b = a.data.addUser.id
        var ut = {
            0:"A",
            1:"B",
            2:"C",
            3:"D"
        }
        var c=ut[b%4]
        await updateUsr({variables:{id:b,usertype:c}});
    }

    return(
        <Flex height="100vh"  alignItems="center" justifyContent="center">
            <Flex direction="column" background="gray.100" p={12} rounded={6} w='100%' maxW='4xl' alignItems="center" justifyContent="center" margin={"auto"}>
                {
                    showRows()
                }
                <Button 
                    colorScheme='teal'
                    height={"32px"}
                    width={"88px"}
                    onClick={
                        ()=>{
                            testuser();
                        }
                    }
                >Enviar</Button>
            </Flex>
        </Flex>
    )
}
export default stats