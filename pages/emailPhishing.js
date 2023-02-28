import Head from "next/head";
import SendEmailForm from "../components/Forms/SendEmailForm";
import EmailTemplates from "../components/Templates/EmailTemplates";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useState } from "react";

import styles from "../styles/Phish.module.css"



// The phishing with emails page
const emailPhishing = ({username, verefied}) => {
    const [template , setTemplate] = useState("");
    const [templateID , setTemplateID] = useState("1");
    
    return (
        <div className = {styles.page}>
            <Head>
                <title>Phishing Service | Phishing</title>
                <meta name='viewport' content='"width=device-width, initial-scale=1'/>
            </Head>
            {/* Only displayed for verefied users */}
            {verefied && <div className= {styles.phish}>
                    <EmailTemplates setTemplate = {setTemplate} templateID = {templateID} setTemplateID = {setTemplateID}/>
                    <SendEmailForm username = {username} template = {template} templateID = {templateID}/>
                    
            </div>}
            {!verefied && <div className = {styles.verify}>
                <h1>Please verify your account with the link sent to your email to start phishing</h1>
            </div>}
        </div>
     );
}
 
export default emailPhishing;


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