import React from 'react';
// import './Button.css';
import { Form } from 'react-bootstrap'

function Check(props) {
  return (
    <Form.Check className="mb-3"
      type="radio"
      onChange={props.onChange}
      value={props.text}
      label={props.text}
    />
  );
}
export default Check;