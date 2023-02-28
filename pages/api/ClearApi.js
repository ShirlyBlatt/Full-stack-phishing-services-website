import clientPromise from "../../lib/mongodb"; 

// clearing the database, for testing purposes
export default async function handler(req, res) {
    // Connecting to the mongo database
    const client = await clientPromise;
    const db = client.db("Phishing");
    // Clearing
    db.collection("sent-Mails").drop({});
    db.collection("sent-Texts").drop({});
    db.collection("loggers").drop({});
    
    res.status(200).json('DONE');
}