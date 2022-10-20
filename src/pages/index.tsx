import { Flex, Heading, Button,Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import ASCIIInput from '../components/ASCIIInput'
import dynamic from "next/dynamic";
import Expressions from '../components/Expressions';
import { useState } from 'react';
const Home: inicio = () => {
  const Mq2 = dynamic(
    () => {
        return import("../components/Mq2");
    },
    { ssr: false }
  );
  
  const shuffledList = () => {
    let exprList = Expressions();
    exprList= exprList.sort(function(){return 0.5 - Math.random()});
    return exprList;
  }

  const [isMq,setIsMq]=useState(false);
  const [next,setNext]=useState(true);

  const [expL,setExpL]=useState(shuffledList());
  const [expIndex,setExpIndex] = useState(0);

  const expList = (mq2ev) => {
    console.log("a",expL[expIndex].itemId,expL[expIndex].steps[0].expression);
    
    if(mq2ev && expL!=undefined){
      return (
        <>
          <Box key={"tA"} flex='1' textAlign='left'>
              {expL[expIndex].steps[0].stepTitle} 
          </Box>
          <Mq2
            key={"Mq2"}
            step={expL[expIndex].steps[0]}
            setNext={setNext}
          />
        </>
      )
    } else {
      return (
        <>
          <Box key={"tB"} flex='1' textAlign='left'>
              {expL[expIndex].steps[0].stepTitle} 
          </Box>
          <ASCIIInput
            key={"1"}
            step={expL[expIndex].steps[0]}
            setNext={setNext}
          />
        </>
      )
    }
    return (
      <>nada</>
    )
  } 

  
  return (
    <Flex height="100vh"  alignItems="center" justifyContent="center">
      <Flex direction="column" background="gray.100" p={12} rounded={6} w='100%' maxW='3xl' alignItems="center" justifyContent="center" margin={"auto"}>
        {expList(isMq)}
        <Box p={4}>
            <Button
              colorScheme='teal'
              height={"32px"}
              width={"88px"}
              onClick={
                ()=>{
                  if(expIndex<14)setExpIndex(expIndex+1);
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


export default Home
