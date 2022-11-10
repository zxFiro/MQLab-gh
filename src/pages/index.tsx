import { Flex, Heading, Button,Box,HStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react';
const Home: inicio = () => {
  const router = useRouter();

  const seleccionFases = ()=>{
    return(
      <HStack>
          <Box onClick={() => router.push({pathname:"stagea",query:{pid:"e1"},isReady:true})}>
            <Heading size={"m"}>Parte I</Heading>
            potato1
          </Box>
          <Box onClick={() => router.push({pathname:"stageb",query:{pid:"e1"},isReady:true})}>
            <Heading size={"m"}>Parte II</Heading>
            potato2
          </Box>
      </HStack>
    )
  }
  
  return (
    <Flex height="100vh"  alignItems="center" justifyContent="center">
      <Flex direction="column" background="gray.100" p={12} rounded={6} w='100%' maxW='3xl' alignItems="center" justifyContent="center" margin={"auto"}>
        {seleccionFases()}
        <Box p={4}>
          <Button colorScheme='teal' height={"32px"} width={"88px"}
          >Siguiente</Button>
        </Box>
      </Flex>
    </Flex>
  )
}


export default Home
