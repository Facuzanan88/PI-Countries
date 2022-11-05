import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/LandingPage";
import ActivityCreate from "./components/ActivityCreate/ActivityCreate";
import countryDetail from "./components/CountryDetail/CountryDetail";

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
