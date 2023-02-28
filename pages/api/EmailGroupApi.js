import clientPromise from "../../lib/mongodb"; 

// A handelr for the email groups of the user
export default async function handler(req, res) {
    const {username, group} = req.body;
    // Connecting to the mongo database
    const client = await clientPromise;
    const  db  = client.db("Phishing")

    if (req.method === 'POST') { 
        // Getting user input emails to create the group
        const user = await db.collection("input-Emails").findOne({username : {$eq : username}});
        // If user has input emails , add group to email groups database of the user
        (user && user.emails.length > 0) && await db.collection("Email-Groups").updateOne({username: {$eq: username}},
            {
                $set: {username: username},
                $addToSet: {groups: {group: group, emails: user.emails}}
            },
            {
                upsert: true
            }); 
        res.status(200).json({
            message: "Todo added successfully",
        });
    } else if (req.method == 'DELETE') {
        // Removing a group from the user email groups
        await db.collection("Email-Groups").updateOne({username: {$eq : username}},
            {
              $pull: {groups: {group}}
            });
        res.status(200).json({
            message: "Todo patched successfully",
        });
    } else if (req.method == 'PATCH') {
        // Switching input emails to the emails in the selected group

        // Getting group emails
        var groupEmails = await db.collection("Email-Groups").findOne({username : {$eq : username}}); 
        groupEmails = groupEmails.groups.find((item) => item.group == group);

        // Replacing input emails with group emails
        await db.collection("input-Emails").replaceOne({username: {$eq : username}},
            {
                username : username,
                emails: groupEmails.emails
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