import React from 'react';
import { connect } from 'react-redux';
import { addTask } from '../reducers/taskReducer';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import './styles/style.css'

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Please enter a title'),
  description: Yup.string(),
  dueDate: Yup.date().required('Please select a due date'),
});

const AddTaskForm = ({ dispatch }) => {
  const handleSubmit = (values, { resetForm }) => {
    const newTask = {
      id: new Date().getTime(),
      title: values.title,
      description: values.description,
      dueDate: values.dueDate,
      completed: false,
    };

    dispatch(addTask(newTask));
    toast.success('Task added successfully!');
    resetForm();
  };

  return (
    <Formik
      initialValues={{ title: '', description: '', dueDate: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="form-container">
        <label className="label" htmlFor="title">
          Title
        </label>
        <Field type="text" id="title" name="title" className="input-field" placeholder="Enter task title" />
        <ErrorMessage name="title" component="div" className="error-message" />

        <label className="label" htmlFor="description">
          Description
        </label>
        <Field as="textarea" id="description" name="description" className="input-field" placeholder="Enter task description" />
        <ErrorMessage name="description" component="div" className="error-message" />

        <label className="label" htmlFor="dueDate">
          Due Date
        </label>
        <Field type="date" id="dueDate" name="dueDate" className="input-field" />
        <ErrorMessage name="dueDate" component="div" className="error-message" />

        <button type="submit" className="submit-button">
          Add Task
        </button>
      </Form>
    </Formik>
  );
};

export default connect()(AddTaskForm);
