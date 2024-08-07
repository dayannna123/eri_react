import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addTask = () => {
    if (inputValue.trim() !== '') {
      if (editIndex !== null) {
        const newTasks = tasks.slice();
        newTasks[editIndex] = inputValue;
        setTasks(newTasks);
        setEditIndex(null);
      } else {
        setTasks([...tasks, inputValue]);
      }
      setInputValue('');
    }
  };

  const editTask = (index) => {
    setInputValue(tasks[index]);
    setEditIndex(index);
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    if (index === editIndex) {
      setInputValue('');
      setEditIndex(null);
    }
  };

  return (
    <div className="todo-container">
      <h1>Lista de Tareas</h1>
      <div className="input-container">
        <input 
          type="text" 
          value={inputValue} 
          onChange={handleInputChange} 
          placeholder="Nueva tarea" 
        />
        <button onClick={addTask}>{editIndex !== null ? 'Guardar' : 'Agregar'}</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            {task} 
            <div className="buttons">
              <button onClick={() => editTask(index)}>Editar</button>
              <button onClick={() => removeTask(index)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Home() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/tasks');
  };

  return (
    <div className="home-container">
      <h1>Bienvenido</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Correo Electrónico:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<TaskList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
