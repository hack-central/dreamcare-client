import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Landing from './views/Landing';
import Home from './views/Home';

import './App.css';

function App() {
  return (
      <div className="main">
      <Router>
        <Switch>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/">
            <Landing />
          </Route>
        </Switch>
      </Router>
      </div>
  );
}

export default App;
