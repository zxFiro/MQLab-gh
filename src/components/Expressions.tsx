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

const Expressions = () => {
  const getExpressionList = ()=>{
    let expressionList = [
        exp01[0],exp02[0],exp03[0],exp04[0],exp05[0],
        exp06[0],exp07[0],exp08[0],exp09[0],exp10[0],
        exp11[0],exp12[0],exp13[0],exp14[0],exp15[0]
    ];
    return expressionList;
  }

  return getExpressionList();
}

export default Expressions