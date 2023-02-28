import clientPromise from "../../lib/mongodb"; 

export default async function handler(req, res) {
    const guideID = req.body;

    const client = await clientPromise;
    const db = client.db("Phishing");
    
    if (req.method === 'POST') { 
        const guide = await db.collection("Guides").findOne({name : {$eq : guideID}});
        res.status(200).json({
            guide: guide,
        });
    } else if (req.method === 'PATCH') {
        const guide = await db.collection("Guides").findOne({number : {$eq : guideID}});
        res.status(200).json({
            guide: guide,
        });
    }
}