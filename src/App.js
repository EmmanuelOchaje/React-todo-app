import { useState } from "react";
/* const initialItems = [
  {
    id: 0,
    description: "Wake up",
  },
  { id: 1, description: "Go for a walk" },
  {
    id: 2,
    description: "Run 50 Miles",
  },
]; */
export default function App() {
  const [todo, setTodo] = useState([]);

  function handleAdd(todos) {
    setTodo((todo) => [...todo, todos]);
  }

  function handleDelete(id) {
    // alert(id);
    // console.log(todo);
    setTodo((todo) => todo.filter((td) => td.id !== id));
  }

  //checkboox
  function handleToggle(id) {
    setTodo((todo) =>
      todo.map((td) => (td.id === id ? { ...td, checked: !td.checked } : td))
    );
  }

  return (
    <div className="App">
      <Header>React ToDo-App</Header>
      <Form addItems={handleAdd} />
      <div className="cont">
        <h4>List :</h4>
      </div>
      <List
        name="name"
        todo={todo}
        deleteTodo={handleDelete}
        key={todo.id}
        onToggle={handleToggle}
      />
    </div>
  );
}

function Header({ children }) {
  return <h2>{children}</h2>;
}

// Handle/manage form input
function Form({ todo, addItems }) {
  const [task, setTask] = useState("");
  /*  const newTask = { description, id: Date.now() }; */

  function handleSubmit(e) {
    e.preventDefault();
    if (!task) return;
    // if (task === " " || task === "   ") return;
    const newItem = { task, id: Date.now(), checked: false };
    addItems(newItem);
    console.log(newItem);

    setTask("");
  }

  return (
    <div className="quest">
      <form onSubmit={handleSubmit}>
        <h3>What are your plans for today?</h3>
        <input
          type="text"
          placeholder="write here.."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />{" "}
        <button className="btn-add">Add</button>
      </form>
    </div>
  );
}

// Fetch list
function List({ todo, deleteTodo, onToggle }) {
  return (
    <div>
      {todo.map((txt, i) => (
        <div className="descrp" key={i} id={txt.id}>
          <p className="p-cont">
            <span className="check">
              <input
                type="checkbox"
                value={todo.checked}
                onChange={() => onToggle(txt.id)}
              />
            </span>
            {"  "}
            <span
              className="text"
              style={txt.checked ? { textDecoration: "line-through" } : {}}
            >
              {txt.task}
            </span>
            <button onClick={() => deleteTodo(txt.id)}>X</button>
          </p>
        </div>
      ))}
    </div>
  );
}
