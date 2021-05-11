/** @format */
import "./App.css";
import Customers from "./Customers/pages/Customers";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import NewCustomer from "./Customers/pages/NewCustomer";
import UpdateCustomer from "./Customers/pages/UpdateCustomer";

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <Customers />
        </Route>
        <Route path='/new' exact>
          <NewCustomer />
        </Route>
        <Route path='/update/:customerId' exact>
          <UpdateCustomer />
        </Route>
        <Redirect to='/' />
      </Switch>
    </Router>
  );
}

export default App;
