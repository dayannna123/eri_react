import React, { useState } from 'react';
import './App.css';

function App() {
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
    </div>
  );
}

export default App;
