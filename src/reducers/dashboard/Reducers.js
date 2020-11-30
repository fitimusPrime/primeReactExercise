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
            let foundDashboard = getFlattenDashboards(state, true).find(next => next.id == action.id)
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

export const generateBreadcrumps = (state) => {
    let breadcrumps = []
    const flat = getFlattenDashboards(state)
    console.log(flat)
    let findParent = (dashboardId) => {
        const found = flat.find(x => x.id === dashboardId)
        if (found && found.parent)
            findParent(found.parent)
        breadcrumps = [...breadcrumps,found]
    }

    findParent(state.dashboard.id)
    return breadcrumps.filter(x => !!x) 
}
export const getFlattenDashboards = (state, keepChildren) => {
    if (state.dashboards && state.dashboards.length) {
        let generateHeritage = (array, item = {}) => {
            let parents = []
            const foundParent = array.find(x => x.id == item.parent)
            if (foundParent) {
                parents = [...generateHeritage(array, foundParent), foundParent.id]
            }
            else
                parents = [item.parent]
            return parents.filter(item => item !== null)
        }
        let flatten = (children, extractChildren, parent) => Array.prototype.concat.apply(
            children.map(x => ({ ...x, parent: parent || null })),
            children.map(x => flatten(extractChildren(x) || [], extractChildren, x.id))
        );
        let extractChildren = x => x.children;
        let flat = flatten(state.dashboards, extractChildren)
        if (!keepChildren)
            flat = flat.map(x => delete x.children && x)
        flat = flat.map((x, i, a) => ({ ...x, parents: generateHeritage(a, x) }));
        return flat
    }
    return []
}
export const generateTreeStructureFromFlat = (items = [], parent = null) => {
    const nested = []
    items.forEach((item) => {
        if (item.parent === parent) {
            const children = generateTreeStructureFromFlat(items, item.id)

            if (children.length) {
                item.children = children
            }

            nested.push(item)
        }
    })
    return nested
}
export const getFilteredDashboard = (state) => {
    // Credit https://repl.it/@amankkg/string-lookup-nested-objects-array#main.js
    const array = state.dashboard.dashboard.children
    const regExp = new RegExp(state.filter.text, 'i');
    if (array)
        return array.reduce((acc, x) => {
            const next = x.children.filter(child => child.name.match(regExp) || child.text.match(regExp));

            if (x.name.match(regExp) || x.text.match(regExp) || next.length > 0) {
                acc.push({ ...x, children: next });
            }

            return acc;
        }, []);
    return []
}
export const getFilteredDashboards = (state) => {
    const value = state.filter.text
    return state.dashboard.dashboards.filter((dashboard) => {
        return dashboard.name.toLowerCase().includes(value) ||
            dashboard.text.toLowerCase().includes(value);
    })
}