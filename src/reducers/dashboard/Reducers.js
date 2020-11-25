import ACTION_TYPES from 'reducers/dashboard/ActionsTypes'
import { randomDashboard, randomDashboards } from 'utils/DataGenerator'
import { deleteDashboard, addDashboard, updateDashboard } from 'utils/Utils'

const defaultState = {
    dashboards: [],
    dashboard: {},
    loading: false,
    invalidate: true,
}
export const dashboardReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ACTION_TYPES.REQUEST_DATA:
            return { ...state, loading: true }
        case ACTION_TYPES.RECEIVE_DATA:
            return { ...state, loading: false, invalidate: false, dashboards: action.data }
        case ACTION_TYPES.DELETE_DASHBOARD:
            return { ...state, loading: false, dashboards: deleteDashboard(state.dashboards, action.data) }
        case ACTION_TYPES.GET_DASHBOARD:
            let foundDashboard = state.dashboards.find(next => next.id == action.id)

            // A hack to always supply a dashboard
            // because rn i generate dashboards on Refresh
            // so the id is always changing
            if (!foundDashboard)
                foundDashboard = state.dashboards[0]
            return { ...state, loading: false, dashboard: { ...foundDashboard } }
        case ACTION_TYPES.UPDATE_DASHBOARD:
            const item = action.data
            console.log(action)
            return { ...state, dashboards: [...updateDashboard(state.dashboards, action.data)] }
            return state
        case ACTION_TYPES.ADD_DASHBOARD:
            const newDashboard = {
                ...randomDashboard(0),
                createdAt: new Date(), ...action.data
            }
            return { ...state, dashboards: addDashboard(state.dashboards, newDashboard) }
        default:
            return state;
    }
};
export async function fetchDashboards(dispatch, getState) {
    const { loading, invalidate, dashboards } = getState().dashboard
    const response = await new Promise((resolve, reject) => {
        if (!loading && invalidate) {
            dispatch({ type: ACTION_TYPES.REQUEST_DATA })
            setTimeout(() => {
                const newDashboards = randomDashboards()
                dispatch({ type: ACTION_TYPES.RECEIVE_DATA, data: newDashboards })
                // dispatch(receiveData())
                resolve(newDashboards)
            }, 1000)
        } else {
            resolve(dashboards)
        }
    })
    return response
    // return {}

}
export const getFlattenDashboards = (state) => {
    if (state.dashboard.dashboards.length) {
        let flatten = (children, extractChildren, parent) => Array.prototype.concat.apply(
            children.map(x => ({ ...x, parent: parent || null })),
            children.map(x => flatten(extractChildren(x) || [], extractChildren, x.id))
        );
        let extractChildren = x => x.children;
        let flat = flatten(state.dashboard.dashboards, extractChildren).map(x => delete x.children && x);
        return flat
    }
}
export const getFilteredDashboards = (state) => {
    const value = state.filter.text
    return state.dashboard.dashboards.filter((dashboard) => {
        return dashboard.name.toLowerCase().includes(value) ||
            dashboard.text.toLowerCase().includes(value);
    })
}