import clientPromise from "../../lib/mongodb"; 

// A function to handle a user clicking a sent link
export default async function handler(req, res) {
    const {data, name, id} = req.body;
    // Connecting to the mongo database
    const client = await clientPromise;
    const  db  = client.db("Phishing")
  
    const uniqueID = id + "__" + data;
    // If click isnt a duplicate, add it to the loggers databse, using the id in url argument
    await db.collection("loggers").updateOne({sentID: {$eq: id}},
        {
            $set: {sentID: id},
            $addToSet: {loggers: {data, name, uniqueID}},
        },
        {
            upsert: true
        }); 
    res.status(200).json({
        message: "Todo added successfully",
    });
}
 
