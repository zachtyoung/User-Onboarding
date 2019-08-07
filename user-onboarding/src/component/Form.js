import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';


/*
  deleted:
    state, ✅
    handleChanges, ✅
    handleSubmit ✅
    form onSubmit ✅
    input values ✅
    input onChange ✅
    labels ✅
*/

// Tasks - Add two fields - size, notes. Don't forget to add them to the values in mPTV

const UserForm = ({ errors, touched, values, handleSubmit, status }) => {
  const [users, setUsers] = useState([]);
console.log(users)
  useEffect(() => {
    if (status) {
      setUsers([...users, status]);
    }
  }, [status]);

  return (
      <>
     
    <div className="user-form">
      <h1>User Form</h1>
      <Form>
        <Field type="text" name="name" placeholder="Name" />
        {touched.name && errors.name && (
          <p className="error">{errors.name}</p>
        )}

        <Field type="text" name="email" placeholder="Email" />
        {touched.email && errors.email && <p className="error">{errors.email}</p>}

        <Field type="text" name="password" placeholder="Password" />
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}

        <label className="checkbox-container">
          I accept the Terms of Service
          <Field
            type="checkbox"
            name="tos"
            checked={values.tos}
          />
          <span className="checkmark" />
        </label>

        <button type="submit">Submit!</button>
      </Form>
      <div className="container">
          <h1>Users</h1>
    {users.map(el => <div className="user-return">{el.name}</div>)}
    </div>
    </div>
    </>
  );
};


const FormikUserForm = withFormik({
  mapPropsToValues({ name, email, password, tos }) {
    return {
      tos: tos || false,
      password: password || '',
      email: email || '',
      name: name || ''
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required('Please enter your name'),
    email: Yup.string().required('Please enter a valid email'),
    password: Yup.string().required('Please enter a password')
  }),

  handleSubmit(values, { setStatus }) {
    axios
      .post('https://reqres.in/api/users/', values)
      .then(res => {
        setStatus(res.data);
        console.log(res.data)
      })
      .catch(err => console.log(err.response));
  }
})(UserForm); // currying functions in Javascript

export default FormikUserForm;