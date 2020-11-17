import ACTION_TYPES from 'reducers/filter/ActionsTypes'
const defaultState = {
    text: ''
}
const filterReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ACTION_TYPES.CHANGE_FILTER:
            console.log(action.text)
            return { ...state, text: action.text }
        case ACTION_TYPES.CLEAR_FILTER:
            return { ...state, text: '' }
        default:
            return state;
    }
};

export default filterReducer