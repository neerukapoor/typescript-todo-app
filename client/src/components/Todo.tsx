import Card from '@mui/material/Card';
import { yellow } from '@mui/material/colors';
import {useState, useEffect} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Dialog, DialogTitle, DialogContent, Button, TextField } from '@mui/material';


type TodoItem = {
    _id: string,
    todoTitle: string,
    todoDescription: string
}

function Todo() {

    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [editTodoTitle, setEditTodoTitle] = useState('');
    const [editTodoDescription, setEditTodoDescription] = useState('');
    const [todoId, setTodoId] = useState('');


    useEffect(() => {
        fetch("http://localhost:3000/", {
            method:"GET",
            headers: {
                "Content-type": "application/json",
                "jwtToken": "Bearer " + localStorage.getItem("jwtToken")    
            }
        }).then((res)=>{
            return res.json()
        }).then((data) => {
            setTodos(data.todos)
        })
    },[])

    const openModal = (todo: TodoItem) => {
        setEditTodoTitle(todo.todoTitle);
        setEditTodoDescription(todo.todoDescription);
        setShowModal(true);
        setTodoId(todo._id)
    }

    const saveChanges = () => {
        console.log(todoId);
        console.log(editTodoTitle);
        fetch(`http://localhost:3000/${todoId}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: editTodoTitle,
                description: editTodoDescription
            })
        }).then((response) => {
            if(response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to update todo')
            }
        }).then((data) => {
            //code
            console.log(data); 
        })
        setShowModal(false);
    }

    return <> 
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"85vh"}}>
            <Card sx={{ minWidth: 275, padding:"5px" }}>
                {todos.map((todo) => (
                     <div
                     key={todo._id}
                     onClick={() => openModal(todo)}
                     style={{ margin: "20px", height: "30px", padding: "5px", background: "lightgrey", borderRadius: "2px" }}
                 >
                    {todo.todoTitle}
                    </div>
                ))}
            </Card>
        </div>

         {/* Modal */}
         <Dialog open={showModal} onClose={() => setShowModal(false)}>
            <DialogTitle>Todo Description</DialogTitle>

            <DialogTitle>Edit Todo</DialogTitle>
            <TextField 
                label="Title"
                value = {editTodoTitle}
                onChange={(e) => setEditTodoTitle(e.target.value)}/>

            <TextField 
                label="Description"
                value = {editTodoDescription}
                onChange={(e) => setEditTodoDescription(e.target.value)}/>
            <Button variant="contained" color="primary" onClick={saveChanges}>
                Save
            </Button>
        </Dialog>
    </>
}
 
export default Todo;