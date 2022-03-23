import React, { useEffect, useState } from 'react'
import axios from "axios";
import Todos from './Todos';
import { useParams } from 'react-router-dom';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [comp,setComp]=useState(false);
    const {id} = useParams();





    useEffect(() => {

        fetchTodos()
    }, []);
    console.log(todos)

    const fetchTodos = async () => {

        await axios.get("http://localhost:5000/todos")
            .then(response => response.data)
            .then(data => setTodos(data.todos))
            .catch((err) => console.log(err));
    }
  
    const handleDelete = async id => {
            await axios.delete(`http://localhost:5000/todos/${id}`);

            var newTodo = todos.filter((todo) => {
                return todo.id !== id;
            })

            setTodos(newTodo);

        

    }
    const compeleted=async(id,todos)=> {
        try {
             await axios.put(`http://localhost:5000/todos/${id}`, todos)
             setComp(true);

             
        }
        catch (err) {
            console.log(err)
        }
        

    }

    return (
        <div>

            <ul>

                {todos.map((Todo) => (
                    <li className='card todos'key={Todo._id} >
                        <label>
                            <input type="checkbox" onClick={compeleted}/>
                            <span className='status'>{comp?"yes":"no"}</span>
                        </label>
                        {Todo.todo}
                        <button className="btn btn-small trash waves-effect waves-light"
                            onClick={() => handleDelete(Todo._id)}
                            id="trash">
                            <i className='fa-solid fa-trash'></i>
                        </button>
                    </li>
                ))}

            </ul>

        </div>
    )
}

export default TodoList