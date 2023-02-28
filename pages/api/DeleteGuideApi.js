import clientPromise from "../../lib/mongodb"; 


export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("Phishing");
    
    await db.collection("Guides").drop({});
    
    res.status(200).json('DONE');
}