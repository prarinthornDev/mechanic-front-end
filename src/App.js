import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import LOGIN from './pages/login';
import SIGNUP from './pages/signup';
import JOBS from './pages/jobs';
import HOME from './pages/home';
import DETAIL from './pages/detail';
import NOTFOUND from './pages/notfound';
import POST from './pages/post';
import PROFILE from './pages/profile';

import AOS from 'aos';

AOS.init();

function App() {
  
  return (
    <Router>
    <Switch>
      <Route exact path="/" component={HOME} />
      <Route path="/login" component={LOGIN} />
      <Route path="/signup" component={SIGNUP} />
      <Route path="/post/:id?" component={POST} />
      <Route path="/detail/:id" component={DETAIL} /> 
      <Route path="/profile/:id" component={PROFILE} /> 
{/*       <Route path="/listProductSaller" component={ListProductSaller} />
      <Route path="/register" component={Register} />
      <Route path="/sale/:id?" component={Sale} />}
      <Route path="/profileSaller/:id?" component={ProfileSaller} />
      <Route path="/productDetail/:id?" component={ProductDetail} /> */}
      <Route component={NOTFOUND} />
    </Switch> 
  </Router>
  );
}

export default App;
