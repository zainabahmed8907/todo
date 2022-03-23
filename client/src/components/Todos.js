import React, { useEffect, useState } from 'react'
import axios from "axios";
import TodoList from './TodoList';
const Todos = () => {
  const [todo, setTodo] = useState("");
  const [search, setSearch] = useState("")
  const [todos, setTodos] = useState([]);




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
  const searchTerm = (searchtext) => {
   if(searchtext=="")
   {
    const newterm=todos.filter((todo)=>{
      return todo.todo.toLowerCase().includes(searchtext.toLowerCase())
    })
    setSearch(newterm);
   }
   else{
     return setSearch(searchtext);
   }
  }

  const addTodos = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("http://localhost:5000/addtodo", todo);
      return data
    }
    catch (err) {
      console.log(err)
    }


  }


  return (
    <div className='todocard'>
      <div className='card todo-card input-field'>
        <h3>TodoList</h3>
        <div className='card-content input-field'>
          <form>
            <input
              type="text"
              placeholder='search..'
              name="search"
              onChange={e => setSearch(e.target.value)} />
            <input
              type="text"
              placeholder='todo'
              name="todo"
              onChange={e => setTodo(e.target.value)}
            />
            <button className='btn btn-waves waves-light mt-3' id="todobtn"
              onClick={e => addTodos(e)}
            >
              Add Todo
            </button>

          </form>
          <TodoList />

        </div>

      </div>
    </div>
  )
}

export default Todos