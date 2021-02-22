import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentWillMount() {
    this.props.initCreateOrder();
  }

  componentDidMount() {
    this.props.fetchIngredients();
  }

  canOrder = (ingredients) => {
    const sum = Object.keys(ingredients).reduce(
      (acum, el) => acum + ingredients[el],
      0
    );

    return sum > 0;
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseConfirmHandler = () => {
    this.props.history.push('/checkout');
  };

  renderOrderSummary() {
    if (!this.props.ings) {
      return null;
    }
    return (
      <OrderSummary
        ingredients={this.props.ings}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseConfirmed={this.purchaseConfirmHandler}
        price={this.props.price}
      />
    );
  }

  renderBurger() {
    if (!this.props.ings && !this.props.error) {
      return <Spinner />;
    }
    if (this.props.error) {
      return <p>Ingredients can't be loaded</p>;
    }
    const disabledInfo = {
      ...this.props.ings,
    };
    for (const key in disabledInfo) {
      disabledInfo[key] = !disabledInfo[key];
    }
    return (
      <React.Fragment>
        <Burger ingredients={this.props.ings} />
        <BuildControls
          price={this.props.price}
          ingredientAdded={this.props.onIngredientAdded}
          ingredientRemoved={this.props.onIngredientRemoved}
          ordered={this.purchaseHandler}
          disabled={disabledInfo}
          canOrder={this.canOrder(this.props.ings)}
        />
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {this.renderOrderSummary()}
        </Modal>
        {this.renderBurger()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.price,
    error: state.burgerBuilder.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchIngredients: () => dispatch(actions.fetchIngredients()),
    onIngredientAdded: (ingredient) =>
      dispatch(actions.addIngredient(ingredient)),
    onIngredientRemoved: (ingredient) =>
      dispatch(actions.removeIngredient(ingredient)),
    initCreateOrder: () => dispatch(actions.createOrderInit()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
