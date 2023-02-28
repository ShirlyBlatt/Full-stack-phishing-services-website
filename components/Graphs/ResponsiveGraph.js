import BarGraph from "./BarGraph";
import PieGraph from "./PieGraph";

import styles from "../../styles/Graph.module.css"


const ResponsiveGraph = ({clicked, notClicked, setGraph, color}) => {
    return ( 
        <div className = {styles.responsiveGraphs}>
            
            <BarGraph clicked = {clicked} notClicked = {notClicked} color = {color}/>
            <PieGraph clicked = {clicked} notClicked = {notClicked} color = {color}/>
        </div>
    );
}
 
export default ResponsiveGraph;