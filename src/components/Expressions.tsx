import exp01 from "../testexpressions/exp01.json";
import exp02 from "../testexpressions/exp02.json";
import exp03 from "../testexpressions/exp03.json";
import exp04 from "../testexpressions/exp04.json";
import exp05 from "../testexpressions/exp05.json";
import exp06 from "../testexpressions/exp06.json";
import exp07 from "../testexpressions/exp07.json";
import exp08 from "../testexpressions/exp08.json";
import exp09 from "../testexpressions/exp09.json";
import exp10 from "../testexpressions/exp10.json";
import exp11 from "../testexpressions/exp11.json";
import exp12 from "../testexpressions/exp12.json";
import exp13 from "../testexpressions/exp13.json";
import exp14 from "../testexpressions/exp14.json";
import exp15 from "../testexpressions/exp15.json";

const Expressions = (userIndex) => {

  const latinSquareList = () => {
    let easyL=[exp01[0],exp02[0],exp03[0],exp04[0]];
    let mediumL=[exp06[0],exp07[0],exp08[0],exp09[0]];
    let hardL=[exp11[0],exp12[0],exp13[0],exp14[0]];
    let expAr=[easyL,mediumL,hardL];

    let latinSquareL = [];
    let latex=false;

    for(let i=0; i<3;i++){
      let tL=expAr[i];
      for(let j=0;j<2;j++){
        for(let k=0;k<4;k++){
          let temp = [];
          for(let m=0;m<4;m++){
            temp.push({"exp":tL[m],"input":latex});
            latex=latex?false:true;
          }
          tL.push(tL.shift());
          latinSquareL.push(temp);
          latex=latex?false:true;
        }
        latex=latex?false:true;
      }
    }

    return latinSquareL;
  }

  const userLSL = (userIndex) => {
    let userExpL =[];
    let lSL=latinSquareList();

    for(let i=0;i<24;i++){
      userExpL.push(lSL[i][userIndex])
    }
    return userExpL;
  }

  return userLSL(userIndex);
}

export default Expressions