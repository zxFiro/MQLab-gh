import {Alert, AlertIcon,Button, Flex, Stack, Box, HStack, VStack, Input} from '@chakra-ui/react';
import {useRef,useState, useCallback,memo,useEffect} from "react";
import { MathComponent } from './MathJax'
import MQPostfixSolver from './MQPostfixSolver';
import MQPostfixparser from './MQPostfixparser';
//Following imports are utilized for sesion information persistence:
import localForage from "localforage";
import {useSnapshot } from 'valtio';
import state,{setState} from "../components/Proxywvaltio";
import { gql, useQuery , useMutation} from '@apollo/client'

const addAction = gql`
    mutation(
        $inputType: String
        $view: String
        $usertype: String
        $action: String
        $userId: Int
        $label: String
        $expstep: String
        $expression: String
        $value: String
        $success: Boolean
        ) {
            addAction(
                inputType:$inputType
                view:$view
                usertype:$usertype
                action:$action
                userId:$userId
                label: $label
                expstep: $expstep
                expression: $expression
                value: $value
                success: $success
            ) {
                inputType
                view
                usertype
                action
                userId
                label
                expstep
                expression
                value
                success
        }
        }

`;

const AsciiInput =  ({step,setFail,setSubmit,setAns}) => {
    const [addAct, { datam, loadingm, errorm }] = useMutation(addAction);
    //con valtio
    const snap = useSnapshot(state);

    const [iv,setIv]=useState();
    const [uptFlag,setUptFlag]=useState(false);
    const changeWvaltio = () => {
        setState(iv);
    }
  
    useEffect(()=>{
            localForage.getItem('MQlab', function (err, value) {
            console.log(err);
            // if err is non-null, we got an error. otherwise, value is the value
            if (err==null) {
                const foraging = value;
                foraging!=undefined ?setIv(value) : changeWvaltio();
                setUptFlag(true);
            } else {
                //do something if error?
            }
        });
    },[]);

    const testaction = (action,value,label,success,expstep) => {
        var ut = {
            0:"A",
            1:"B",
            2:"C",
            3:"D"
        }
        if(iv!=undefined)
        {addAct({
            variables: {
                    inputType:"ASCII",
                    view:"EXPCOPY",
                    usertype:ut[iv.user.group],
                    action:action,
                    userId:iv.user.id,
                    expression:step.expression,
                    expstep:expstep,
                    label:label,
                    success:success,
                    value:value,
        }})}
    }

    //Mq1
    const [latex, setLatex] = useState("");

    //Inputsimple
    const [alerta,setAlerta] = useState("success");
    const [alertaMSG,setAlertaMSG] = useState("");
    const [alertaVisibility,setAlertaVisibility] = useState(true);
    
    const [error, setError] = useState(true); //true when the student enters an incorrect answers
    const [fc,setFC] = useState(true);

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
            testaction("PRESSEDBUTTON","submit","PRESSEDBUTTON",true,latex);
            setFC(true);
        } else {
            setAlerta("error");
            setAlertaMSG("La expresion ingresada no es correcta.");
            setAlertaVisibility(false);
            setFail(true);
            testaction("PRESSEDBUTTON","submit","PRESSEDBUTTON",true,latex);
        }
        setSubmit(true);
    }

    const handleChange=(e)=> {
        setLatex(e.target.value)
        setAns(latex);
        if(fc){
            testaction("PRESSEDBUTTON","first change","PRESSEDBUTTON",true,latex);
            setFC(false);
        }
    }

    return (
        <>
            <VStack alignItems="center" justifyContent="center" margin={"auto"}>
                <Box>
                    <MathComponent tex={step.expression} display={true} />
                </Box>
                <Box>
                    <HStack spacing='4px' alignItems="center" justifyContent="center" margin={"auto"}>
                        <Input
                            placeholder='Ingresa la expresion aqui'
                            onChange={
                                (e)=>{
                                    handleChange(e);
                                }
                            }
                        />
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