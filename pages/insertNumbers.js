import Head from "next/head";
import NumberForm from "../components/Forms/NumberForm";
import DataList from "../components/DataList";
import Groups from "../components/Groups";
import DataListResp from "../components/DataListResp";
import clientPromise from "../lib/mongodb";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useState } from "react";

import styles from "../styles/Insert.module.css"


// The page for inserting text recipients, will only be displayed for registered users
const InsertNumbers = ({numbers, groups, username}) => {
    const [respNumbers, setNumbers] = useState(false);
    const [respGroups, setGroups] = useState(false);

    return (  
        <div>
            {/*This div will hold the resposive components, will only show for certain resolutions*/}
            <div className = {styles.respNumberList}>
                {respNumbers && <DataListResp dataBase = {numbers.numbers} type = "Number" username = {username} setList = {setNumbers}/>}
                {respGroups && <Groups groups = {groups} type = "Number" username = {username} setGroups = {setGroups}/>}
            </div>
            {!respNumbers && !respGroups && <div className = {styles.box}>
                <Head>
                    <title>Phishing Service | Insert Numbers</title>
                    <meta name='viewport' content='"width=device-width, initial-scale=1'/>
                </Head>
                <NumberForm username = {username}/>
                {/* Showing the user input numbers list if he has any */}
                {numbers && <DataList className = {styles.insert} dataBase = {numbers.numbers} type = "Number" username = {username}/>}
                {/* Adding a div if no numbers in the list to fit the grid layout */}
                {!numbers && <div></div>}
                <div className = {styles.number}>
                    <h1>Groups</h1>
                    <div className = {styles.list}>
                        {groups && <Groups groups = {groups} type = "Number" username = {username}/>}
                    </div>
                </div>
                <div className = {styles.respText}>
                    <button onClick={() => setNumbers(!respNumbers)}>Recipients</button>
                    <button onClick={() => setGroups(!respGroups)}>Groups</button>
                </div> 
            </div>}
        </div>
    );
}
export default InsertNumbers;


// Fetching server side elements, the input numbers and number groups of the users
// Also checking if the user is registered
export const getServerSideProps = withPageAuthRequired({
    returnTo: '/api/auth/login',
    async getServerSideProps(context) {
        // Get user from sessions
        const session = getSession(context.req, context.res);
        const username = session.user.email
        try {
            // Connecting to the mongo database
            const client = await clientPromise;
            const db = client.db("Phishing");

            const numbers = await db
                .collection("input-Numbers")
                .findOne({username : {$eq : username}})
    
            const groups = await db
                .collection("Number-Groups")
                .findOne({username : {$eq : username}});

            return {
                props: { numbers: JSON.parse(JSON.stringify(numbers)), groups: JSON.parse(JSON.stringify(groups)),  username : username },
            };
        } catch (e) {
            console.error(e);
        }
    }
 })