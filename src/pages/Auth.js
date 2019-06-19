import React from 'react';
import './auth.css';
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';
import Btn from '../components/Button'
import Input from '../components/Input'
import { Tabs, Tab, Form, Alert } from 'react-bootstrap'

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
      newPassword: "",
      error: false
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

        if(typeof resp === 'undefined') return this.setState({error: true})
    
        const id = resp.user.uid;
        db.collection("users").doc(id).get()
          .then(resp => {
            const data = resp.data();
            this.props.history.push(`/${data.usuario}`);
          })
        
      })
      .catch(error => console.log(error))
  }

  render() {
    const { error } = this.props;

    return (
      <div>
        <section className="users">
          <Tabs defaultActiveKey="Login" className="users-tabs">
            <Tab eventKey="Login" title="Login">             
                <h4>Faça o seu login</h4>
                <Input
                  type="email"
                  value={this.state.email}
                  text="Email"
                  onChange={(e) => this.handleChange(e, "email")} />
                <Input
                  type="password"
                  value={this.state.password}
                  text="Senha"
                  onChange={(e) => this.handleChange(e, "password")} />
                <Btn text="Entrar" onClick={this.signIn} />           
            </Tab>
            <Tab eventKey="CreateUser" title="Cadastro">
              <h4>É novo? Crie uma conta</h4>
              <Input
                type="text"
                value={this.state.name}
                text="Nome"
                onChange={(e) => this.handleChange(e, "name")} />

              <Input
                type="email"
                value={this.state.newEmail}
                text="Email"
                onChange={(e) => this.handleChange(e, "newEmail")} />

              <Input
                type="password"
                value={this.state.newPassword}
                text="Senha"
                onChange={(e) => this.handleChange(e, "newPassword")} />              

              <Form.Control as="select" className="drop-menu" onChange={(e) => this.handleChange(e, "userType")}>
                <option defaultselected="true">Tipo de usuário</option>
                <option value="kitchen">Cozinha</option>
                <option value="order">Salão</option>
              </Form.Control>

              <Btn text="Cadastro" onClick={this.createUser} />
            </Tab>
          </Tabs>
          { error && (
            <Alert variant="warning">
              { error }
            </Alert>
            )
          }     
        </section>

      </div>
    )
  }
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(Auth);