import { Flex, Heading, Button,Box,HStack,Alert,AlertIcon,VStack} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import ASCIIInput from '../components/ASCIIInput'
import dynamic from "next/dynamic";
import Expressions from '../components/Expressions';
import { useState } from 'react';

const stagea = () => {
  const Mq2 = dynamic(
    () => {
        return import("../components/Mq2");
    },
    { ssr: false }
  );

  const latinSquare = () => {
    let exprList = Expressions(1);
    return exprList;
  }

  const [isMq,setIsMq]=useState(false);
  const [next,setNext]=useState(true);

  const [expL2,setExpL2]=useState(latinSquare());
  const [expIndex,setExpIndex] = useState(0);

  const expList2 = (mq2ev) => {
    console.log("a",expL2);
    
    if(expL2[expIndex].input && expL2!=undefined){
      return (
        <HStack spacing='24px'>
            <Box>
                <Box key={"tA"} flex='1' textAlign='left'>
                    {expL2[expIndex].exp.steps[0].stepTitle} 
                </Box>
                <Mq2
                    key={"Mq2"}
                    step={expL2[expIndex].exp.steps[0]}
                    setNext={setNext}
                />
            </Box>
        </HStack>
      )
    } else {
      return (
        <HStack spacing='24px'>
            {ayudaAscii()}
            <Box>
                <Box key={"tB"} flex='1' textAlign='left'>
                    {expL2[expIndex].exp.steps[0].stepTitle} 
                </Box>
                <ASCIIInput
                key={"1"}
                step={expL2[expIndex].exp.steps[0]}
                setNext={setNext}
                />
            </Box>
        </HStack>
      )
    }
    return (
      <>nada</>
    )
  }

  const ayudaAscii = ()=>{
    let itemValues=[
        {colA:"Suma",colB:"a+b"},{colA:"Resta",colB:"a-b"},{colA:"Multiplicacion",colB:"a*b"},
        {colA:"Division",colB:"a/b"},{colA:"Exponente",colB:"a^b"},{colA:"Raiz cuadrada",colB:"raiz(b)"}
    ]
    let ejemplos=[
        {colA:"Ejemplos",colB:""},{colA:"7-4+2=5",colB:"7-(4+2)=1"},{colA:"1^2*3=3",colB:"1^(2*3)=1"}
    ]
    return (
        <Box>
            <Alert status="info" w="100%" alignItems='top'>
            <AlertIcon />
                <VStack>
                <Heading>Definiciones ASCII</Heading>
                <Box>
                    {itemValues.map(
                        (item,i) => (
                            <HStack spacing='75px'>
                                <Box w="100px">
                                    {item.colA}
                                </Box>
                                <Box w="100px">
                                    {item.colB}
                                </Box>
                            </HStack>
                        )
                    )
                    }
                </Box>
                <Heading size='xs'>Importante el uso de parentesis</Heading>
                <Box>
                    {ejemplos.map(
                        (item,i) => (
                            <HStack spacing='75px'>
                                <Box w="100px">
                                    {item.colA}
                                </Box>
                                <Box w="100px">
                                    {item.colB}
                                </Box>
                            </HStack>
                        )
                    )
                    }
                </Box>
                </VStack>
            </Alert>
        </Box>
    )
  }
  
  return (
    <Flex height="100vh"  alignItems="center" justifyContent="center">
      <Flex direction="column" background="gray.100" p={12} rounded={6} w='100%' maxW='4xl' alignItems="center" justifyContent="center" margin={"auto"}>
        {expList2(isMq)}
        <Box p={4}>
            <Button
              colorScheme='teal'
              height={"32px"}
              width={"88px"}
              onClick={
                ()=>{
                  if(expIndex<24)setExpIndex(expIndex+1);
                  setIsMq(isMq?false:true);
                  setNext(true);
                }
              }
              isDisabled={next}
              hidden={next}
            >Siguiente</Button>
        </Box>
      </Flex>
    </Flex>
  )
}


export default stagea