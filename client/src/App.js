import React from 'react'
import {Switch, Route} from 'react-router-dom'
import './App.css';
import Category from './components/Category';
import Home from './components/Home';
import Mint from './components/Mint';
import Navbar from './components/Navbar/Navbar'
import Token from './components/Token';
import User from './components/User';

function App() {
  return (
    <div>
      <Navbar/>
        <Switch>
          <Route exact path='/'  component={Home}/>
          <Route exact path='/mint' component={Mint} />
          <Route exact path='/user' component={User}/>
          <Route exact path='/token'  component={Token}/>
          <Route exact path='/category' component={Category} />
        </Switch>
    </div>
  );
}

export default App;