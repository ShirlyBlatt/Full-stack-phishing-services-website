import clientPromise from "../../lib/mongodb"; 

// A handelr for the number groups of the user
export default async function handler(req, res) {
    const {username, group} = req.body;
    // Connecting to the mongo database
    const client = await clientPromise;
    const  db  = client.db("Phishing")

    if (req.method === 'POST') { 
        // Getting user input numbers to create the group
        const user = await db.collection("input-Numbers").findOne({username : {$eq : username}});
        // If user has input numbers , add group to number groups database of the user
        (user && user.numbers.length > 0) && await db.collection("Number-Groups").updateOne({username: {$eq: username}},
            {
                $set: {username: username},
                $addToSet: {groups: {group: group, numbers: user.numbers}}
            },
            {
                upsert: true
            }); 
        res.status(200).json({
            message: "Todo added successfully",
        });
    } else if (req.method == 'DELETE') {
        // Removing a group from the user number groups
        await db.collection("Number-Groups").updateOne({username: {$eq : username}},
            {
                $pull: {groups: {group}}
            });
        res.status(200).json({
            message: "Todo patched successfully",
        });
    } else if (req.method == 'PATCH') {
        // Switching input numbers to the numberss in the selected group

        // Getting group numbers
        var groupNumbers = await db.collection("Number-Groups").findOne({username : {$eq : username}}); 
        groupNumbers = groupNumbers.groups.find((item) => item.group == group);

        // Replacing input numberss with group numbers
        await db.collection("input-Numbers").replaceOne({username: {$eq : username}},
            {
                username : username,
                numbers: groupNumbers.numbers
            },
            {
            // Create a group if one dosent exsist
                upsert : true
            });
        res.status(200).json({
            message: "Todo added successfully",
        });
    }
}