import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios-orders';
import withErrorHandler from './../../../hoc/withErrorHandler/withErrorHandler';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';
import * as orderActions from '../../../store/actions/index';
class ContactData extends Component {
  state = {
    formIsValid: false,
    form: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        validation: {
          required: true,
        },
      },
      postalCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Postal Code',
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        value: 'fastest',
      },
    },
  };

  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let key in this.state.form) {
      formData[key] = this.state.form[key].value;
    }

    const orderData = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: formData,
      date: new Date(),
    };

    this.props.onCreateOrder(orderData);
  };

  checkValidity = (value, rules) => {
    if (!rules) return true;

    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  };

  inputChangedHandler = (evt, inputKey) => {
    const updatedOrderForm = { ...this.state.form };
    const field = { ...updatedOrderForm[inputKey] };
    field.value = evt.target.value;
    field.valid = this.checkValidity(field.value, field.validation);
    field.touched = true;
    updatedOrderForm[inputKey] = field;

    let formIsValid = true;
    for (const key in updatedOrderForm) {
      formIsValid = updatedOrderForm[key].valid && formIsValid;
    }

    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid,
    });
  };

  renderForm() {
    const keys = Object.keys(this.state.form);
    return (
      <form onSubmit={this.orderHandler}>
        {keys.map((key) => {
          const el = this.state.form[key];
          return (
            <Input
              key={key}
              elementType={el.elementType}
              elementConfig={el.elementConfig}
              value={el.value}
              invalid={!el.valid}
              touched={el.touched}
              shouldValidate={el.validation}
              changed={(evt) => this.inputChangedHandler(evt, key)}
            />
          );
        })}

        <Button type="Success" disabled={!this.state.formIsValid}>
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

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.price,
    loading: state.order.loading,
    error: state.order.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateOrder: (orderData) => dispatch(orderActions.createOrder(orderData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
