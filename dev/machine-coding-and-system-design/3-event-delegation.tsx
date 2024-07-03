import { todo } from "node:test";
import React, { useRef, useState } from "react";

const EventNotDelegatedTodoList = () => {
  const [todos, setTodos] = useState([
    {
      todo: "Watch movie",
      id: `uuid-1`,
    },
    {
      todo: "Watch Series",
      id: `uuid-2`,
    },
  ]);

  const ref = useRef<HTMLInputElement>(null);

  const deleteTodo = (todoId: string) => {
    const filteredTodos = todos.filter((item) => item.id !== todoId);
    setTodos(filteredTodos);
  };

  return (
    <div className="flex flex-col gap-y-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const newTodo = ref.current?.value;
          if (!newTodo) return;
          setTodos([
            ...todos,
            {
              todo: newTodo,
              id: `uuid-${todos.length}`,
            },
          ]);

          ref.current.value = "";
        }}
      >
        <input type="text" ref={ref} className="text-black" />
        <button type="submit">Submit</button>
      </form>

      <ul className="flex flex-col gap-y-3">
        {todos.map(({ todo, id }) => (
          <li className=" flex gap-2  rounded-sm" key={id}>
            <span className="bg-gray-800 p-2">{todo}</span>
            <button onClick={() => deleteTodo(id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const EventDelegatedTodoList = () => {
  const [todos, setTodos] = useState([
    {
      todo: "Watch movie",
      id: `uuid-1`,
    },
    {
      todo: "Watch Series",
      id: `uuid-2`,
    },
  ]);

  const ref = useRef<HTMLInputElement>(null);

  const deleteTodo = (todoId: string) => {
    const filteredTodos = todos.filter((item) => item.id !== todoId);
    setTodos(filteredTodos);
  };

  return (
    <div className="flex flex-col gap-y-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const newTodo = ref.current?.value;
          if (!newTodo) return;
          setTodos([
            ...todos,
            {
              todo: newTodo,
              id: `uuid-${todos.length}`,
            },
          ]);

          ref.current.value = "";
        }}
      >
        <input type="text" ref={ref} className="text-black" />
        <button type="submit">Submit</button>
      </form>

      <ul
        className="flex flex-col gap-y-3"
        onClick={(e) => {
          const target = e.target as HTMLButtonElement;

          // This is where the magic happens
          if (target.getAttribute("name") === "delete-todo") {
            const todoId = target.dataset.todoId;
            if (!todoId) return;
            deleteTodo(todoId!);
          }
        }}
      >
        {todos.map(({ todo, id }) => (
          <li className=" flex gap-2  rounded-sm" key={id}>
            <span className="bg-gray-800 p-2">{todo}</span>
            <button name="delete-todo" data-todo-id={id}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export { EventNotDelegatedTodoList, EventDelegatedTodoList };
