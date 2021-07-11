import { FC } from "react"
import { BrowserRouter, Switch, Route, Redirect} from "react-router-dom"

import AuthLayout from "../core/layouts/AuthLayout/AuthLayout"
import LandingPage from "../pages/LandingPage/LandingPage"
import LoginPage from "../pages/LoginPage/LoginPage"
import SignupPage from "../pages/SigupPage/SignupPage"

const IndexRouter: FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/dashboard" component={LandingPage} />
      <Route path="/auth" component={AuthLayout} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={SignupPage} />

      <Redirect from='' to='/login' />
    </Switch>
  </BrowserRouter>
)

export default IndexRouter
