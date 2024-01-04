import React from 'react';
import { connect } from 'react-redux';
import { completeTask, deleteTask } from '../reducers/taskReducer';
import { Row, Col, Card, Button } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskList = ({ tasks, dispatch }) => {
  const handleCompleteTask = (taskId) => {
    dispatch(completeTask(taskId));
    toast.success('Task completed successfully!');
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
    toast.error('Task deleted successfully!');
  };

  return (
    <div>
      <Row gutter={16}>
        {tasks.map((task) => (
          <Col key={task.id} xs={24} sm={12} md={8} lg={8}>
            <Card
              title={task.title}
              extra={<Button onClick={() => handleDeleteTask(task.id)} type="link" danger>Delete</Button>}
              style={{ marginBottom: '16px', backgroundColor: task.completed ? '#b7eb8f' : 'inherit' }}
            >
              <p>{task.description}</p>
              <p>Due Date: {task.dueDate}</p>
              {task.completed ? (
                <p style={{ color: 'green' }}>Completed</p>
              ) : (
                <Button type="primary" onClick={() => handleCompleteTask(task.id)}>
                  Complete
                </Button>
              )}
            </Card>
          </Col>
        ))}
      </Row>
      <ToastContainer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  tasks: state.tasks.tasks,
});

export default connect(mapStateToProps)(TaskList);
