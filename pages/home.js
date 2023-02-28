import Head from 'next/head'
import Dashboard from '../components/Dashboard';
import clientPromise from '../lib/mongodb';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';

import styles from '../styles/Home.module.css'


// The Home / Dashboard page, only displayed for registered users
export default function Home({sentEmails, sentTexts}) { 

  return (
    <div className = {styles.home}>
      <Head>
        <title>Phishing Service | Home</title>
		<meta name='viewport' content='"width=device-width, initial-scale=1'/>
      </Head>
      {<Dashboard sentEmails = {sentEmails} sentTexts = {sentTexts}/>}
    </div>
  )
}


// Getting server side elements, the sent emails and sent texts
// Allowing only registered users to the page
export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps(context) {

    // Checking if the user is registered
    const session = getSession(context.req, context.res);
    const username = session.user.email
      	try {
          	// Connecting to the mongo database
          	const client = await clientPromise;
          	const db = client.db("Phishing");

          	// Fetching sent emails and sent texts of the user
          	const sentEmails = await db.collection("sent-Mails").findOne({username : {$eq : username}});
          	const sentTexts = await db.collection("sent-Texts").findOne({username : {$eq : username}});

        	return {
              	props: { sentEmails: JSON.parse(JSON.stringify(sentEmails)),  sentTexts: JSON.parse(JSON.stringify(sentTexts)) },
          	};
      	} catch (e) {
    		console.error(e);
      	}
    }
})
 