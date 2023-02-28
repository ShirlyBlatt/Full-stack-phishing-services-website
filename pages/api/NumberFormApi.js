import clientPromise from "../../lib/mongodb"; 


// A handelr for the input numbers from the user
export default async function handler(req, res) {
    const {username, data, name} = req.body;
    // Connecting to the mongo database
    const client = await clientPromise;
    const  db  = client.db("Phishing")

    if (req.method === 'POST') { 
        // Update an exsisting input numbers for the current user or create 1 if dosent exsist
        await db.collection("input-Numbers").updateOne({username: {$eq : username}},
        {
            $set : {username : username},
            $addToSet : {numbers : {data, name}} 
        },
        {
            // Insert if dosent exsist
            upsert: true
        });
        res.status(200).json({
            message: "Todo added successfully",
        });
    } else if (req.method === 'PATCH') {
        // Removing a single number from the user input numbers
        await db.collection("input-Numbers").updateOne({username: {$eq : username}},
        {
            $pull : {numbers : {data, name}} 
        });
        res.status(200).json({
            message: "Todo patched successfully",
        });
    } else if (req.method === 'DELETE') {
        // Deleting the entire input numbers list for the current user 
        await db.collection("input-Numbers").deleteOne({username : {$eq : username}});
        res.status(200).json({
            message: "Todo deleted successfully",
        });
    }
} 

