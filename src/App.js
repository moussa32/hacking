import Overview from "./modules/Blog/components/Dashboard/Overview";
import AvailablePrograms from "./modules/AvailablePrograms";
import ProgramDashboard from "./modules/Program/components/Dashboard/Main";
import ProgramRouteController from "./modules/Program/components/Program";
import Login from "./modules/Login";
import SignupPage from "./modules/SignupPage";
import ResetPassword from "./modules/Reset/ResetPassword";
import ResetEmail from "./modules/Reset/ResetEmail";
import ForgetPassword from "./modules/ForgetPassword";
import Home from "./modules/Blog/components/Home/Home";
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "./shared/components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Switch>
        <ProtectedRoute path="/dashboard" component={Overview} />
        <ProtectedRoute exact path="/program/dashboard" component={ProgramDashboard} />
        <Route path="/program/" component={ProgramRouteController} />
        <Route path="/available-programs" component={AvailablePrograms} />
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
