import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
import ActivityCreate from "./components/ActivityCreate";
import countryDetail from "./components/CountryDetail";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path="/activities" component={ActivityCreate} />
          <Route exact path='/countries/:id' component={countryDetail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
