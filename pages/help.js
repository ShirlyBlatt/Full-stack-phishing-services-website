import Head from "next/head";
import Sidebar from "../components/Layouts/Siderbar";
import Guide from "../components/Guide"
import { useState } from "react";
import clientPromise from "../lib/mongodb";

import styles from "../styles/Help.module.css"

// The Guide page, an explanation on using the site
const Help = ({guides}) => {
    // Using a state to deterimine which sidebar component to show
    const [infoExpand, setInfoExpand] = useState({title: "Welcome", guide: "Lets Get Started", number: 0, img: [], amount : 0});

    const handleGuide = async (guide) => {
        setInfoExpand(guides[guide]);
    }

    return (
        <div className = {styles.box}>
            <Head>
                <title>Phishing Service | Help</title>
                <meta name='viewport' content='"width=device-width, initial-scale=1'/>
            </Head>
            <Sidebar setInfoExpand = {setInfoExpand} guides = {guides}/>
            <div className = {styles.info}>
                <Guide guide = {infoExpand}/>
            </div>
            <div className = {styles.page}>
                {infoExpand.number > 1 && <button onClick = { () => handleGuide(infoExpand.back)}>Last Page {infoExpand.number - 1}/12</button>}
                {infoExpand.number > 0 && <p>Page: {infoExpand.number}</p>}
                {infoExpand.number != 0 && <button onClick = { () => handleGuide(infoExpand.next)}>Next page {infoExpand.number % 12 + 1} /12</button>}
                {!infoExpand.number && <button onClick = { () => handleGuide("Signup")}>Get Started</button>}
            </div>
        </div> 
    );
}
 
export default Help;

export const getStaticProps = async () => {
    // Connecting to the mongo database
    const client = await clientPromise;
    const db = client.db("Phishing");

    const guides = await db.collection("Guides").findOne({});
    return {
        props: {guides : JSON.parse(JSON.stringify(guides))}
    };
}