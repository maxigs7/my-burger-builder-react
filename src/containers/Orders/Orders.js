import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import Order from '../../components/Order/Order';
import * as actions from '../../store/actions';
class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  renderOrders() {
    if (this.props.loading) return <Spinner />;
    return this.props.orders.map((order) => (
      <Order key={order.id} {...order} />
    ));
  }

  render() {
    return <div>{this.renderOrders()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    error: state.order.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: () => dispatch(actions.fetchOrders()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
