import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TaskItem from './taskItem';
import Pagination from './pagination';

const TaskList = ({ tasks, loading, currentPage, setPage }) => {
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  if (loading) return <div>Загрузка...</div>;

  return (
    <div>
      <h2>Доска задач</h2>

      <div>
        <Link to="/create">
          <button>Создать задачу</button>
        </Link>
      </div>

      {token && (
        <div>
          <button onClick={handleLogout}>Выйти</button>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Пользователь</th>
            <th>Email</th>
            <th>Описание</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <TaskItem key={task.id} task={task} isAdmin={!!token} />
          ))}
        </tbody>
      </table>
      
      <Pagination currentPage={currentPage} setPage={setPage} />
    </div>
  );
};

export default TaskList;
