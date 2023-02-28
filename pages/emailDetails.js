import Head from "next/head";
import DataList from "../components/DataList";
import BarGraph from "../components/Graphs/BarGraph";
import PieGraph from "../components/Graphs/PieGraph";
import ResponsiveGraph from "../components/Graphs/ResponsiveGraph";
import DataListResp from "../components/DataListResp";
import clientPromise from "../lib/mongodb";
import { useState } from "react";
import { getSession } from "@auth0/nextjs-auth0";

import styles from "../styles/Details.module.css"




// The sent email details page, will be rendered for each sent mail
const Details = ({data, loggers}) => {
    
    // Using states to determine if to show or hide the graphs
    // Some states are used for the responsive componenets
    const [graph, setGraph] = useState("Show");
    const [respGraph, setRespGraph] = useState("Show");
    const [sentList, setSentList] = useState("Show");
    const [clickedList, setClickedList] = useState("Show");

    const notClicked = data.recievers.length - loggers.loggers.length;
    const clicked = loggers.loggers.length
    
    // On phones a button will allow for viewing lists.
    const handleSentList = () => {
        sentList == "Show" ? setSentList("Hide") : setSentList("Show"); 
    }

    const handleClickedList = () => {
        clickedList == "Show" ? setClickedList("Hide") : setClickedList("Show"); 
    }

    // When called, if button was clicked, show / hide graphs
    const showGraphs = () => {
        graph == "Show" ? setGraph("Hide") : setGraph("Show");
    }
    
    const showRespGraphs = () => {
        respGraph == "Show" ? setRespGraph("Hide") : setRespGraph("Show");
    }

    return ( 
        <div className= {styles.box}>
            {/*This div will hold the resposive components, will only show for certain resolutions*/}
            <div className = {styles.sentList}>
                {sentList == "Hide" && <DataListResp dataBase = {data.recievers} setList = {handleSentList}/>}
                {clickedList == "Hide" && <DataListResp dataBase = {loggers.loggers} setList = {handleClickedList}/>}
                {respGraph == "Hide" && <div>
                    <button onClick = {() => setRespGraph("Show")}>Hide Graphs</button>
                    <ResponsiveGraph clicked = {clicked} notClicked = {notClicked} setGraph = {setRespGraph} color = {'#f1356d'}/>
                </div>}
            </div>
            {clickedList == "Show" && sentList == "Show" && respGraph == "Show" && <div className = {styles.box}>
                <Head>
                    <title>Phishing Service | Details</title>
                    <meta name='viewport' content='"width=device-width, initial-scale=1'/>
                </Head>
                <div className = {styles.top}>
                    <div className = {styles.email}>
                        <h1>Details:</h1>
                        <h2>{data.title}</h2>
                        {/* Getting the date without the time*/}
                        <h3>{data.createdAt.substr(0,10)}</h3>
                        <h3>{data.subject}</h3>
                        <p>{data.message}</p>
                    </div>
                    <div className= {styles.topRight}>
                        <h1>Sent To:</h1>
                        <button onClick = {() => handleSentList()}>{sentList} List</button>
                        <div className = {styles.sentTo}>
                            <DataList dataBase = {data.recievers}/>
                        </div>
                    </div>
                </div>
                <div className= {styles.emailBottom}>
                    <div className={styles.graph}>
                        {graph == "Show" && <h1>Clicked: {clicked} / {data.recievers.length}</h1>}
                        <div>
                            <button className = {styles.respBtn} onClick = {() => showRespGraphs()}>{graph} Graphs</button>
                            <button className = {styles.button}  onClick={() => showGraphs()}>{graph} Graphs</button>
                        </div>
                    </div>
                    <button className = {styles.listButton} onClick = {() => handleClickedList()}>{clickedList} List</button>
                    {graph == "Hide" && <div className = {styles.graphs}> 
                        <BarGraph clicked = {clicked} notClicked = {notClicked} color = '#f1356d'/>
                        <PieGraph clicked = {clicked} notClicked = {notClicked} color = '#f1356d'/>
                    </div>}
                    {graph == "Show" && <div className = {styles.emailClicked}>
                        <DataList dataBase = {loggers.loggers}/>
                    </div>}
                </div>
            </div>}
        </div>
    );
}
 
export default Details;


// Fetching server side elements, the sent mails and its link loggers
export async function getServerSideProps(context) {
    try {
        // Connecting to the mongo database
        const client = await clientPromise;
        const db = client.db("Phishing");
        
        // Getting url params to find the right sent email
        const id = context.query.id
        // Getting username
        const username = getSession(context.req, context.res).user.email;
        
        // Using the id param to locatae the right user
        var data = await db.collection("sent-Mails").findOne({username : {$eq: username}});
        data = data.emails.find((item) => item.id == id)

        const loggers = await db.collection("loggers").findOne({sentID : {$eq : data.id}});

        return {
            props: { data: JSON.parse(JSON.stringify(data)), loggers : JSON.parse(JSON.stringify(loggers))},
        };
    } catch (e) {
        return (console.log(e));
    }
}