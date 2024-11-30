import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/taskList';
import TaskForm from './components/taskForm';
import Login from './components/login';
import { getTasks } from './api';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('username');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await getTasks(page, sortBy);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [page, sortBy]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<TaskList tasks={tasks} loading={loading} currentPage={page} setPage={setPage} />} />
          <Route path="/create" element={<TaskForm />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
