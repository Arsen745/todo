import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [name, setName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState('не выполнено'); // Начальный статус

  // Функция для отправки запроса на добавление задачи
  const handleAddTask = async () => {
    if (taskText && name && deadline && status) {
      const newTask = {
        tasks: taskText,
        name,
        srok: deadline,
        status,
      };

      try {
        const response = await fetch('https://673660e1aafa2ef222305e08.mockapi.io/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTask),
        });

        const result = await response.json();
        
        // Обновляем локальный массив задач
        setTasks([...tasks, result]);

        // Очистка полей после отправки
        setTaskText('');
        setName('');
        setDeadline('');
        setStatus('не выполнено');
      } catch (error) {
        console.error("Ошибка при добавлении задачи:", error);
      }
    }
  };

  // Функция для обновления статуса задачи
  const handleUpdateStatus = async (taskId, newStatus) => {
    try {
      const response = await fetch(`https://673660e1aafa2ef222305e08.mockapi.io/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const updatedTask = await response.json();
      
      // Обновляем состояние с новой версией задачи
      setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)));
    } catch (error) {
      console.error("Ошибка при обновлении статуса:", error);
    }
  };

  useEffect(() => {
    // Загружаем все задачи при инициализации компонента
    const fetchTasks = async () => {
      const response = await fetch('https://673660e1aafa2ef222305e08.mockapi.io/tasks');
      const data = await response.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  return (
    <div className="container">
      <div className="add-new">
        <textarea 
          placeholder="Напишите задачу" 
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Имя" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Дедлайн" 
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="не выполнено">Не выполнено</option>
          <option value="в процессе">В процессе</option>
          <option value="выполнено">Выполнено</option>
        </select>
        <button onClick={handleAddTask}>Добавить задачу</button>
      </div>

      <div className="tasks">
        <h2>Список задач</h2>
        <div className="cards">
          {tasks.map((task) => (
            <div className="card" key={task.id}>
              <h3>{task.name}</h3>
              <p>{task.tasks}</p>
              <span>Дедлайн: {task.srok}</span>
              <h1><span>Статус: </span>{task.status}</h1>
              
              {/* Кнопки для обновления статуса */}
              <div className="status-buttons">
                {task.status !== 'выполнено' && (
                  <button onClick={() => handleUpdateStatus(task.id, 'в процессе')}>В процессе</button>
                )}
                {task.status !== 'не выполнено' && (
                  <button onClick={() => handleUpdateStatus(task.id, 'не выполнено')}>Не выполнено</button>
                )}
                {task.status !== 'выполнено' && (
                  <button onClick={() => handleUpdateStatus(task.id, 'выполнено')}>Выполнено</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Навигационные кнопки */}
      <div className="navigation">
        <Link to="/problems">
          <button>Перейти к проблемам</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
