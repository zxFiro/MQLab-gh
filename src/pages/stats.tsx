import { Flex, Heading, Button,Box,HStack,Wrap,WrapItem,Center} from '@chakra-ui/react'
import { gql, useQuery , useMutation} from '@apollo/client'
import { MathComponent } from '../components/MathJax'
import { useState } from 'react';
const allActions = gql`
    query (
        $value:String
        $dmin:String
        $dmax:String
    ){
        allActions(
            dmin:$dmin
            dmax:$dmax
            value:$value
        ) {
            id
            userId
            action
            createdAt
            expression
            expstep
            success
            fixedSuccess
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

const fix = gql`
        mutation(
            $newsucc:String
            $id:Int
            ) {
                fix(
                    newsucc:$newsucc
                    id:$id
                ) {
                    fixedSuccess
                }
            }
`;

const stats = () => {
    const [fakePagination,setFakePagination] = useState(0);
    
    const dmin = new Date(1668428800000);
    const dmax = new Date(1668459600000);
    //1668726981000
    //1668459600000
    const [fixed, { datam, loadingm, errorm }] = useMutation(fix);
    const { data, loading, error } = useQuery(allActions, { variables: { dmin:dmin,dmax:dmax,value:"submit"}})

    if (loading) return 'load';
    if (error) return `error! ${error.message}`;
    if (loadingm) return 'mutating';
    if (errorm) return `error! ${errorm.message}`;

    const converdate=(date)=>{
        let a = ""+new Date(date);
        return a;
    }

    const wasSuccessfull=(success)=>{
        if(success!="") return "repuesta correcta  "+success;
        else return "respuesta incorrecta";
    }

    const showRows = () => {
        return(
            <Box>
                {data.allActions.slice(0+fakePagination, 50+fakePagination).map( a => (
                    <HStack spacing='24px'>
                        <Box>{a.id}</Box>
                        <Box>{a.userId}</Box>
                        <Box>{a.action}</Box>
                        <Wrap margin={"auto"}>
                            <WrapItem>
                                <Center w='180px' h='80px'>
                                    {converdate(parseInt(a.createdAt))}
                                </Center>
                            </WrapItem>
                        </Wrap>
                        <Box w='300px'>{<MathComponent tex={a.expression} display={true} />}</Box>
                        <Box w='180px'>{wasSuccessfull(a.success)}</Box>
                        <Box>{<MathComponent tex={a.expstep} display={true} />}</Box>
                    </HStack>
                ))}
            </Box>
        )
    }

    return(
        <Flex height="100vh"  alignItems="center" justifyContent="center">
            <Flex direction="column" background="gray.100" p={12} rounded={6} w='100%' maxW='4xl' alignItems="center" justifyContent="center" margin={"auto"}>
                <Box>
                    {data.allActions.slice(0+fakePagination, 50+fakePagination).map( a => (
                        <HStack spacing='24px'>
                            <Box>{a.id}</Box>
                            <Box>{a.userId}</Box>
                            <Box>{a.action}</Box>
                            <Wrap margin={"auto"}>
                                <WrapItem>
                                    <Center w='180px' h='80px'>
                                        {converdate(parseInt(a.createdAt))}
                                    </Center>
                                </WrapItem>
                            </Wrap>
                            <Box w='300px'>{<MathComponent tex={a.expression} display={true} />}</Box>
                            <Box w='180px'>{wasSuccessfull(a.success)}</Box>
                            <Box>{<MathComponent tex={a.expstep} display={true} />}</Box>
                            <Box>{a.fixedSuccess}</Box>
                            <Box>
                                <Button 
                                colorScheme='teal'
                                onClick={
                                    async ()=>{
                                        await fixed({variables:{id:a.id,newsucc:"true"}})
                                    }}
                                >correcta</Button>
                            </Box>
                            <Box>
                                <Button 
                                colorScheme='teal'
                                onClick={
                                    async ()=>{
                                        await fixed({variables:{id:a.id,newsucc:"false"}})
                                    }}
                                >incorrecta</Button>
                            </Box>
                        </HStack>
                    ))}
                </Box>
                <Button 
                    colorScheme='teal'
                    height={"32px"}
                    width={"88px"}
                    onClick={()=>{if(fakePagination<data.allActions.length-50)setFakePagination(fakePagination+50);else setFakePagination(data.allActions.length-50)}}
                >Enviar</Button>
            </Flex>
        </Flex>
    )
}
export default stats