import {SWITCH_THEME} from 'reducers/theme/ThemeActionsTypes'

export const switchTheme = theme => {
    return {
        type: SWITCH_THEME,
        theme
    }
}