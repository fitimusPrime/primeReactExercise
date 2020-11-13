import ACTION_TYPES from 'reducers/theme/ThemeActionsTypes'
const defaultState = {
    dark: !!window.localStorage.getItem('darkTheme')
}

const toggleTheme = (state = defaultState, action) => {
    switch (action.type) {
        case ACTION_TYPES.SWITCH_THEME:
            if (!state.dark) {
                window.localStorage.setItem('darkTheme', true);
                return {
                    ...state,
                    dark: true
                }
            } else {
                window.localStorage.removeItem('darkTheme');
                return {
                    ...state,
                    dark: false
                }
            }
        default:
            return state;
    }
};

export default toggleTheme