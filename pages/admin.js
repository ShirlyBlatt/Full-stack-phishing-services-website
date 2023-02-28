import Head from "next/head";
import Link from "next/link";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";

import styles from "../styles/Admin.module.css"


// Page for debugging and fast clearing - used only by devs
const Admin = ({username}) => {

    const handleClick = async (action) => {
        // Sending an api request to clear the database
        await fetch('/api/' + action, {
            method: 'GET',
        })
    }
    return ( 
        <div>
        {username == "yaad321@gmail.com" && <div className = {styles.box}>
            <Head>
                <title>Phishing Admins</title>
                <meta name='viewport' content='"width=device-width, initial-scale=1'/>
            </Head>
            <button onClick={ () => handleClick("ClearApi")}>Clear Sent</button>
            <button onClick={ () => handleClick("DeleteGuideApi")}>Clear Guides</button>
            <button onClick={ () => handleClick("InsertGuideApi")}>Upload Guides</button>
        </div> }
        <div className = {styles.not}>
            <Head>
                <title>Phishing Service | Oops</title>
            </Head>
            <h1>Ooooops...</h1> 
            <h2>This page cannot be found.</h2>
            <p>Go back to the <Link href="/">Homepage</Link></p>
        </div>
        </div>
    );
}
 
export default Admin;

export const getServerSideProps = withPageAuthRequired({
    returnTo: '/api/auth/login',
    async getServerSideProps(context) {
        // Get the user to check if its an admin
        const session = getSession(context.req, context.res);
        const username = session.user.email;
        return {
            props: {username: username},
        }
    }
})