import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
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
      <Router>
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route apth='/mint' exact component={Mint} />
          <Route path='/user' exact component={User}/>
          <Route path='/token' exact component={Token}/>
          <Route path='/category' exact component={Category} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
