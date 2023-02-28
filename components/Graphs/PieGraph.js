import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from "chart.js"

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)
import { Pie } from "react-chartjs-2";

import styles from "../../styles/Graph.module.css"


const PieGraph = ({clicked, notClicked, color}) => {
    return ( 
        <div className = {styles.graph}>
            <Pie
                data={{
                    labels : ['% Clicked','% Did not click' ],
                    datasets : [
                        {
                            label: ['% of Clicked'],
                            data: [clicked / (notClicked+clicked) * 100, notClicked / (notClicked + clicked) * 100],
                            backgroundColor: [
                                color,
                                'white',
                            ],
                            borderColor: [
                                color,
                                'white',
                            ],
                            barPercentage : 0.7,
                            borderWidth: 2
                        }
                    ]
                }}
            />
        </div>
     );
}
 
export default PieGraph;