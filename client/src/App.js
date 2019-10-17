import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing'

import authAccess from './utils/authAccess'
import {Provider} from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';

import Routes from './components/routing/Routes'

function App() {

  if(localStorage.token) {
    authAccess(localStorage.token)
  }

  useEffect(() => {
      store.dispatch(loadUser()); 
      
  }, [localStorage.token])

  return (
    <Provider store={store}>
    <Router>
           <Navbar/>
           <Switch>
           <Route exact path="/" component={Landing}/>  
           <Route component={Routes}/>
           </Switch>
       
    </Router>
    </Provider>
  );
}

export default App;
