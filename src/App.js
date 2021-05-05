import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import Header from "./components/panels/Header";
import Details from "./components/pages/Details";

function App() {
  return (
    <div id="app">
      <Header title="Where in the world?" />
      <Router>
        <Switch>
          <Route exact component={Home} path="/" />                    
          <Route path="/details/:name" render={(props) => <Details {...props} />}/>                    
        </Switch>
      </Router>
    </div>
  );
}

export default App;
