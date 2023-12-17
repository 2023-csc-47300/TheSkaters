import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Component.css'


// Some stuff to make it easier
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Don't forget
import UserAPI from '../services/UserAPI';

const Local = (props) => { 
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }
    

    const handleSubmit = async (event) => {
        const formData = new FormData(event.target); // Createa a FormData object

        const body = {
            email: formData.get('email'), //Get email value from form
            password: formData.get('password'), // Get password value
        };

        event.preventDefault();

        const response = await UserAPI.loginViaLocal(formData);

        if(response.status == 200){
            // Success!
            // setLocalUser(response);
            // return;

        }
        else if(response.status == 401){
            // Fails. Return error
            setErrorMess(true);
            return;
        } else return;

    }

    const [errorMess, setErrorMess] = useState(false);

    return (
    <div className="local-sign-in">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
      {errorMess ? 
        <><h4>Error: Incorrect Credentials</h4></> : 
        <></>
      }
    </div>
  );
    /*
    return (
        <div className="local-sign-in">

            <form action={handleLocalLogin} className="local-form">
                <label for="email" className="local-email">eMail:</label>
                    <input type="text" id="email" name="email" /><br></br>
                <label for="password" className="local-password">Password:</label>
                    <input type="text" id="password" name="password" /><br></br>
                <input type="submit" value="Submit" />
            </form>


        </div>
    )
    */
}

export default Local