import React from 'react';
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';

const firebaseAppAuth = firebase.auth();
const db = firebase.firestore();

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      userType: "",
      newEmail: "",
      newPassword: ""
    };
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value
    this.setState(newState);
  }

  createUser = () => {
    this.props.createUserWithEmailAndPassword(this.state.newEmail, this.state.newPassword)
      .then(resp => {
        if (resp) {
          const id = resp.user.uid;
          db.collection("users").doc(id).set({
            email: this.state.newEmail,
            nome: this.state.name,
            usuario: this.state.userType
          })
            .then(() => {
              this.props.history.push(`/${this.state.userType}`);
            })
        }
      })
  }

  signIn = () => {
    this.props.signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(resp => {
      const id = resp.user.uid;
      db.collection("users").doc(id).get()
      .then(resp => {
        const data = resp.data();
        this.props.history.push(`/${data.usuario}`);
      })
    })
  }

  render() {
    if (this.props.error) {
      alert (this.props.error);
    }
    return (
      <div>
        <h2>Faça o seu login</h2>

        <input value={this.state.email}
          placeholder="Email"
          onChange={(e) => this.handleChange(e, "email")} />


        <input value={this.state.password}
          placeholder="Senha"
          onChange={(e) => this.handleChange(e, "password")} />

        <Button text="Entrar" onClick={this.signIn} />

        <h2>É novo? Crie uma conta</h2>

        <input value={this.state.name}
          placeholder="Nome"
          onChange={(e) => this.handleChange(e, "name")} />

        <select onChange={(e) => this.handleChange(e, "userType")}>
          <option defaultselected="true">Tipo de usuário</option>
          <option value="kitchen">Cozinha</option>
          <option value="order">Salão</option>
        </select>

        <input value={this.state.newEmail}
          placeholder="Email"
          onChange={(e) => this.handleChange(e, "newEmail")} />

        <input value={this.state.newPassword}
          placeholder="Senha"
          onChange={(e) => this.handleChange(e, "newPassword")} />

        <Button text="Cadastro" onClick={this.createUser} />
      </div>
    )
  }
}

function Button(props) {
  return (
    <button className="button" onClick={props.onClick}>
      {props.text}
    </button>
  );
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(Auth);