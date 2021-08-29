import React from 'react'
import {Switch, Route} from 'react-router-dom'
import './App.css';
import Category from './components/Category';
import Home from './components/Home';
import Navbar from './components/Navbar/Navbar'
import Token from './components/Token';
import User from './components/User';
import MyTokens from './components/MyTokens';
import Filter from './components/Filter';
import ViewToken from './components/ViewToken';

function App() {
  return (
    <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
      <Navbar/>
        <Switch>
          <Route exact path='/'  component={Home}/>
          <Route exact path='/mint' component={Token} />
          <Route exact path='/user' component={User}/>
          <Route exact path='/category' component={Category} />
          <Route exact path='/mytoken' component={MyTokens} />
          <Route exact path='/filter' component={Filter} />
          <Route exact path='/token/:id/:category' component={ViewToken} />
        </Switch>
    </div>
  );
}

export default App;