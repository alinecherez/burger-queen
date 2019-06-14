import React from "react";

const menu = [
  {
    item: "Café americano",
    price: 5
  },
  {
    item: "Café com leite",
    price: 7
  },
  {
    item: "Sanduíche de presunto e queijo",
    price: 10
  },
  {
    item: "Suco natural de fruta",
    price: 7
  },
];

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: []
    };
  }

  orderClick = (item) => {
    const itemIndex = this.state.order.findIndex((product) => {
      return product.item === item.item;
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
      return product.item === item.item;
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
      this.setState({
        order: newOrder
      });
  }

  render() {
    const totalOrder = this.state.order.reduce((acc, cur) => {
      return acc + (cur.quantity * cur.price)
    }, 0);

    return (
      <div>
        {
          menu.map((product, i) => {
            return <button key={i}
              onClick={() => this.orderClick(product)}>
              {product.item}</button>
          })
        }
        <h2>Pedido</h2>
        {
          this.state.order.map((product, i) => {
            return <div key={i}>
              <p>{product.quantity} | {product.item} | {product.price} | {product.price * product.quantity}</p>
              <button onClick={() =>
              this.delClick(product)}></button>
              </div>
          })
        }
        <h2>Total</h2>
        {
          <p>R$ {totalOrder}</p>
        }
      </div>
    );
  }
}

export default Order;