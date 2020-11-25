import _, { map } from 'underscore'
const looper = (list, fn, item) => {
    return list.map((next, index) => {
        if (next && next.children && next.children.length > 0) {
            next.children = looper([...next.children], fn, item)
        }
        return fn(list, item, next)
    }).filter(item => item !== undefined)
}
export const deleteDashboard = (list, item) => {
    return looper([...list], deleteDashboardCheck, item)
}
export const deleteDashboardCheck = (list, item, next) => {
    if (next.id === item.id) {
        return undefined
    }
    return next
}
export const addDashboardCheck = (list, item, next) => {
    if (next.id === item.parent) {
        next.children = [...next.children, item]
    }
    return next
}
export const addDashboard = (list, item) => {
    if (item.parent)
        return looper([...list], addDashboardCheck, item)
    else[...list, item]
}
export const updateDashboard = (list, item) => {
    return looper([...list], updateDashboardCheck, item)
}
export const updateDashboardCheck = (list, item, next) => {
    if (next.id === item.id) {
        console.log(item)
        return { ...item }
    }
    return next

}
export const generateResponsiveLayout = (breakpoints, length) => {

    const layout = {

    }
    _.each(breakpoints, (value, breakpoint) => {
        let columnsPerRow = 3
        let row = 0
        let width = value / (columnsPerRow % value)
        let height = 4
        switch (breakpoint) {
            case 'lg':
                columnsPerRow = 4
                width = value / (columnsPerRow % value)
                row = 0
                break;
            case 'md':
                columnsPerRow = 3
                width = value / (columnsPerRow % value)
                row = 0
                break;
            case 'sm':
                columnsPerRow = 2
                width = value / (columnsPerRow % value)
                row = 0
                break;
            case 'xs':
                columnsPerRow = 1
                width = value / (columnsPerRow % value)
                row = 0
                break;
        }
        return layout[breakpoint] = length.map((next, index) => {
            const skip = index * width % value
            if (skip + width === value)
                row++
            return { i: index.toString(), w: width, h: height, x: skip, y: row * height, minH: 4, minW: width }
        })
    })
    return layout
    console.log(window.innerWidth, breakpoints)
}