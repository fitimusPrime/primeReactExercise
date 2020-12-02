import _, { map } from 'underscore'
const looper = (list, fn, item, attachment) => {
    return list.map((next, index) => {
        if (next && next.children && next.children.length > 0) {
            next.children = looper([...next.children], fn, item, attachment)
        }
        return fn(list, item, next, attachment)
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
    else return [...list, item]
}
export const updateDashboard = (list, item) => {
    return looper([...list], updateDashboardCheck, item)
}
export const updateDashboardCheck = (list, item, next) => {
    if (next.id === item.id) {
        return { ...item }
    }
    return next

}

export const addAttachmentCheck = (list, item, next, attachment) => {
    if (next.id === item.parent) {
        next.children = [...next.children.map(x => {
            if (x.id === item.id)
                x.attachments = [...x.attachments, attachment]
            return x
        })]
    }
    return next
}
export const addAttachment = (list, item, attachment) => {
    if (item.parent) {
        return looper([...list], addAttachmentCheck, item, attachment)

    }
    else
        return [...list.map(x => {
            if (x.id === item.id)
                x.attachments = [...x.attachments, attachment]
            return x
        })]

}

export const deleteAttachment = (list, item, attachment) => {
    return looper([...list], deleteAttachmentCheck, item, attachment)
}
export const deleteAttachmentCheck = (list, item, next, attachment) => {
    if (next.id === item.id) {
        return { ...next, attachments: next.attachments.filter(x => x.id !== attachment.id) }
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
}