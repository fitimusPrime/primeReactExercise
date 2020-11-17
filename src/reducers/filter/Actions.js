import {CLEAR_FILTER,CHANGE_FILTER} from 'reducers/filter/ActionsTypes'

export const changeFilter = (text) => {
    return {
        type: CHANGE_FILTER,
        text
    }
}
export const clearFilter = (text) => {
    return {
        type: CLEAR_FILTER,
        text
    }
}