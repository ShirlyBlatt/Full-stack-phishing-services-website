import Head from "next/head";
import SendTextForm from "../components/Forms/SendTextForm";
import TextTemplates from "../components/Templates/TextTemplates";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useState } from "react";

import styles from "../styles/Phish.module.css"



// The phishing with texts page
const textPhishing = ({username, verefied}) => {
    const [template , setTemplate] = useState("");
    const [body, setBody] = useState("");

    return (
        <div>
            <Head>
                <title>Phishing Service | Phishing</title>
                <meta name='viewport' content='"width=device-width, initial-scale=1'/>
            </Head>
            {/* Only displayed for verefied users */}
            {verefied && <div className = {styles.phish}>
                    <TextTemplates setTemplate = {setTemplate} setBody = {setBody}/>
                    <SendTextForm username = {username} body = {body} setBody = {setBody} template = {template}/>           
            </div> }
            {!verefied && <div className = {styles.verify}>
                <h1>Please verify your account with the link sent to your email to start phishing</h1>
            </div>}
        </div>
     );
}
 
export default textPhishing;


// Getting Server side elements, the username and if it is verfied
export const getServerSideProps = withPageAuthRequired({
    returnTo: '/api/auth/login',
    async getServerSideProps(context) {
        // Get the user and check if it is verefied
        const session = getSession(context.req, context.res);
        const username = session.user.email;
        const verefied = session.user.email_verified
        return {
            props: {username: username, verefied: verefied },
        }
    }
})