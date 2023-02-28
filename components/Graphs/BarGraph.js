import {
    Chart as ChartJS,
    BarElement,
    Chart,
} from "chart.js"

ChartJS.register(
    BarElement,
)

import { Bar } from "react-chartjs-2";

import styles from "../../styles/Graph.module.css"

Chart.defaults.color = "white";


const BarGraph = ({clicked, notClicked, color}) => {
    return ( 
        <div className = {styles.graph}>
            <Bar
                data={{
                    labels : ['Clicked'],
                    datasets : [
                        {
                            label: ['# Clicked'],
                            data: [clicked],
                            backgroundColor: [
                                color,
                            ],
                            borderColor: [
                                color,
                            ],
                            barPercentage : 0.8,
                            borderWidth: 2,
                        },
                        {
                            label: ['# Did not click'],
                            data: [notClicked],
                            backgroundColor: [
                                'white',
                            ],
                            borderColor: [
                                'white',
                            ],
                            barPercentage : 0.8,
                            borderWidth: 2
                        }
                    ]
                }}
                
                options ={{
                    maintainAspectRatio: false,
                }}
            />
        </div>
     );
}
 
export default BarGraph;