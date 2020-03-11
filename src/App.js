import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Clubs from './components/clubs';
import Discipline from './components/discipline';
import Gyms from './components/gyms';
import B from './components/block';
import NavLink from './components/NavLink';
import GymHandler from './services/GymHandler';
import gyms from './data/gyms.json';
import usedGyms from './data/usedGyms.json';

function App() {
  const gymHandler = new GymHandler(gyms);
  const gymHandlerUsed = new GymHandler(usedGyms);
  return (
    <div className="App">
      <Router basename={'/gf-ost'}>
        <Nav>
          <NavLink to={`/`}>Home</NavLink>
          <NavLink to={`/gymnaster`}>Gymnaster</NavLink>
          <NavLink to={`/hallar`}>Hallar</NavLink>
          <NavLink to={`/hallar-tider`}>Hallar faktiska tider</NavLink>
        </Nav>
        <Switch>
         <Route path={`${process.env.PUBLIC_URL}/klubbar`}>
           <Clubs />
         </Route>
         <Route path={`${process.env.PUBLIC_URL}/gymnaster`}>
           <Discipline />
         </Route>
         <Route path={`${process.env.PUBLIC_URL}/hallar`}>
           <Gyms gymHandler={gymHandler}/>
         </Route>
         <Route path={`${process.env.PUBLIC_URL}/hallar-tider`}>
           <Gyms gymHandler={gymHandlerUsed}/>
         </Route>
         <Route path={`${process.env.PUBLIC_URL}/`}>
           <B component="h1" style={{textAlign: 'center'}}>Välkommen!</B>
         </Route>
       </Switch>
      </Router>
    </div>
  );
}

function Nav({children}) {
  return (
    <B component="nav" style={{backgroundColor: 'white', padding: '2rem', margin: 0}}>
      <B component="ul" style={{display: 'flex', listStyle: 'none', margin: 0, padding:0}}>
        {children}
      </B>
    </B>
  );
}

export default App;
