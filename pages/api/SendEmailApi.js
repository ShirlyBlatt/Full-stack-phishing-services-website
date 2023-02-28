import clientPromise from "../../lib/mongodb"; 

// A handelr for the sending emails for the user
export default async function handler(req, res) {
    const {username, from, title, subject, body, template, templateID} = req.body;

    // This function will set the data and template if needed for the email
    const buildData = (email) => {
        var data = {
            to : email.data,
            from: {
                email: process.env.EMAIL,
                name: from
            },
            subject: subject,
        };

        // generating a unique link 
        const link = "http://haslishiya.com/clicked?user=" + email.data + "&id=" + generatedID + "&name=" + email.name.replaceAll(' ', '*');

        // Setting the template
        if (template != "" && templateID == "2" ){
            data.templateId = template;
            data.dynamic_template_data = {
                header: subject,
                subject: subject,
                body: body,
                refre: link
            };
        } else if(template != ""){
            data.templateId = template;
            data.dynamic_template_data = {
                refre: link
            };
        } else {
            data.text = body + " " + link
        }
        return data;
    }


    // Connecting to the mongo database
    const client = await clientPromise; 
    const  db  = client.db("Phishing");

    // Getting the current input emails of the user
    const inputEmails = await db.collection("input-Emails").findOne({username : {$eq : username}});
    // Generating a psudo random number to use as an id
    const generatedID = Date.now().toString();
    
    // Connecting to Sendgrid
    const sendGrid = require('@sendgrid/mail');
    sendGrid.setApiKey(process.env.SENDGRID_KEY);


    // Sending an email for each email in the input emails list of the user
    inputEmails && inputEmails.emails.forEach(async (email) => {
        // Each message will be the project url : 161.35.196.65/project with 3 arguements, user id and name
        // These will be used to track if the recipient clicked the link
        try {
            // Building data for the email
            const data = buildData(email);
            // Sending an email
            await sendGrid.send(data).then(() => {}, console.error);
        } catch(e) { 
            console.log("Faild sending Email:", e);
        }
    });
    
    // If any emails were sent, add sent mail to the databse
    (inputEmails && inputEmails.emails.length > 0) &&
    await db.collection("sent-Mails").updateOne({username: {$eq: username}},
        {
            $set: {username: username}, 
            $addToSet: {emails: {
                title : title,
                subject : subject,
                message : body,
                type : "email-details",
                recievers : inputEmails.emails,
                createdAt: new Date(),
                id: generatedID
            }}
        },
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
