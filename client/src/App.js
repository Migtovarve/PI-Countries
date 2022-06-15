import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import LandingPage from './components/LandingPage/LandingPage';
import Home from "./components/Home/Home"
import Details from './components/Details/Details';
import ActivityCreate from './components/ActivityCreate/ActivityCreate';




function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Switch>
        <Route exact path="/"><LandingPage/></Route>
        <Route path="/home">
          <Home/>
        </Route>
        <Route path="/countries/:id">
          <Details/>
        </Route>
        <Route path="/activity">
          <ActivityCreate/>
        </Route>
      </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
