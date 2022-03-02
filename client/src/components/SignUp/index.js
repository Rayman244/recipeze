//SignUp
import React,{useState} from "react";
import Auth from '../../utils/auth';
import {Alert} from 'react-bootstrap'
import { ADD_USER } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import { Card, Button, Form } from "react-bootstrap";



function SignUp() {

  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [addUser, { data }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
    <style type="text/css">
    {`

    .btn-flat {
      background-color: #598787;
      
    }

    .btn-xxl {
      padding: 1rem 1.5rem;
      font-size: 1.5rem;
      border-radius: 50px;
      color: #f1d261;
      border-color: #f1d261; 
      border-width: 5px;
    }
    .custom-label {
      font-family: 'Catamaran', sans-serif;
      padding: 1.2rem;
      font-weight: bold;
      letter-spacing: 0.6rem;
      font-size: 1.2rem;
      border-top: 3px solid #f1d261;
      border-bottom: 3px solid #f1d261;
      border-width: 10px;
    }

    .title {
      font-family: 'Catamaran', sans-serif;
      padding: 1.2rem;
      font-weight: bold;
      letter-spacing: 0.2rem;
      font-size: 1.2rem;
      border-top: 3px solid #f1d261;
      border-bottom: 3px solid #f1d261;
      border-width: 10px;
    }
    `}
  </style>
    {data ? (
      <p>
        Success! You may now head back to the homepage.
      </p>
    ) :(
    <Card>
      <Card.Header className="text-center">ReciPeZe Sign Up</Card.Header>
      <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>
      <Card.Body>
        <Card.Title className="text-center mt-2 mb-4 title">Please choose your Username and Password below</Card.Title>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit} className="text-center">
        <Form.Group className="text-center custom-label mb-4">
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="text-center custom-label mb-4">
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="text-center custom-label mb-4">
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
          <Button type="submit" className="mt-3 flat" size="xxl">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>)}
    </>
  );
}

export default SignUp;
