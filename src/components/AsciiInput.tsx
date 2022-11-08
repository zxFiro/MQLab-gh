import {Alert, AlertIcon,Button, Flex, Stack, Box, HStack, VStack, Input} from '@chakra-ui/react';
import {useRef,useState, useCallback,memo} from "react";
import { MathComponent } from './MathJax'
import MQPostfixSolver from './MQPostfixSolver';
import MQPostfixparser from './MQPostfixparser';


const AsciiInput =  ({step,setFail,setSubmit,setAns}) => {

    //Mq1
    const [latex, setLatex] = useState("");

    //Inputsimple
    const [alerta,setAlerta] = useState("success");
    const [alertaMSG,setAlertaMSG] = useState("");
    const [alertaVisibility,setAlertaVisibility] = useState(true);
    
    const [error, setError] = useState(false); //true when the student enters an incorrect answers

    //la siguiente funcion maneja la respuesta ingresada, la respuesta se compara con el valor correspondiente almacenado en el ejercicio.json
    //Ademas, se manejan los componentes de alerta utilizado en el componente padre(solver2) y el componente hijo(Mq2)
    //finalmente, se maneja la activacion del siguiente paso o resumen en caso de que la respuesta ingresada es correcta
    const handleAnswer = () => {
        let exp=step.answers[0].answer[0];
        let parse1=MQPostfixparser(exp);
        let parse2=MQPostfixparser(latex);
        let answer1 = "";
        let answer2 = "";
        if (step.values != undefined) {
            console.log("valores: ", step.values)
            answer1= MQPostfixSolver(parse1.substring(0),step.values);
            answer2= MQPostfixSolver(parse2.substring(0),step.values);
        } else {
            answer1= MQPostfixSolver(parse1.substring(0));
            answer2= MQPostfixSolver(parse2.substring(0),step.values);
        }
        if(answer1==answer2) {
            setAlerta("success");
            setAlertaMSG("Has ingresado la expresion correctamente!.");
            setAlertaVisibility(false);
            setFail(false);
        } else {
            setAlerta("error");
            setAlertaMSG("La expresion ingresada no es correcta.");
            setAlertaVisibility(false);
            setFail(true);
        }
        setSubmit(true);
    }

    const handleChange=(e)=> {
        setLatex(e.target.value)
        setAns(latex);
    }

    return (
        <>
            <VStack alignItems="center" justifyContent="center" margin={"auto"}>
                <Box>
                    <MathComponent tex={step.expression} display={true} />
                </Box>
                <Box>
                    <HStack spacing='4px' alignItems="center" justifyContent="center" margin={"auto"}>
                        <Input placeholder='Ingresa la expresion aqui' onChange={(e)=>{handleChange(e)}}/>
                    </HStack>
                </Box>
            </VStack>
            <HStack spacing='4px' alignItems="center" justifyContent="center" margin={"auto"}>
                    <Box>
                        <Button colorScheme='teal' height={"32px"} width={"88px"}onClick={()=>{handleAnswer();}}>Enviar</Button>
                    </Box>
            </HStack>
            <Alert status={alerta} mt={2} hidden={alertaVisibility}>
                <AlertIcon />
                {alertaMSG}
            </Alert>
        </>
    )

}

export default memo(AsciiInput);