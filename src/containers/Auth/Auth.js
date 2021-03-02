import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import AuthType from '../../constants';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

import classes from './Auth.css';

class Auth extends Component {
  state = {
    formIsValid: false,
    form: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Your Password',
        },
        value: '',
        validation: {
          required: true,
          minLenght: 6,
        },
        valid: false,
        touched: false,
      },
    },
  };

  inputChangedHandler = (evt, inputKey) => {
    const updatedForm = {
      ...this.state.form,
      [inputKey]: {
        ...this.state.form[inputKey],
        value: evt.target.value,
        valid: this.checkValidity(
          evt.target.value,
          this.state.form[inputKey].validation
        ),
        touched: true,
      },
    };

    let formIsValid = true;
    for (const key in updatedForm) {
      formIsValid = updatedForm[key].valid && formIsValid;
    }

    this.setState({
      form: updatedForm,
      formIsValid: formIsValid,
    });
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

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  };

  submitHandler = (evt) => {
    evt.preventDefault();
    this.props.onAuth(
      this.state.form.email.value,
      this.state.form.password.value,
      this.props.authType
    );
  };

  renderFormControls = () => {
    const keys = Object.keys(this.state.form);
    return keys.map((key) => {
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
    });
  };

  renderButton = () => {
    const label =
      this.props.authType === AuthType.SIGN_IN ? 'SIGN IN' : 'SIGN UP';
    return (
      <Button type="Success" disabled={!this.state.formIsValid}>
        {label}
      </Button>
    );
  };

  renderError = () => {
    if (!this.props.error) return null;
    return <p className={classes.Error}>{this.props.error.message}</p>;
  };

  renderMessage = () => {
    if (this.props.authType === AuthType.SIGN_IN) {
      return (
        <React.Fragment>
          You don't have an account, please <Link to={'/sign-up'}>sign up</Link>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        You already have an account, please <Link to={'/sign-in'}>sign in</Link>
      </React.Fragment>
    );
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/orders" />;
    }
    if (this.props.loading) {
      return <Spinner />;
    }
    return (
      <div className={classes.Auth}>
        <form onSubmit={this.submitHandler}>
          {this.renderFormControls()}
          {this.renderError()}
          {this.renderButton()}

          <p>{this.renderMessage()}</p>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    loading: state.auth.loading,
    isAuthenticated: !!state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, authType) =>
      dispatch(actions[authType](email, password)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Auth, axios));
