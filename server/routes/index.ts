import express from 'express';
const router = express.Router();
import {Todo} from '../db/index'
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
    const username = await User.findOne({usernameFromHeader});
    console.log(username);
    if(username) {
        return res.json({username})
    }
    res.json({message: "Not logged in"})
})

// authenticateJwtToken,
router.get("/", async (req,res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json({todos: todos});
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching todos from the database" });
    }
})

router.post("/", authenticateJwtToken, async (req,res) => {

    const parsedInput = inputProps.safeParse(req.body);
    if(!parsedInput.success) {
        return res.status(411).json({msg:parsedInput.error});
    }

    const inputs: CreateTodoInput = req.body; 

    const todo = await new Todo({
        todoTitle: inputs.title,
        todoDescription: inputs.description
    })
    todo.save()
    .then((savedTodo) => {
        console.log(savedTodo);
        res.status(200).json({todo: todo})
    })
    .catch(error => {
        res.status(500).json({ error: "An error occurred while saving the todo" });
    });
})

router.delete("/:todoId", authenticateJwtToken, async (req,res) => {
    try {
        const todoId = req.params.todoId;
        if(!todoId || todoId.trimEnd() === "") {
            res.status(400).json({error: "Todo Id should Not be empty"});
        }  
        const deletedTodo = await Todo.findByIdAndDelete(todoId);

        console.log(deletedTodo);
        if(!deletedTodo) {
            return res.status(404).json({error: "Todo not found"});
        }
        res.status(200).json({ message: "Todo deleted successfully", deletedTodo });
    } catch(error) {
        console.error(error);
        res.status(500).json({error: "An error occurred while deleting the todo"})
    }
})

router.put("/:todoId", authenticateJwtToken, async (req, res) => {
    try {
        const todoId = req.params.todoId;

        let parsedInput = inputProps.safeParse(req.body);
        if(!parsedInput.success) 
        {
            return res.status(411).json({msg:parsedInput.error})
        }
        const todoTitle = req.body.title;
        const todoDescription = req.body.description;

        if(!todoId) {
            return res.status(404).json({error: "Todo Id not provided"});
        }

        const existingTodo = await Todo.findById(todoId);

        if(!existingTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }

        if (todoTitle) {
            existingTodo.todoTitle = todoTitle;
        }

        if (todoDescription) {
            existingTodo.todoDescription = todoDescription;
        }

        const updatedTodo = await existingTodo.save();
        res.status(200).json({ message: "Todo updated successfully", updatedTodo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while updating the todo" });
    }
})

export default router;