import { REQUEST_DATA, RECEIVE_DATA, DELETE_DASHBOARD, UPDATE_DASHBOARD, ADD_DASHBOARD,GET_DASHBOARD } from 'reducers/dashboard/ActionsTypes'
import { randomDashboards } from 'utils/DataGenerator'

export const requestData = () => {
    return {
        type: REQUEST_DATA,
    }
}
export const receiveData = (data) => {
    return {
        type: RECEIVE_DATA,
        data
    }
}
export const deleteDashboard = (data) => {
    return {
        type: DELETE_DASHBOARD,
        data
    }
}
export const updateDashboard = (data) => {
    return {
        type: UPDATE_DASHBOARD,
        data
    }
}
export const getDashboard = (id) => {
    return {
        type: GET_DASHBOARD,
        id
    }
}
export const addDashboard = (data) => {
    return {
        type: ADD_DASHBOARD,
        data
    }
}
export const fetchDashboard = (postId) => {
    return  (dispatch, getState) => {
        // const response  = await jsonPlaceholder.get('/posts');
        // new Promise((resolve, reject) => {
            // dispatch({ type: REQUEST_DATA })
            dispatch(requestData())
            return setTimeout(() => {
               dispatch({ type: GET_DASHBOARD, id: postId })
                // dispatch(receiveData())
                // resolve(postId)
            }, 1000)
        // })
        // return {
        //     type: GET_DASHBOARD,
        //     data
        // }
    }
};
export const getDashboards = () => {
    return (dispatch) => {
        dispatch(requestData())
        return setTimeout(() => {
            dispatch(receiveData(randomDashboards()))
        }, 1000)
    }
}