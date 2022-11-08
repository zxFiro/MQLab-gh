import { Flex, Heading, Button,Box,HStack,Alert,AlertIcon,VStack} from '@chakra-ui/react'
import { gql, useQuery , useMutation} from '@apollo/client'
const allActions = gql`
    query {
        actions {
        action
        createdAt
        expression
        expstep
        id
        inputType
        label
        success
        usertype
        value
        view
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

const stats = () => {
    const { data, loading, error } = useQuery(allActions)
    const [addAct, { datam, loadingm, errorm }] = useMutation(addAction);

    if (loading) return <p>Loading...</p>
    if (error) return <p>Oh no... {error.message}</p>
    if (loadingm) return 'Submitting...';
    if (errorm) return `Submission error! ${errorm.message}`;

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
                            addAct({
                                variables: {
                                        expression:"a+b",
                                        expstep:"exp",
                                        label:"aa",
                                        success:false,
                                        value:"aa",
                    }})}}
                >Enviar</Button>
            </Flex>
        </Flex>
    )
}
export default stats