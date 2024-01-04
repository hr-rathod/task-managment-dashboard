import React from 'react';
import { connect } from 'react-redux';
import { completeTask, deleteTask } from '../reducers/taskReducer';

const Task = ({ task, onComplete, onDelete }) => {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Due Date: {task.dueDate}</p>
      {task.completed ? (
        <p style={{ color: 'green' }}>Completed</p>
      ) : (
        <button onClick={() => onComplete(task.id)}>Complete</button>
      )}
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onComplete: (taskId) => dispatch(completeTask(taskId)),
  onDelete: (taskId) => dispatch(deleteTask(taskId)),
});

export default connect(null, mapDispatchToProps)(Task);
