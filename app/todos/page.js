"use client";
import { useState, useEffect } from "react";
import axios from "../../utils/axios";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const TodosPage = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  const [editingTodoId, setEditingTodoId] = useState(null); // Track the ID of the todo being edited
  const [editTodoTitle, setEditTodoTitle] = useState("");

  useEffect(() => {
    /*const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      console.log("Decoded Token", decodedToken);
      setUsername(decodedToken.username); // Assuming the token contains the 'username' field
    }*/

    const fetchTodos = async () => {
      try {
        const response = await axios.get("/todos");
        console.log(response.data);
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/todos", { title: newTodo });
      console.log("Added New Todo:", response.data);
      setTodos([...todos, response.data]);
      setNewTodo("");
      //console.log(todos);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      console.log("Delete Todo");
      await axios.delete(`/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Start editing a todo
  const handleEditTodo = (id, currentTitle) => {
    setEditingTodoId(id); // Set the current todo as the one being edited
    setEditTodoTitle(currentTitle); // Set the current title in the input field
  };

  // Save the edited todo
  const handleSaveTodo = async (id) => {
    try {
      await axios.put(`/todos/${id}`, { title: editTodoTitle });
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, title: editTodoTitle } : todo
        )
      );
      setEditingTodoId(null); // Exit edit mode
      setEditTodoTitle(""); // Clear input field
    } catch (error) {
      console.error("Error saving todo:", error);
    }
  };

  // Cancel the editing process
  const handleCancelEdit = () => {
    setEditingTodoId(null); // Exit edit mode
    setEditTodoTitle(""); // Clear input field
  };

  //logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token from localStorage
    router.push("/"); // Redirect user to the home page
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl p-2">
        {username ? `${username}'s Todos` : "My Todos"}{" "}
        <button
          onClick={handleLogout}
          className="hover:bg-slate-200 text-lg p-2"
        >
          Logout
        </button>
      </h1>

      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          required
          className="p-2 pr-24 text-xl rounded-md bg-zinc-200 mr-2"
        />
        <button type="submit" className="hover:bg-slate-200 p-2">
          Add Todo
        </button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li
            className="text-xl flex justify-end mt-4 items-center"
            key={todo.id}
          >
            {/* Check if the current todo is in edit mode */}
            {editingTodoId === todo.id ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={editTodoTitle}
                  onChange={(e) => setEditTodoTitle(e.target.value)}
                  className="p-2 text-xl rounded-md bg-zinc-200 mr-2"
                />
                <button
                  onClick={() => handleSaveTodo(todo.id)}
                  className="hover:bg-slate-200 p-2"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="hover:bg-slate-200 p-2 ml-2"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                {todo.title}
                <button
                  onClick={() => handleEditTodo(todo.id, todo.title)}
                  className="hover:bg-slate-200 ml-24 p-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="hover:bg-slate-200 p-2 ml-4"
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodosPage;
