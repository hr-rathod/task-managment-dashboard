import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import './components/styles/style.css'
const { Sider, Content, Header } = Layout;
import { ToastContainer } from 'react-toastify';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    const serializableDueDate = newTask.dueDate.toString();
    const serializableTask = { ...newTask, dueDate: serializableDueDate };
    setTasks([...tasks, serializableTask]);
  };

  const completeTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: true } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <Router>
      <Layout style={{ minHeight: '100vh', width: '100%' }}>
      <ToastContainer />
        <Header style={{ background: '#fff', padding: '0 16px' }}>
          <div style={{ color: 'black', fontSize: '20px', fontWeight: 'bold' }}>Task Management</div>
        </Header>
        <Layout>
          <Sider width={200} theme="light" breakpoint="lg" collapsedWidth="0">
            <Menu mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Link to="/">Task List</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/add">Add Task</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: '16px', background: '#fff', minWidth: '320px' }}>
            <Content style={{ padding: 24, margin: 0,maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
              <Routes>
                <Route
                  path="/"
                  element={<TaskList tasks={tasks} onComplete={completeTask} onDelete={deleteTask} />}
                />
                <Route
                  path="/add"
                  element={<AddTaskForm onAddTask={addTask} />}
                />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
