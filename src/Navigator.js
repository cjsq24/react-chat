import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PublicRoute from './components/PublicRoute'
import PrivateRoute from './components/PrivateRoute'

import Login from './views/login/Login'
import Register from './views/register/Register'
import Dashboard from './views/dashboard/Dashboard'
import Chat from './views/chat/Chat'

export default function Navigator() {
   return (
      <Router>
         <Switch>
            <PublicRoute path='/login' component={Login} />
            <PublicRoute path='/register' component={Register} />
            <PrivateRoute path='/dashboard' component={Dashboard} />
            <PrivateRoute path='/chat/:userToId' component={Chat} />
            <PrivateRoute path='/chat' component={Chat} />
            <PrivateRoute exact path='/' component={Dashboard} />
            <Route path='*'>
               <h1>Error 404</h1>
            </Route>
         </Switch>
      </Router>
   );
}