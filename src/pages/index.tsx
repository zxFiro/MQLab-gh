import { Flex, Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import ASCIIInput from '../components/ASCIIInput'
import exp01 from "../testexpressions/exp01.json";
const Home: inicio = ({steps}) => {
  return (
    <Flex height="100vh"  alignItems="center" justifyContent="center">
      <Flex direction="column" background="gray.100" p={12} rounded={6} w='100%' maxW='3xl' alignItems="center" justifyContent="center" margin={"auto"}>
        <ASCIIInput
          key={"1"}
          step={steps.steps[0]}
        />
      </Flex>
    </Flex>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pid  = await context.query.pid;

  class ejercicio{
      private e;
      public setE(a){
          this.e=a;
      }
      public getE(){
          return this.e;
      }
  }

  const ej= new ejercicio();
  ej.setE(exp01);

  return {
    props: {steps:ej.getE()[0]}, // will be passed to the page component as props
  }
}

export default Home
