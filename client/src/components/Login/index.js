//Login Component
import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import Auth from '../../utils/auth';

import "./styles.css"

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';



function LogIn() {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [login, { data }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...userFormData },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.error({e});
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };
  return (
<>
{data ? (
      <p>
        Success! You may now head back to the homepage.
      </p>
    ) :(<Form noValidate validated={validated} onSubmit={handleFormSubmit} className="text-center">
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group className="text-center custom-label mb-4">
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="text-center custom-label">
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button className="mt-3 flat" size="xxl"
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>)}
      
    </>
  );
}

export default LogIn;
