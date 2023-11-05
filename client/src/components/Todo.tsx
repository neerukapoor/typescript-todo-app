import Card from '@mui/material/Card';
import {useState, useEffect} from 'react';


type TodoItem = {
    _id: string,
    todoTitle: string,
    todoDescription: string
}

function Todo() {

    const [todos, setTodos] = useState<TodoItem[]>([]);

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
            console.log(data)
            console.log(data.todos[0]._id);
        })
    },[])

    return <> 
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"85vh"}}>
            <Card sx={{ minWidth: 275, padding:"5px" }}>
                {todos.map((todo) => (
                    <li key={todo._id}>{todo.todoTitle}</li>
                ))}
            </Card>
        </div>
    </>
}
 
export default Todo;