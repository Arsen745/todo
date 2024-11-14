import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Problems.css'

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [problemText, setProblemText] = useState('');
  const [problemLevel, setProblemLevel] = useState('Легкий');
  const [firstName, setFirstName] = useState('Saadat');

  // Загрузка всех сообщений из MockAPI
  useEffect(() => {
    axios.get('https://673660e1aafa2ef222305e08.mockapi.io/problems')
      .then(response => setProblems(response.data))
      .catch(error => console.error('Error fetching problems:', error));
  }, []);

  // Отправка нового сообщения
  const handleSendProblem = () => {
    const newProblem = {
      name: problemText,
      level: problemLevel,
      firstName,
    };

    axios.post('https://673660e1aafa2ef222305e08.mockapi.io/problems', newProblem)
      .then(response => {
        setProblems([...problems, response.data]);
        setProblemText('');
        setProblemLevel('Легкий');
        setFirstName('Saadat');
      })
      .catch(error => console.error('Error adding problem:', error));
  };

  return (
    <div className="container">
      <div className="form-container">
        <textarea
          placeholder="Напишите проблему"
          value={problemText}
          onChange={(e) => setProblemText(e.target.value)}
        />
        <select
          value={problemLevel}
          onChange={(e) => setProblemLevel(e.target.value)}
        >
          <option value="Легкий">Легкий</option>
          <option value="Средний">Средний</option>
          <option value="Сложный">Сложный</option>
        </select>
        <select
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        >
          <option value="Saadat">Saadat</option>
          <option value="Arsen">Arsen</option>
        </select>
        <button onClick={handleSendProblem}>Отправить</button>
      </div>

      <div className="messages-container">
        {problems.map((problem) => (
          <div key={problem.id} className={`message-card ${problem.firstName.toLowerCase()}`}>
            <h3>{problem.firstName}</h3>
            <p>Проблема: {problem.name}</p>
            <p className={`level ${problem.level.toLowerCase()}`}>Сложность: {problem.level}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Problems;
