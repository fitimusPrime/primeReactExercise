import ACTION_TYPES from 'reducers/dashboard/ActionsTypes'
const defaultState = {
    dashboards: [],
    dashboard: {},
    loading: false,
}
// const posts = (state = [], action) => {
//     switch (action.type) {
//         case ACTION_TYPES.REQUEST_DATA:
//             return action.data
//         case ACTION_TYPES.RECEIVE_DATA:
//             return action.data
//         case ACTION_TYPES.DELETE_POST:
//             return state.filter(next => next.id !== action.item.id)
//         case ACTION_TYPES.UPDATE_POST:
//             const item = action.item
//             const found = state.find(next => next.id === item.id)
//             if (!found) {
//                 return [...state, item]
//             }
//             return state.map(next => {
//                 if (next.id === item.id) {
//                     return item
//                 }
//                 return next
//             })
//         default:
//             return state;
//     }
// }
const dashboardReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ACTION_TYPES.REQUEST_DATA:
            return { ...state, loading: true }
        case ACTION_TYPES.RECEIVE_DATA:
            return { ...state, loading: false, dashboards: action.data }
        case ACTION_TYPES.DELETE_DASHBOARD:
            return { ...state, loading: false, dashboards: state.dashboards.filter(next => next.id !== action.data.id) }
            return state.filter(next => next.id !== action.item.id)
        case ACTION_TYPES.UPDATE_DASHBOARD:
            const item = action.data
            const found = state.dashboards.find(next => next.id === item.id)
            if (found) {
                return { ...state, dashboards: [...state.dashboards, item] }
            }
            return state
        default:
            return state;
    }
};

export default dashboardReducer