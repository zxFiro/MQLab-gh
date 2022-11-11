import { Flex, Heading, Button,Box,HStack,Text} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState,useEffect } from 'react';
import localForage from "localforage";
import {useSnapshot } from 'valtio';
import state,{setState,newuser} from "../components/Proxywvaltio";

import { gql, useQuery , useMutation} from '@apollo/client'
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

const Home: inicio = () => {
  const router = useRouter();

  const seleccionFases = ()=>{
    return(
      <HStack>
          <Box onClick={() => router.push({pathname:"stagea"})} boxShadow='dark-lg' alignItems="center" justifyContent="center">
            <Heading size={"m"} alignItems="center" justifyContent="center">Parte I</Heading>
            <Text noOfLines={[1, 2, 3, 4]} width="300px" height="120px" >
              Presiona aquí para comenzar la primera parte donde se probará el ingreso de expresiones de manera textual vs el uso de la herramienta MathQuill.
            </Text>
          </Box>
          <Box onClick={() => router.push({pathname:"stageb",query:{pid:"e1"},isReady:true})} boxShadow='dark-lg' alignItems="center" justifyContent="center">
            <Heading size={"m"} alignItems="center" justifyContent="center">Parte II</Heading>
            <Text noOfLines={[1, 2, 3, 4]} width="300px" height="120px">
              Presiona aquí para comenzar la segunda parte donde se probará la resolución de diferentes ejercicios expresiones.
            </Text>
          </Box>
      </HStack>
    )
  }
  //valtio
  var variables={
    user:{id:-1,group:-1},
    index:{stagea:false,stageb:false},
    stagea:{index:-1,value:-1},
    stageb:[
      {
        id:"e1",
        completed:false,
        steps:[
          {disabled:false,hidden:false,answer:true,value:""},
          {disabled:false,hidden:false,answer:true,value:""},
          {disabled:false,hidden:false,answer:true,value:""},
          {disabled:false,hidden:false,answer:true,value:""},
          {disabled:false,hidden:false,answer:true,value:""}
        ]
      },
      {
        id:"e3",
        completed:false,
        steps:[
          {disabled:false,hidden:false,answer:true,value:""},
          {disabled:false,hidden:false,answer:true,value:""},
          {disabled:false,hidden:false,answer:true,value:""},
          {disabled:false,hidden:false,answer:true,value:""},
          {disabled:false,hidden:false,answer:true,value:""}
        ]
      },
      {
        id:"e5",
        completed:false,
        steps:[
          {disabled:false,hidden:false,answer:true,value:""},
          {disabled:false,hidden:false,answer:true,value:""},
          {disabled:false,hidden:false,answer:true,value:""}
        ]
      },
      {
        id:"e6",
        completed:false,
        steps:[
          {disabled:false,hidden:false,answer:true,value:""},
          {disabled:false,hidden:false,answer:true,value:""}
        ]
      }
    ]   
  }

  const snap = useSnapshot(state);

  const [iv,setIv]=useState(variables);
  const [uptFlag,setUptFlag]=useState(false);
  const changeWvaltio = () => {
      setState(variables);
  }

  const [addUsr, { datau, loadingu, erroru }] = useMutation(addUser);
  const [updateUsr, { datauu, loadinguu, erroruu }] = useMutation(updateUser);
  if (loadingu) return 'Submitting...U';
  if (erroru) return `Submission errorU! ${erroru.message}`;

  const newuser = async () => {  

    var a = await addUsr({variables:{usertype:"B"}});
    var b = a.data.addUser.id
    var ut = {
        0:"A",
        1:"B",
        2:"C",
        3:"D"
    }
    var c=ut[b%4]
    await updateUsr({variables:{id:b,usertype:c}});
    iv.user.id=b;
    iv.user.group=b%4;
    //setIv(iv);
    setState(iv);   
  };

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

  useEffect(()=>{if(iv.user.id==-1&&uptFlag) {setUptFlag(false);newuser();}},[uptFlag])

  return (
    <Flex height="100vh"  alignItems="center" justifyContent="center">
      <Flex direction="column" background="gray.100" p={12} rounded={6} w='100%' maxW='3xl' alignItems="center" justifyContent="center" margin={"auto"}>
        <Heading size="m">Tu usuario asignado es {iv.user.id}</Heading>
        {seleccionFases()}
      </Flex>
    </Flex>
  )
}


export default Home
