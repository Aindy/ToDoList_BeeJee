// TaskItem.js
import React, { useState } from 'react';
import { editTask } from '../api';

const TaskItem = ({ task }) => {
  const [completed, setCompleted] = useState(task.completed);
  const [text, setText] = useState(task.text);
  const token = localStorage.getItem('authToken');

  const handleTextChange = async (e) => {
    const updatedText = e.target.value;
    setText(updatedText);
    if (token) {
      try {
        const updatedTask = { text: updatedText, completed };
        console.log("Sending task data:", updatedTask);
        await editTask(task.id, updatedTask, token); 
      } catch (error) {
        console.error('Error updating task text', error);
      }
    }
  };
  
  const handleStatusChange = async () => {
    const updatedTask = { text, completed: !completed };
    console.log("Sending task data:", updatedTask);
    try {
      await editTask(task.id, updatedTask, token);
      setCompleted(!completed);
    } catch (error) {
      console.error('Error updating task status', error);
    }
  };
  
  

  return (
    <tr>
      <td>{task.username}</td>
      <td>{task.email}</td>
      <td>
        {token ? (
          <input
            type="text"
            value={text}
            onChange={handleTextChange}
          />
        ) : (
          <span>{text}</span>
        )}
      </td>
      <td>
        {token ? (
          <input
            type="checkbox"
            checked={completed}
            onChange={handleStatusChange}
          />
        ) : (
          <span>{completed ? 'Завершена' : 'В ожидании'}</span>
        )}
      </td>
    </tr>
  );
};

export default TaskItem;
