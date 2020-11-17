import {REQUEST_DATA,RECEIVE_DATA,DELETE_DASHBOARD,UPDATE_DASHBOARD,ADD_DASHBOARD} from 'reducers/dashboard/ActionsTypes'
import {randomDashboards} from 'utils/DataGenerator'

export const requestData = dashboards => {
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
export const addDashboard = (data) => {
    return {
        type: ADD_DASHBOARD,
        data
    }
}
export const getDashboards = () => {
    return (dispatch) =>{
        dispatch(requestData())
        return setTimeout(()=>{
            dispatch(receiveData(randomDashboards()))
        },1000)
    }
}