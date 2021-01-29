import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

export default class Checkout extends Component {
  state = {
    ingredients: {},
    price: 0,
  };

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (const p of params.entries()) {
      if (p[0] === 'price') {
        price = +p[1];
        continue;
      }
      ingredients[p[0]] = +p[1];
    }

    this.setState({
      ingredients: ingredients,
      price: price,
    });
  }

  cancelCheckoutHandler = () => {
    this.props.history.goBack();
  };

  continueCheckoutHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          cancel={this.cancelCheckoutHandler}
          continue={this.continueCheckoutHandler}
        />
        <Route
          path={this.props.match.path + '/contact-data'}
          render={(props) => (
            <ContactData
              {...props}
              ingredients={this.state.ingredients}
              price={this.state.price}
            />
          )}
        />
      </div>
    );
  }
}
