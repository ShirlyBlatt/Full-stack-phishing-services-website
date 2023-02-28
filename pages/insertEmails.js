import Head from "next/head";
import EmailForm from "../components/Forms/EmailForm";
import DataList from "../components/DataList";
import DataListResp from "../components/DataListResp";
import Groups from "../components/Groups";
import clientPromise from "../lib/mongodb";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useState } from "react";
import styles from "../styles/Insert.module.css"


// The page for inserting email recipients, will only be displayed for registered users
const InsertEmails = ({emails, groups, username}) => {
    const [respEmails, setEmails] = useState(false);
    const [respGroups, setGroups] = useState(false);
    
    return (
        <div>
            {/*This div will hold the resposive components, will only show for certain resolutions*/}
            <div className = {styles.respEmailList}>
                {respEmails && <DataListResp dataBase = {emails.emails} type = "Email" username = {username} setList = {setEmails}/>}
                {respGroups && <Groups groups = {groups} type = "Email" username = {username} setGroups = {setGroups}/>}
            </div>
            {!respEmails && !respGroups && <div className = {styles.box}>
                <Head>
                    <title>Phishing Service | Insert Emails</title>
                    <meta name='viewport' content='"width=device-width, initial-scale=1'/>
                </Head>
                <EmailForm username = {username}/>
                {/* Showing the user input emails list if he has any */}
                {emails && <DataList className = {styles.insert} dataBase = {emails.emails} type = "Email" username = {username}/>}
                {/* Adding a div if no emails in the list to fit the grid layout */}
                {!emails && <div></div>}
                <div className = {styles.email}>
                    <h1>Groups</h1>
                    <div className = {styles.list}>
                        {groups && <Groups groups = {groups} type = "Email" username = {username}/>}
                    </div>
                </div>
                <div className = {styles.resp}>
                    <button onClick={() => setEmails(!respEmails)}>Recipients</button>
                    <button onClick={() => setGroups(!respGroups)}>Groups</button>
                </div>
            </div>}
        </div> 
     );
}
 
export default InsertEmails;



// Fetching server side elements, the input emails and email groups of the users
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

            const emails = await db
                .collection("input-Emails")
                .findOne({username : {$eq : username}})
    
            
            const groups = await db
                .collection("Email-Groups")
                .findOne({username : {$eq : username}});
            return {
                props: { emails: JSON.parse(JSON.stringify(emails)), groups: JSON.parse(JSON.stringify(groups)), username: username },
            };
        } catch (e) {
            console.error(e);
        }
    }
})