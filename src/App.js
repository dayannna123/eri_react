import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addTask = () => {
    if (inputValue.trim() !== '') {
      setTasks([...tasks, inputValue]);
      setInputValue('');
    }
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="App">
      <div className="todo-container">
        <h1>Lista de Tareas</h1>
        <div className="input-container">
          <input 
            type="text" 
            value={inputValue} 
            onChange={handleInputChange} 
            placeholder="Nueva tarea" 
          />
          <button onClick={addTask}>Agregar</button>
        </div>
        <ul>
          {tasks.map((task, index) => (
            <li key={index} className="task-item">
              {task} 
              <button onClick={() => removeTask(index)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
