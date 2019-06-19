import React from 'react';
import firebase from '../firebaseConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap'
import './SignOut.css'

const SignOut = () => {
  return (
    <>
      <Button
        variant="dark"
        onClick={() => firebase.auth().signOut()}
        className="signOut">
        Sair <FontAwesomeIcon icon={faSignOutAlt} />
      </Button>
    </>
  );
};

export default SignOut;