"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = require("../db/auth");
const zod_1 = require("zod");
const authMiddleware_1 = require("../middleware/authMiddleware");
let inputProps = zod_1.z.object({
    title: zod_1.z.string().min(1),
    description: zod_1.z.string()
});
router.get("/me", authMiddleware_1.authenticateJwtToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usernameFromHeader = req.headers["user"];
    const username = yield auth_1.User.findOne({ username: usernameFromHeader });
    if (username) {
        return res.json({ username });
    }
    res.json({ message: "Not logged in" });
}));
// authenticateJwtToken,
router.get("/", authMiddleware_1.authenticateJwtToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userFromHeaders = req.headers["user"];
        const existingUser = yield auth_1.User.findOne({ username: userFromHeaders });
        if (!existingUser) {
            console.log(`User with name "${userFromHeaders}" not found.`);
            return res.status(404).json({ error: "User does not exist" });
        }
        const todos = existingUser.todo;
        res.status(200).json({ todos: todos });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching todos from the database" });
    }
}));
router.post("/", authMiddleware_1.authenticateJwtToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userFromHeaders = req.headers["user"];
        const existingUser = yield auth_1.User.findOne({ username: userFromHeaders });
        console.log(existingUser);
        if (!existingUser) {
            console.log(`User with name "${userFromHeaders}" not found.`);
            return res.status(404).json({ error: "User does not exist" });
        }
        const parsedInput = inputProps.safeParse(req.body);
        if (!parsedInput.success) {
            return res.status(411).json({ msg: parsedInput.error });
        }
        const inputs = req.body;
        const newTodo = {
            todoTitle: inputs.title,
            todoDescription: inputs.description
        };
        existingUser.todo.push(newTodo);
        const updatedUser = yield existingUser.save();
        res.json({ User: updatedUser });
    }
    catch (error) {
        res.status(500).json({ error: 'Error adding todo to the User: ' + error });
    }
}));
router.delete("/:todoId", authMiddleware_1.authenticateJwtToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userFromHeaders = req.headers["user"];
        const existingUser = yield auth_1.User.findOne({ username: userFromHeaders });
        if (!existingUser) {
            console.log(`User with name "${userFromHeaders}" not found.`);
            return res.status(404).json({ error: "User does not exist" });
        }
        const todoId = req.params.todoId;
        if (!todoId || todoId.trimEnd() === "") {
            res.status(400).json({ error: "Todo Id should Not be empty" });
        }
        const todoIndex = existingUser.todo.findIndex(todoItem => todoItem._id.toString() === todoId);
        if (todoIndex === -1) {
            return res.status(404).json({ message: 'Todo item not found' });
        }
        existingUser.todo.splice(todoIndex, 1);
        yield existingUser.save();
        res.status(200).json({ message: "Todo deleted successfully", existingUser });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting the todo" });
    }
}));
router.put("/:todoId", authMiddleware_1.authenticateJwtToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("skdhfs");
        const userFromHeaders = req.headers["user"];
        console.log("user from header");
        console.log(userFromHeaders);
        const existingUser = yield auth_1.User.findOne({ username: userFromHeaders });
        if (!existingUser) {
            console.log(`User with name "${userFromHeaders}" not found.`);
            return res.status(404).json({ error: "User does not exist" });
        }
        const todoId = req.params.todoId;
        console.log("yaha" + todoId);
        if (!todoId || todoId.trimEnd() === "") {
            res.status(400).json({ error: "Todo Id should Not be empty" });
        }
        let parsedInput = inputProps.safeParse(req.body);
        if (!parsedInput.success) {
            return res.status(411).json({ msg: parsedInput.error });
        }
        const inputs = req.body;
        if (!todoId) {
            return res.status(404).json({ error: "Todo Id not provided" });
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
        const updatedUser = yield existingUser.save();
        res.status(200).json({ message: "Todo updated successfully", todoToUpdate });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while updating the todo" });
    }
}));
exports.default = router;
