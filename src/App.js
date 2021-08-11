import Overview from "./modules/Blog/components/Dashboard/Overview";
import AvailablePrograms from "./modules/AvailablePrograms";
import Program from "./modules/Program/components/Program";
import Login from "./modules/Login";
import SignupPage from "./modules/SignupPage";
import ResetPassword from "./modules/Reset/ResetPassword";
import ResetEmail from "./modules/Reset/ResetEmail";
import ForgetPassword from "./modules/ForgetPassword";
import Home from "./modules/Blog/components/Home/Home";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/dashboard" component={Overview} />
        <Route path="/available-programs" component={AvailablePrograms} />
        <Route path="/program" component={Program} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignupPage} />
        <Route exact path="/reset-password" component={ResetPassword} />
        <Route exact path="/reset-email" component={ResetEmail} />
        <Route exact path="/forget-password" component={ForgetPassword} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
