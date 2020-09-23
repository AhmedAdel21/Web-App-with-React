import React , {Component} from 'react';
import '../App.css';
import Home from './HomeComponent';
import Menu from './menuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {DISHES} from '../shared/dishes';
import DishDetail from './DishdetailComponent';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      dishes: DISHES , 
      selectedDish:null
    };
  }
  onDishSelect(dishID) {
    this.setState({selectedDish:dishID});
}
  render()
  {
    const HomePage = () => {
      return(
          <Home />
      );
    } 
    return (
      <div >
        <Header />
        <Switch>
          <Route path='/home' component={HomePage} />
          <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
          <Redirect to="/home" Component={HomePage}/>
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
