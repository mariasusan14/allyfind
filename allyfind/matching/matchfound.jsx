import { Link } from "react-router-dom";
import { CalculateMatchScore } from "./matching";
export const MatchFound=()=>{
  return(
    <div>
{/*<div><CalculateMatchScore/></div>*/}
      <Link to="/room"><button>Go to study room</button></Link>
    </div>
  );
}