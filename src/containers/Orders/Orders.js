import React, { Component } from 'react';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import Order from '../../components/Order/Order';

export default class Orders extends Component {
  state = {
    orders: null,
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get('/orders.json')
      .then((response) => {
        const fetchedOrders = [];
        for (const key in response.data) {
          if (Object.hasOwnProperty.call(response.data, key)) {
            fetchedOrders.push({ ...response.data[key], id: key });
          }
        }
        this.setState({ orders: fetchedOrders, loading: false });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  renderOrders() {
    if (this.state.loading) return <Spinner />;
    return this.state.orders.map((order) => (
      <Order key={order.id} {...order} />
    ));
  }

  render() {
    return <div>{this.renderOrders()}</div>;
  }
}
