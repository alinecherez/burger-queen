import React from 'react';
import './Input.css';
import { Form } from 'react-bootstrap'

function Input(props) {
  return (
    <Form.Control
    className="input"
    type={props.type}    
    value={props.value}
    placeholder={props.text}
    onChange={props.onChange}>
    </Form.Control>  
  );
}

export default Input;