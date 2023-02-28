import clientPromise from "../../lib/mongodb"; 

export default async function handler(req, res) {
    const {username, title, message} = req.body;
    // Connecting to the mongo database
    const client = await clientPromise;
    const  db  = client.db("Phishing");
    
    // Connecting to twilio messaging service
    const twilio = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);


    // Getting the current input emails of the user
    const inputNumbers = await db.collection("input-Numbers").findOne({username : {$eq : username}});
    // Generating a psudo random number to use an id
    const generatedID = Date.now().toString();
    // Sending a text for each number in the input numbers list of the user
    inputNumbers && inputNumbers.numbers.forEach(async (number) => {
        // Each message will be the project url : www.haslishiya.com/project with 3 arguements, user id and name
        // These will be used to track if the recipient clicked the link
        const uniqueMessage = message + ' ' + process.env.AUTH0_BASE_URL +'/clicked?user=' + number.data + "&id=" + generatedID + "&name=" + number.name.replaceAll(' ', '*');
      
        await twilio.messages
            .create({
                from: 'whatsapp:+14155238886',
                body: uniqueMessage,
                to: 'whatsapp:+972' + number.data.slice(1)
            });
    });
    // If any texts were sent, add sent text to the databse
    (inputNumbers && inputNumbers.numbers.length > 0) && 
    await db.collection("sent-Texts").updateOne({username: {$eq: username}},
        {
            $set: {username: username},
            $addToSet: {texts: {
                title : title,
                message : message,
                type : "text-details",
                recievers : inputNumbers.numbers,
                createdAt: new Date(),
                id: generatedID
            }}},
        {
            upsert: true
        });

    await db.collection("loggers").insertOne({
        sentID: generatedID,
        loggers: []
    }); 

    res.status(200).json({
        message: "Todo added successfully",
    });
}
 

