import React, { Component } from 'react';
import axios from '../../../axios-orders';
import withErrorHandler from './../../../hoc/withErrorHandler/withErrorHandler';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    console.log(this.props.ingredients);

    const order = {
      ingredients: this.props.ingredients,
      price: this.state.price,
      date: new Date(),
      customer: {
        name: 'Max Gonzalez',
        address: {
          street: 'Street 123',
          zipCode: '3400',
          country: 'Argentina',
        },
      },
    };
    this.setState({ loading: true });
    axios
      .post('/orders.json', order)
      .then((response) => this.props.history.push('/'))
      .catch((error) => console.log(error))
      .finally(() => this.setState({ loading: false }));
  };

  renderForm() {
    return (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <input
          className={classes.Input}
          type="email"
          name="email"
          placeholder="Your Mail"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postalCode"
          placeholder="Postal Code"
        />

        <Button type="Success" clicked={this.orderHandler}>
          BUY
        </Button>
      </form>
    );
  }
  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {this.state.loading ? <Spinner /> : this.renderForm()}
      </div>
    );
  }
}

export default withErrorHandler(ContactData, axios);
