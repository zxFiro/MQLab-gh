import {Alert, AlertIcon,Button, Flex, Stack, Box, HStack, VStack, Text} from '@chakra-ui/react';
import {useRef,useState, useCallback,memo, useEffect,component} from "react";
import { addStyles, EditableMathField } from 'react-mathquill';
import { MathComponent } from '../components/MathJax'
//se importa el componente hint desarrollado por Miguel Nahuelpan
import Hint from "../components/Hint";
import MQPostfixSolver from './MQPostfixSolver';
import MQPostfixparser from './MQPostfixparser';
//Following imports are utilized for sesion information persistence:
import localForage from "localforage";
import {useSnapshot } from 'valtio';
import state,{setState} from "../components/Proxywvaltio";
import { gql, useQuery , useMutation} from '@apollo/client'
addStyles();

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


const Mq2 =  ({step,disablehint,setFail,setSubmit,setAns,fase,setDefaultIndex}) => {
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
                    inputType:"MATHQUILL",
                    view:fase,
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

    let entero= parseInt(step.stepId);

    //Mq1
    const [latex, setLatex] = useState(" ");

    //inline style aprendido para componentes react en... https://codeburst.io/4-four-ways-to-style-react-components-ac6f323da822
    const EMFStyle ={
        width: "190px",
        maxHeight: "120px",
        marginBottom: "12px",
        border: "3px solid #73AD21",
        userSelect: "none"
    }
    const [placeholder,setPlaceholder] = useState(true);

    const [ta,setTa] = useState();
    const [btnTxt, setBtnTxt] = useState("");
    const refBtnTxt = useRef(btnTxt);
    const [flag,setFlag] = useState(false);

    //hooks utilizados poara forzar el re-renderizado
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    //Inputsimple
    const [alerta,setAlerta] = useState("success");
    const [alertaMSG,setAlertaMSG] = useState("");
    const [alertaVisibility,setAlertaVisibility] = useState(true);
    
    //hook de miguel definido para los hints
    const [error, setError] = useState(false); //true when the student enters an incorrect answers
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
            setAns(latex);
            setFail(false);
            testaction("PRESSEDBUTTON","submit","PRESSEDBUTTON",true,latex);
            setFC(true);
            if(setDefaultIndex)setDefaultIndex([parseInt(step.stepId)+1])
        } else {
            setAlerta("error");
            setAlertaMSG("La expresion ingresada no es correcta.");
            setAlertaVisibility(false);
            setError(true);
            setFail(true);
            testaction("PRESSEDBUTTON","submit","PRESSEDBUTTON",false,latex);
        }
        setSubmit(true);
    }


    const refMQElement = (mathquill) => { 
        if (ta==undefined) {
            setTa(()=>{return mathquill});
        }
    }
    
    const hope = (prop) => {
        refBtnTxt.current=prop;
        btnTxt:refBtnTxt.current;
        setBtnTxt(refBtnTxt.current);
        forceUpdate()
    }

    const MQtools = (operation,action,label) => {
        if(ta!=undefined)ta.cmd(operation);
        //action,value,label,success,inputvalue
        //review and redefine label value
        testaction(action,operation,action,false,latex);
    }

    const clear = () =>{
        if(ta!=undefined)setLatex("");
        testaction("MOUSEDOWN","clear","MOUSEDOWN",false,latex);
    }

    const enabledhint = () => {
        if(disablehint){
            return (
                <></>
            )
        }else{
            return(
                <Hint
                hints={step.hints}
                //stepId={ejercicio.stepId}
                contentId={3}
                stepId={step.stepId}
                matchingError={step.matchingError}
                response={["response1","response2"]}
                itemTitle="Factor Común compuesto "
                error={error}
                setError={setError}
                ></Hint>
            )
        }
    }
    useEffect(()=>{
        if(fc&&latex!=""&&latex!=" "){
            testaction("PRESSEDBUTTON","first change","PRESSEDBUTTON",true,latex);
            setFC(false);
        }
    },[latex]);

    return (
        <>
            <VStack alignItems="center" justifyContent="center" margin={"auto"}>
                <Box>
                    <MathComponent tex={step.expression} display={true} />
                </Box>
                <Box>
                    <Stack spacing={4} direction='row' align='center' pb={4}>
                        {/*importante la distincion de onMouseDown vs onClick, con el evento onMouseDown aun no se pierde el foco del input*/}
                        <Button colorScheme='teal' onMouseDown={(e)=>{e.preventDefault();MQtools("(","MOUSEDOWN","MOUSEDOWN")}}>{"\("}</Button>
                        <Button colorScheme='teal' onMouseDown={(e)=>{e.preventDefault();MQtools(")","MOUSEDOWN","MOUSEDOWN")}}>{"\)"}</Button>
                        <Button colorScheme='teal' onMouseDown={(e)=>{e.preventDefault();MQtools("^","MOUSEDOWN","MOUSEDOWN")}}>^</Button>
                        <Button colorScheme='teal' onMouseDown={(e)=>{e.preventDefault();MQtools("\\sqrt","MOUSEDOWN","MOUSEDOWN")}}>√</Button>
                    </Stack>
                    <Stack spacing={4} direction='row' align='center' pb={4}>
                        {/*importante la distincion de onMouseDown vs onClick, con el evento onMouseDown aun no se pierde el foco del input,
                           Ademas con mousedown se puede usar preventDefault*/}
                        <Button colorScheme='teal' onMouseDown={(e)=>{e.preventDefault();MQtools("+","MOUSEDOWN","MOUSEDOWN")}}>+</Button>
                        <Button colorScheme='teal' onMouseDown={(e)=>{e.preventDefault();MQtools("-","MOUSEDOWN","MOUSEDOWN")}}>-</Button>
                        <Button colorScheme='teal' onMouseDown={(e)=>{e.preventDefault();MQtools("*","MOUSEDOWN","MOUSEDOWN")}}>*</Button>
                        <Button colorScheme='teal' onMouseDown={(e)=>{e.preventDefault();MQtools("\\frac","MOUSEDOWN","MOUSEDOWN")}}>/</Button>
                        <Button colorScheme='teal' onMouseDown={(e)=>{e.preventDefault();clear()}}>C</Button>
                    </Stack>
                    <HStack spacing='4px' alignItems="center" justifyContent="center" margin={"auto"}>
                        <Button colorScheme='teal' onMouseDown={(e)=>{e.preventDefault(); if(ta!=undefined)ta.keystroke('Left');}} size='xs'>L</Button>
                        <EditableMathField
                            key={"EMF"+entero}
                            latex={latex}
                            style={EMFStyle}
                            onMouseDown={
                                ()=>{
                                    if(placeholder){
                                        setPlaceholder(false);
                                        setLatex("");
                                    }
                                }
                            }
                            onChange={(mathField,KeyboardEvent) => {
                                    //if(placeholder){setLatex("\\text{Ingresa la expresion aqui}")}
                                    setLatex(()=>mathField.latex());
                                    refMQElement(mathField);
                                }
                            }
                            disabled={true}
                        >
                        </EditableMathField>
                        <Button colorScheme='teal' onMouseDown={(e)=>{e.preventDefault(); if(ta!=undefined)ta.keystroke('Right');}} size='xs'>R</Button>
                    </HStack>
                    </Box>
            </VStack>
            <HStack spacing='4px' alignItems="center" justifyContent="center" margin={"auto"}>
                    <Box>
                        <Button colorScheme='teal' height={"32px"} width={"88px"}onClick={()=>{handleAnswer();}}>Enviar</Button>
                    </Box>
                    {enabledhint()}
            </HStack>
            <Alert status={alerta} mt={2} hidden={alertaVisibility}>
                <AlertIcon />
                {alertaMSG}
            </Alert>
        </>
    )

}

export default memo(Mq2);