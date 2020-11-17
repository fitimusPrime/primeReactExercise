import {applyMiddleware, combineReducers, createStore} from "redux"
import {routerMiddleware, routerReducer} from "react-router-redux"
import createBrowserHistory from 'history/createBrowserHistory'
import middlewares from 'MiddleWares'

import users from 'reducers/users/Users'
import todo from 'reducers/todo/Todo'
import posts from 'reducers/posts/Posts'
import {dashboardReducer as dashboard} from 'reducers/dashboard/Reducers'
import theme from 'reducers/theme/Theme'
import filter from 'reducers/filter/Reducers'


// its running under a process, then create browser history
const history = createBrowserHistory({
  basename: BASE_URL
})

console.log('process.env.NODE_ENV', process.env.NODE_ENV)

const reducers = combineReducers({
  routing: routerReducer,
  users,
  todo,
  posts,
  dashboard,
  filter,
  theme
})

const store = createStore(reducers, applyMiddleware(...middlewares))
/**
 * The browsing history
 */
export {
  history
}
// export const history = syncHistoryWithStore(history, store)
/**
 * The redux store which combines all the reducers
 */
export default store