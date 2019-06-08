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
    this.setState({
      order: this.state.order.concat(item)
    });
  }

  render() {
    console.log(this.state.order);
    return (
      <div>
        {
          menu.map((product, i) => {
            return <button key={i}
              onClick={() => this.orderClick(product)}>
              {product.item}</button>
          })
        }
      </div>
    );
  }
}

export default Order;