import { Flex, Heading, Button,Box,HStack,Alert,AlertIcon,VStack} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import ASCIIInput from '../components/ASCIIInput'
import dynamic from "next/dynamic";
import Expressions from '../components/Expressions';
import { useEffect, useRef, useState } from 'react';
import { syncBuiltinESMExports } from 'module';

const stagea = () => {
    const Mq2 = dynamic(
    () => {
        return import("../components/Mq2");
    },
    { ssr: false }
    );

    const latinSquare = () => {
    let exprList = Expressions(0);
    return exprList;
    }

    const expL2 = useRef(latinSquare());
    const expIndex = useRef(0);

    const [fail,setFail] = useState(true);
    const [submit,setSubmit] = useState(false);
    const [failCounter,setFailCounter] = useState(0);

    const expList2 = () => {
        if(expL2.current[expIndex.current].input && expL2.current!=undefined){
            return (
            <VStack spacing='24px'>
                <Box>
                    <Box key={"tA"} flex='1' textAlign='left'>
                        {expL2.current[expIndex.current].exp.steps[0].stepTitle} 
                    </Box>
                    <Mq2
                        key={"Mq2"}
                        step={expL2.current[expIndex.current].exp.steps[0]}
                        disablehint={true}
                        setFail={setFail}
                        setSubmit={setSubmit}
                    />
                </Box>
                {ayudaMQ()}
            </VStack>
            )
        } else {
            return (
            <VStack spacing='24px'>
                <Box>
                    <Box key={"tB"} flex='1' textAlign='left'>
                        {expL2.current[expIndex.current].exp.steps[0].stepTitle} 
                    </Box>
                    <ASCIIInput
                    key={"1"}
                    step={expL2.current[expIndex.current].exp.steps[0]}
                    setFail={setFail}
                    setSubmit={setSubmit}
                    />
                </Box>
                {ayudaAscii()}
            </VStack>
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
                <Heading size='m'>Ayudas para ingreso de operaciones</Heading>
                <Box>
                    {itemValues.map(
                        (item,i) => (
                            <HStack key={"AHSA"+i} spacing='75px'>
                                <Box key={"AB1A"+i} w="100px">
                                    {item.colA}
                                </Box>
                                <Box key={"AB2A"+i} w="100px">
                                    {item.colB}
                                </Box>
                            </HStack>
                        )
                    )
                    }
                </Box>
                <Heading size='m'>Importante el uso de parentesis</Heading>
                <Box>
                    {ejemplos.map(
                        (item,i) => (
                            <HStack key={"EHSA"+i} spacing='75px'>
                                <Box key={"EB1A"+i} w="100px">
                                    {item.colA}
                                </Box>
                                <Box key={"EB2A"+i} w="100px">
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

    const ayudaMQ = ()=>{
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
                <Heading size='m'>Ayudas para ingreso de operaciones</Heading>
                <Box>
                    {itemValues.map(
                        (item,i) => (
                            <HStack key={"AHSB"+i} spacing='75px'>
                                <Box key={"AB1B"+i} w="100px">
                                    {item.colA}
                                </Box>
                                <Box key={"AB2B"+i} w="100px">
                                    {item.colB}
                                </Box>
                            </HStack>
                        )
                    )
                    }
                </Box>
                <Heading size='m'>Importante el uso de parentesis</Heading>
                <Box>
                    {ejemplos.map(
                        (item,i) => (
                            <HStack key={"EHSB"+i} spacing='75px'>
                                <Box key={"EB1B"+i} w="100px">
                                    {item.colA}
                                </Box>
                                <Box key={"EB2B"+i} w="100px">
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

    const [currentTool,setCurrentTool] = useState(expList2());
    const [startTimer,setStartTimer]=useState(false);
    const [timerI,setTimerI]=useState(2);
    
    useEffect(
    ()=>{
        function sleep(ms) {
            setTimeout(()=>transition(), ms);
        }
        function transition(){
            setFail(true);
            expIndex.current+=1;     
            setFailCounter(0);
            setCurrentTool(expList2());
            setStartTimer(false);
            console.log(timerI)
        }

        
        function onSubmit(){
            if (submit) {
                console.log(failCounter);
                if (failCounter>1 || !fail) {
                    setTimerI(2);
                    setStartTimer(true);
                    let a = setInterval(()=>{
                        if(timerI>0){
                            setTimerI(timerI-1);
                        } else {
                            clearInterval(a);
                        }
                    },1000);
                    sleep(2000);
                } else {
                    setFailCounter(failCounter+1);
                }
                setSubmit(false);
            }
        }
        onSubmit();
    },[submit]);

    const timer = () => {
        if (startTimer) {
            return <Heading size='m'>Pasaremos a la siguiente expresion en {timerI} segundos.</Heading>
        }
        return (<></>);
    }

  
    return (
    <Flex height="100vh"  alignItems="center" justifyContent="center">
        <Flex direction="column" background="gray.100" p={12} rounded={6} w='100%' maxW='4xl' alignItems="center" justifyContent="center" margin={"auto"}>
            {timer()}
            {currentTool}
        </Flex>
    </Flex>
    )
}


export default stagea