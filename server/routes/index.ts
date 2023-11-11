import express from 'express';
const router = express.Router();
import {User} from '../db/auth';
import {z} from 'zod';
import {authenticateJwtToken} from "../middleware/authMiddleware"

interface CreateTodoInput {
    title: string;
    description: string;
}

let inputProps = z.object({
    title: z.string().min(1),
    description: z.string()
})

router.get("/me", authenticateJwtToken, async(req,res) => {
    const usernameFromHeader = req.headers["user"];
    const username = await User.findOne({username: usernameFromHeader});
    if(username) {  
        return res.json({username})
    }
    res.json({message: "Not logged in"})
})

// authenticateJwtToken,
router.get("/", authenticateJwtToken, async (req,res) => {
    try {
        const userFromHeaders = req.headers["user"];
        const existingUser = await User.findOne({ username: userFromHeaders });
        if (!existingUser) {
            console.log(`User with name "${userFromHeaders}" not found.`);
            return res.status(404).json({error: "User does not exist"});
        }

        const todos = existingUser.todo;
        res.status(200).json({todos: todos});
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching todos from the database" });
    }
})

router.post("/", authenticateJwtToken, async (req,res) => {
    try {
        const userFromHeaders = req.headers["user"];
        const existingUser = await User.findOne({ username: userFromHeaders });
        console.log(existingUser)
        if (!existingUser) {
            console.log(`User with name "${userFromHeaders}" not found.`);
            return res.status(404).json({error: "User does not exist"});
        }

        const parsedInput = inputProps.safeParse(req.body);
        if(!parsedInput.success) {
            return res.status(411).json({msg:parsedInput.error});
        }

        const inputs: CreateTodoInput = req.body; 

        const newTodo = {
            todoTitle: inputs.title,
            todoDescription: inputs.description
        }

        existingUser.todo.push(newTodo);
        const updatedUser = await existingUser.save();
        res.json({User:updatedUser})
    }
    catch (error) {
        res.status(500).json({error:'Error adding todo to the User: '+error})
    }
})

router.delete("/:todoId", authenticateJwtToken, async (req,res) => {
    try {
        const userFromHeaders = req.headers["user"];
        const existingUser = await User.findOne({ username: userFromHeaders });

        if (!existingUser) {
            console.log(`User with name "${userFromHeaders}" not found.`);
            return res.status(404).json({error: "User does not exist"});
        }

        const todoId = req.params.todoId;
        if(!todoId || todoId.trimEnd() === "") {
            res.status(400).json({error: "Todo Id should Not be empty"});
        }  

        const todoIndex = existingUser.todo.findIndex(todoItem => todoItem._id.toString() === todoId);
        
        if (todoIndex === -1) {
            return res.status(404).json({ message: 'Todo item not found' });
        }
    
        existingUser.todo.splice(todoIndex, 1);
    
        await existingUser.save();
        res.status(200).json({ message: "Todo deleted successfully", existingUser });
    } catch(error) {
        console.error(error);
        res.status(500).json({error: "An error occurred while deleting the todo"})
    }
})

router.put("/:todoId", authenticateJwtToken, async (req, res) => {
    try {
        console.log("skdhfs");
        const userFromHeaders = req.headers["user"];
        console.log("user from header")
        console.log(userFromHeaders)
        const existingUser = await User.findOne({ username: userFromHeaders });

        if (!existingUser) {
            console.log(`User with name "${userFromHeaders}" not found.`);
            return res.status(404).json({error: "User does not exist"});
        }

        const todoId = req.params.todoId;
        console.log("yaha" + todoId)
        if(!todoId || todoId.trimEnd() === "") {
            res.status(400).json({error: "Todo Id should Not be empty"});
        }

        let parsedInput = inputProps.safeParse(req.body);
        if(!parsedInput.success) 
        {
            return res.status(411).json({msg:parsedInput.error})
        }

        const inputs: CreateTodoInput = req.body; 

        if(!todoId) {
            return res.status(404).json({error: "Todo Id not provided"});
        }

        const todoToUpdate = existingUser.todo.id(todoId);

        if (!todoToUpdate) {
            return res.status(404).json({ error: "Todo not found" });
        }

        // Update the todo properties based on the input
        if (inputs.title) {
            todoToUpdate.todoTitle = inputs.title;
        }
        if (inputs.description) {
            todoToUpdate.todoDescription = inputs.description;
        }

        // Save the updated user
        const updatedUser = await existingUser.save();

        res.status(200).json({ message: "Todo updated successfully", todoToUpdate });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while updating the todo" });
    }
})

export default router;