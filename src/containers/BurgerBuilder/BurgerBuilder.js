import React, { Component } from 'react';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
  salad: 0.5,
};

const BURGER_BASE_PRICE = 4;

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    price: BURGER_BASE_PRICE,
    canOrder: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const newPrice = this.state.price + INGREDIENT_PRICES[type];

    this.setState({
      ingredients: updatedIngredients,
      price: newPrice,
    });
    this.updateCanOrder(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (!oldCount) {
      return;
    }
    const updatedCount = oldCount ? oldCount - 1 : 0;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const newPrice = this.state.price - INGREDIENT_PRICES[type];

    this.setState({
      ingredients: updatedIngredients,
      price: newPrice,
    });
    this.updateCanOrder(updatedIngredients);
  };

  updateCanOrder = (ingredients) => {
    const sum = Object.keys(ingredients).reduce(
      (acum, el) => acum + ingredients[el],
      0
    );

    this.setState({
      canOrder: sum > 0,
    });
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseConfirmHandler = () => {
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        `${encodeURIComponent(i)}=${encodeURIComponent(
          this.state.ingredients[i]
        )}`
      );
    }
    queryParams.push(`price=${this.state.price}`);

    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString,
    });
  };

  componentDidMount() {
    axios
      .get('/ingredients.json')
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  renderOrderSummary() {
    if (this.state.loading) {
      return <Spinner />;
    }
    if (!this.state.ingredients) {
      return null;
    }
    return (
      <OrderSummary
        ingredients={this.state.ingredients}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseConfirmed={this.purchaseConfirmHandler}
        price={this.state.price}
      />
    );
  }

  renderBurger() {
    if (!this.state.ingredients && !this.state.error) {
      return <Spinner />;
    }
    if (this.state.error) {
      return <p>Ingredients can't be loaded</p>;
    }
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (const key in disabledInfo) {
      disabledInfo[key] = !disabledInfo[key];
    }
    return (
      <React.Fragment>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          price={this.state.price}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          ordered={this.purchaseHandler}
          disabled={disabledInfo}
          canOrder={this.state.canOrder}
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

export default withErrorHandler(BurgerBuilder, axios);
