import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const App: React.FC = () => (
  <Router>
    <div className="App">
      <Switch >
        <Route path="*">
          <div>404 page</div>
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
