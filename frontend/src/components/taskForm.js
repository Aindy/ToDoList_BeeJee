import React, { useState } from 'react';
import { createTask } from '../api';
import { useNavigate } from 'react-router-dom';

const TaskForm = () => {
  const [task, setTask] = useState({ username: '', email: '', text: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask(task);
      navigate('/');
    } catch (error) {
      console.error('Error creating task', error);
    }
  };

  return (
    <div className="task-form-container">
      <h2>Создай задачу</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          name="username"
          value={task.username}
          onChange={handleChange}
          placeholder="Имя"
          required
        />
        <input
          type="email"
          name="email"
          value={task.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <textarea
          name="text"
          value={task.text}
          onChange={handleChange}
          placeholder="Описание"
          required
        />
        <button type="submit">Создать</button>
      </form>
    </div>
  );
};

export default TaskForm;
