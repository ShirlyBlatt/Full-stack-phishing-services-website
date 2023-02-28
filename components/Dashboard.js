import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";

import styles from '../styles/Dashboard.module.css'

// The users dashboard
const Dashboard = ({sentEmails, sentTexts}) => {
    const {user} = useUser();
    return ( 
        <div className={styles.main}>
            <h1>{user && user.nickname + "'s"} Dashboard</h1>
            {user && user.email == "yaad321@gmail.com" && <Link href="/admin">Admin</Link>}

            <div className={styles.box}>
                {/* Mapping the mails sent, creating a link to each page
                    Also sending the type and id to the page to pull info and set css
                */}
                {sentEmails && sentEmails.emails.map((sentEmail) => (
                    <Link href = {'/emailDetails?type=Mail&id='+sentEmail.id} className= {styles.preview} key = {sentEmail.id}>
                        <h1>{sentEmail.title}</h1>
                        <p>Sent with: Email</p>
                    </Link> 
                ))}
                {/* Mapping the texts sent, creating a link to each page
                    Also sending the type and id to the page to pull info and set css
                */}
                {sentTexts && sentTexts.texts.map((sentText) => (
                <Link href = {'/textDetails?type=Text&id='+sentText.id} className= {styles.preview} key = {sentText.id}>
                    <h2>{sentText.title}</h2>
                    <p>Sent with: Text</p>
                </Link> 
                ))} 
            </div>
        </div>
    );
}
 
export default Dashboard;