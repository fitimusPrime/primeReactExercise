import ACTION_TYPES from 'reducers/dashboard/ActionsTypes'
import { randomDashboard } from 'utils/DataGenerator'
const defaultState = {
    dashboards: [],
    dashboard: {},
    loading: false,
}
export const dashboardReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ACTION_TYPES.REQUEST_DATA:
            return { ...state, loading: true }
        case ACTION_TYPES.RECEIVE_DATA:
            return { ...state, loading: false, dashboards: action.data }
        case ACTION_TYPES.DELETE_DASHBOARD:
            return { ...state, loading: false, dashboards: state.dashboards.filter(next => next.id !== action.data.id) }
        case ACTION_TYPES.UPDATE_DASHBOARD:
            const item = action.data
            const found = state.dashboards.find(next => next.id === item.id)
            if (found) {
                return { ...state, dashboards: [...state.dashboards, item] }
            }
            return state
        case ACTION_TYPES.ADD_DASHBOARD:
            const newDashboard = {
                ...randomDashboard(0),
                createdAt: new Date(), ...action.data
            }
            return { ...state, dashboards: [...state.dashboards, newDashboard] }
        default:
            return state;
    }
};
export const getFilteredDashboards = (state) => {
    const value = state.filter.text
    return state.dashboard.dashboards.filter((dashboard) => {
        return dashboard.name.toLowerCase().includes(value) ||
            dashboard.text.toLowerCase().includes(value);
    })
}