import Home from "./modules/Blog/components/Home/Home";
import Dashboard from "./modules/Blog/components/Dashboard/Overview";

import { Switch, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/' component={Home} />
      </Switch>
    </div>
  );
}

export default App;
