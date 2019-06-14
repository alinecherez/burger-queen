import React from 'react';
import './Button.css';
import { Button } from 'react-bootstrap'

function Btn(props) {
  return (
    <Button variant="dark"
      className="button" onClick={props.onClick}>
      {props.text}
    </Button>
  );
}
export default Btn;