import express from "express";
import Thread from "../models/Thread.js"
import getAiResponse from "../utils/openai.js";

const router = express.Router();

//test
router.post("/test", async(req,res) => {
    try{
        const thread = new Thread({
            threadId: "abc",
            title: "How much should I score in each subject to pas CA final"
        })

        const response= await thread.save();
        res.send(response);

    } catch(err){
        console.log(err);
        res.status(500).json({error: "Failed to save database"});
    }
})

//Get all threads
router.get("/thread", async(req, res) => {
    try {
        const threads = await Thread.find({}).sort({updatedaT: -1});
        //This will sort the chat in descending order
        res.json(threads);
    } catch(err) {
        console.log(err);
        res.status(500).json({error: "Failed to fetch threads"});
    }
})

router.get("/thread/:threadId", async(req,res) => {
    const { threadId } = req.params;

    try {
        const thread = await Thread.findOne({threadId});

        if(!thread){
            res.status(404).json({error: "Thread not found"});
        }

        res.json(thread.messages);
    } catch(err){
        console.log(err);
        res.status(500).json({error: "Failed to fetch chat"});
    }

})

router.delete("/thread/:threadId", async(req,res) => {
    const { threadId } = req.params;

    try {
        const deleteThread = await Thread.findOneAndDelete({threadId});

        if(!deleteThread){
            res.status(404).json({error: "Thread not found"});
        }

        res.status(200).json({success: "Thread deleted successfully"});
    } catch(err){
        console.log(err);
        res.status(500).json({error: "Failed to fetch chat"});
    }

})

router.post("/chat", async(req,res) => {
    const {threadId, userInput} = req.body;

    if(!threadId || !userInput){
        res.status(400).json({error: "missing require fields"})
    }
    try{
        let thread = await Thread.findOne({threadId});

        if(!thread){
            //create a new thread in db
            thread = new Thread({
                threadId,
                title: userInput,
                messages:[{role: "user", content: userInput}]
            })
        } else {
            thread.messages.push({role: "user", content: userInput})
        }

        const assistantReply = await getAiResponse(userInput);

        thread.messages.push({role: "assistent", content: assistantReply});
        thread.updatedAt = new Date();

        await thread.save();
        res.json({reply: assistantReply});

    } catch(err){
        console.log(err);
        res.status(500).json({error: "Failed to fetch chat"});
    }
})

export default router;