import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/LandingPage";
import ActivityCreate from "./components/ActivityCreate/ActivityCreate";
import countryDetail from "./components/CountryDetail/CountryDetail";
import axios from 'axios';

/* axios.defaults.baseURL = 'http://localhost:3001/' */

axios.defaults.baseURL = 'pi-countries-production-b25e.up.railway.app'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="App1">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
            <Route path="/activities" component={ActivityCreate} />
            <Route exact path='/countries/:id' component={countryDetail} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
