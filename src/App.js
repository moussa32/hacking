import Home from "./modules/Blog/components/Home/Home";
import Program from "./modules/Program/components/Program";
import Overview from "./modules/Blog/components/Dashboard/Overview";

import { Switch, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/program' component={Program} />
        <Route path='/dashboard' component={Overview} />
        <Route path='/' component={Home} />
      </Switch>
    </div>
  );
}

export default App;
