import clientPromise from "../../lib/mongodb"; 


export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("Phishing");
    
    await db.collection("Guides").insertOne({
        Signup: {
            name : "Signup",
            title : "Signup",
            guide : "If this is your first time in the site, you should start by creating a user",
            img : ["signupGuide.jpeg"],
            number: 1,
            next: "Login",
            back: "Statistics",
            amount : 1
        },
        Login: {
            name : "Login",
            title : "Login",
            guide : "Choose a username and password",
            img: ["loginGuide.jpeg"],
            number: 2,
            next: "Verify",
            back: "Signup",
            amount : 1
        },
        Verify: {
            name : "Verify",
            title : "Verify",
            guide : "One you have successfully registered, a verification link will be sent to the email you signed up with." + 
                    "Sending emails / texts requires you to verify your account",
            img : ["verifyGuide.jpeg"],
            number: 3,
            next: "Insert",
            back: "Login",
            amount: 1
        },
        Insert: {
            name : "Insert",
            title : "Insert Email / Number",
            guide : "After adding a few recipients, this is how your insert emails / numbers overview will look like",
            img : ["insertNumberGuide.jpeg", "insert2Guide.jpeg"], 
            number: 4,
            next: "Delete",
            back: "Verify",
            amount : 3
        },
        Delete: {
            name : "Delete",
            title : "Deleting Email / Number",
            guide : "You can easily remove recipients by clicking the delete button under each contact. " +
                    "Additonally u can clear the enitre list by clicking the clear emails / numbers button",
            img : ["deleteGuide.jpeg"],
            number: 5,
            next: "AddGroup",
            back: "Insert",
            amount : 1
        },
        AddGroup: {
            name : "AddGroup",
            title : "Adding a Group",
            guide : "You can also create groups, the button create group captures all contacts on the screen into the group with your chosen name. " +
                    "Groups can be created for both emails and numbers individually",
            img : ["groupGuide.png"],
            number: 6,
            next: "Select",
            back: "Delete",
            amount : 1
        },
        Select: {
            name : "Select",
            title : "Selecting a Group",
            guide : "By clicking the group, your emails / numbers recipients list will be switched to the list captured in the group and the next email / text will be sent to this group",
            img : [],
            number: 7,
            next: "Templates",
            back: "AddGroup",
            amount : 0
        },
        Templates: {
            name : "Templates",
            title : "Templates",
            guide : "You can send a text / email using a default template or choose one of our premade templates. " +
                    "In some templates it is possible to customize the message",
            img : ["templatesGuide.jpeg","texttemplate1.jpeg","texttemplate2.jpeg"],
            number: 8,
            next: "Sending",
            back: "Select",
            amount : 1
        },
        Sending: {
            name : "Sending",
            title : "Sending Text",
            guide : "In order to send a Whatsaspp massege your resipients must first send a message to +14155238886 containing the phrase /'join shoe-dull/'",
            img : ["sendingGuide.jpeg"],
            number: 9,
            next: "Sent",
            back: "Templates",
            amount : 1
        },
        Sent: {
            name : "Sent",
            title : "Sent Emails / Texts",
            guide : "Your sent emails / texts will appear in your dashboard, inside the home page",
            img : ["sentemailsGuide.png"],
            number: 10,
            next: "Details",
            back: "Sending",
            amount : 1
        },
        Details: {
            name : "Details",
            title : "Mail / Text Details",
            guide : "In each sent email / text details page, accessible from the dashboard / home, you can view the date in which the message was sent, the contents of the meesage, its recipients and the people who followed on the link sent",
            img : ["detailsGuide.png"],
            number: 11,
            next: "Statistics",
            back: "Sent",
            amount :1
        },
        Statistics: {
            name : "Statistics",
            title : "Statistics",
            guide : "You can also see the statistics of each email / text that was sent",
            img : ["statisticsGuide.png", "statistics2Guide.png"],
            number: 12,
            next: "Signup",
            back: "Details",
            amount : 2 
        },
    });
    res.status(200).json('DONE');
}