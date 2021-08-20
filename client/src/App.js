import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';
import Home from './components/Home';
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
          <Route path='/user' exact component={User}/>
          <Route path='/token' exact component={Token}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
