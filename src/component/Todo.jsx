import React, { useEffect, useState } from "react";
import axios from "axios";

export const Todo = () => {
  const [newTodo, setNewTodos] = useState("");
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1)
  const saveinfo = () => {
    fetch("http://localhost:8080/todos", {
      method: "POST",
      headers: {
          "content-type": "application/json"
      },
      body: JSON.stringify({
        text: newTodo,
        isCompleted: false,
      }),
    })
    .then((r) => r.json())
      .then((d) => {
          setTodos([...todos, d]);
        setNewTodos("");
      });

  };

  useEffect(() => {
    axios.get(`http://localhost:8080/todos?_page=${page}&_limit=5`)
    //   .then((r) => r.json())
      .then((d) => {

        setTodos(d.data);
      });
  }, [page]);

  return (
    <>
      <div>Todo</div>
      <div>
        <div>
          <input
            value={newTodo}
            onChange={({ target }) => setNewTodos(target.value)}
          />
          <button onClick={saveinfo}>Save</button>
        </div>

        {todos.map((todo,index) => (
          <div key={todo.id}>{todo.id} - {todo.text}</div>
        ))}
       
        <button onClick={() => setPage(page-1)}>{'<'}</button>
        <button onClick={() => setPage(page+1)}>{'>'}</button>
      </div>
    </>
  );
};
