import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import FormLogin from './Components/FormLogin'
import FormRegister from './Components/FormRegister'
import initFirebase from './config';
import Shoes from './Categories/Shoes'
import Suits from './Categories/Suits';
import Accessories from './Categories/Accessories'
import Cart from './pages/Cart'
import NotFound from './Components/NotFound'
import SearchResult from './SearchResult'

import './App.css';


const routing = <Router>
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route exact path="/products" component={Products} />
        <Route path="/about" component={About} />
        <Route path="/sign-up" component={FormRegister} />
        <Route path="/sign-in" component={FormLogin} />
        <Route path="/shoes" component={Shoes} />
        <Route path="/suits" component={Suits} />
        <Route path="/accessories" component={Accessories} />
        <Route path="/cart" component={Cart} />
        <Route path="/about" component ={About} />
        <Route path="/search-result" component = {SearchResult} />
        <Route  component= {NotFound} />

    </Switch>

</Router>

initFirebase();

ReactDOM.render(routing, document.getElementById('root'));