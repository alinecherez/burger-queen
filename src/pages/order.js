import React from 'react';
import './order.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import SignOutButton from '../components/SignOut';
import Btn from '../components/Button';
import Input from '../components/Input';
import { Tabs, Tab, Table } from 'react-bootstrap';
import firebase from '../firebaseConfig';

const db = firebase.firestore();

const breakfast = [
  {
    name: "Café americano",
    price: 5
  },
  {
    name: "Café com leite",
    price: 7
  },
  {
    name: "Sanduíche de presunto e queijo",
    price: 10
  },
  {
    name: "Suco natural de fruta",
    price: 7
  },
];

const burger = [
  {
    name: "Burger simples Bovino",
    price: 10
  },
  {
    name: "Burger simples Frango",
    price: 10
  },
  {
    name: "Burger simples Veggie",
    price: 10
  },
  {
    name: "Burger duplo Bovino",
    price: 15
  },

  {
    name: "Burger duplo Frango",
    price: 15
  },
  {
    name: "Burger duplo Veggie",
    price: 15
  }
];

const sideDish = [
  {
    name: "Batata frita",
    price: 5
  },
  {
    name: "Anéis de cebola",
    price: 5
  }
];

const beverages = [
  {
    name: "Água 500ml",
    price: 5
  },
  {
    name: "Água 750ml",
    price: 7
  },
  {
    name: "Bebida gaseificada 500ml",
    price: 7
  },
  {
    name: "Bebida gaseificada 750ml",
    price: 10
  }
];

const extras = [
  {
    name: "Queijo",
    price: 1
  },
  {
    name: "Ovo",
    price: 1
  },
];

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      client: ""
    };
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value
    this.setState(newState);
  }

  sendToKitchen = () => {
    const object = {
      order: this.state.order,
      client: this.state.client
    }
    db.collection('orders').add(object)
    this.setState({
      order: [],
      client: ""
    });
    alert("Pedido enviado")
  }

  orderClick = (item) => {
    const itemIndex = this.state.order.findIndex((product) => {
      return product.name === item.name;
    });
    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quantity: 1
      };
      this.setState({
        order: this.state.order.concat(newItem)
      });
    } else {
      let newOrder = this.state.order;
      newOrder[itemIndex].quantity += 1;
      this.setState({
        order: newOrder
      });
    }
  }

  delClick = (item) => {
    const itemIndex = this.state.order.findIndex((product) => {
      return product.name === item.name;
    });
    let newOrder = this.state.order;
    newOrder[itemIndex].quantity -= 1;
    const quantity = newOrder[itemIndex].quantity;
    if (quantity > 0) {
      this.setState({
        order: newOrder
      });
    } else {
      newOrder.splice(itemIndex, 1);
      this.setState({
        order: newOrder
      });
    }
  }

  render() {
    const totalOrder = this.state.order.reduce((acc, cur) => {
      return acc + (cur.quantity * cur.price)
    }, 0);

    return (
      <div className="order">
        <SignOutButton></SignOutButton>
        <Input
          type="text"
          value={this.state.client}
          text="Nome do cliente"
          onChange={(e) => this.handleChange(e, "client")} />
        <h4>Menu</h4>
        <menu className="menu">
          <Tabs defaultActiveKey="Café da manha" className="menu-tab">      
                  
           
            <Tab eventKey="Café da manha" title="Café da manhã">
              {
                breakfast.map((product, i) => {
                  return <button
                    className="product-btn"
                    key={i}
                    onClick={() => this.orderClick(product)}>
                    {product.name}
                  </button>
                })
              }
            </Tab>
            <Tab eventKey="Burger" title="Burger">
              {
                burger.map((product, i) => {
                  return <button
                    className="product-btn"
                    key={i}
                    onClick={() => this.orderClick(product)}>
                    {product.name}
                  </button>
                })
              }
            </Tab>
            <Tab eventKey="Extras" title="Extras">
              {
                extras.map((product, i) => {
                  return <button
                    className="product-btn"
                    key={i}
                    onClick={() => this.orderClick(product)}>
                    {product.name}
                  </button>
                })
              }
            </Tab>
            <Tab eventKey="Acompanhamentos" title="Acompanhamentos">
              {
                sideDish.map((product, i) => {
                  return <button
                    className="product-btn"
                    key={i}
                    onClick={() => this.orderClick(product)}>
                    {product.name}
                  </button>
                })
              }
            </Tab>
            <Tab eventKey="Bebidas" title="Bebidas">
              {
                beverages.map((product, i) => {
                  return <button
                    className="product-btn"
                    key={i}
                    onClick={() => this.orderClick(product)}>
                    {product.name}
                  </button>
                })
              }
            </Tab>
          </Tabs>
        </menu>
        <h4>Pedido</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Quantidade</th>
              <th>Item</th>
              <th>R$ unitário</th>
              <th>R$ subtotal</th>
              <th>Excluir item</th>
            </tr>
          </thead>
          <tbody >
            {
              this.state.order.map((product, i) => {
                return (
                  <tr key={i}>
                    <td>{product.quantity}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.price * product.quantity}</td>
                    <td><button onClick={() => this.delClick(product)}><FontAwesomeIcon icon={faTrashAlt} /></button></td>
                  </tr>
                );
              })
            }
          </tbody>
        </Table>
        {
          <h4>Total R$ {totalOrder}</h4>
        }
        <Btn text="Enviar pedido" onClick={this.sendToKitchen} />
      </div>
    );
  }
}

export default Order;