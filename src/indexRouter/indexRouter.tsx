import { FC } from "react"
import { BrowserRouter, Switch, Route, Redirect} from "react-router-dom"

import AuthenticatedRoute from "../shared/routes/AuthenticatedRoute/AuthenticatedRoute"
import UnauthenticatedRoute from "../shared/routes/UnauthenticatedRoute/UnauthenticatedRoute"
import AuthLayout from "../core/layouts/AuthLayout/AuthLayout"
import LandingPage from "../pages/LandingPage/LandingPage"
import LoginPage from "../pages/LoginPage/LoginPage"
import SignupPage from "../pages/SigupPage/SignupPage"
import CreateLoadProfilePage from "../pages/CreateProfile/CreateProfile"

const IndexRouter: FC = () => (
  <BrowserRouter>
    <Switch>
      <AuthenticatedRoute path="/dashboard" component={LandingPage} />
      
      <AuthenticatedRoute path="/projects/:id" component={LandingPage} />

      <AuthenticatedRoute path="/load-profile/new" component={CreateLoadProfilePage} />
      <Route path="/auth" component={AuthLayout} />

      <UnauthenticatedRoute path="/login" component={LoginPage} />
      <UnauthenticatedRoute path="/register" component={SignupPage} />

      <Redirect from="" to="/login" />
    </Switch>
  </BrowserRouter>
)

export default IndexRouter
