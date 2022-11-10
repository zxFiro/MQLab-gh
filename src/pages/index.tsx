import { Flex, Heading, Button,Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react';
const Home: inicio = () => {
  
  return (
    <Flex height="100vh"  alignItems="center" justifyContent="center">
      <Flex direction="column" background="gray.100" p={12} rounded={6} w='100%' maxW='3xl' alignItems="center" justifyContent="center" margin={"auto"}>
        <Box p={4}>
          <Button colorScheme='teal' height={"32px"} width={"88px"}
          >Siguiente</Button>
        </Box>
      </Flex>
    </Flex>
  )
}


export default Home
