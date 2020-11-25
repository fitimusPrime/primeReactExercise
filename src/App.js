/**
 * Created by LeutrimNeziri on 30/03/2019.
 */
import React, { Suspense } from 'react'
import 'assets/app.css'
import ThemeProvider from 'utils/ThemeProvider'
import {Route, Router, Switch} from 'react-router-dom'
import Factory from 'pages/Factory'
import {fetchDashboards} from 'reducers/dashboard/Reducers'
import store, { history } from 'Store'
import { Provider } from 'react-redux'
store.dispatch(fetchDashboards)
const App = ({children}) => {
  return (
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
          <ThemeProvider>
          <Router basename={BASE_URL} history={history}>
            <Switch>
                <Route  exact path="/lecture/:id/" component={() =>  <Factory/>}/>
                <Route path="/" component={Factory}/>
                {/* <Route path="/dashboard/:id/" component={DashboardOpen}/> */}
            </Switch>
            </Router>
          </ThemeProvider>
      </Suspense>
    </Provider>
  )
}

export default App
