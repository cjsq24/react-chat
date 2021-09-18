import { Route, Redirect } from 'react-router-dom';
import useAuth from '../auth/useAuth';
import Layout from '../containers/Layout';

export default function PrivateRoute({ component: Component, ...props }) {
   const auth = useAuth()

   return (
      <Route {...props}>
         {auth.isLogged() ? (
               <Layout>
                  <Component />
               </Layout>
            ) : (
               <Redirect to='/login' />
            )
         }
      </Route>
   );
}