import _ from 'underscore'
export const generateResponsiveLayout = (breakpoints, length) => {
    const layout = {

    }
    _.each(breakpoints, (value, breakpoint) => {
        let columnsPerRow = 3
        let row = 0
        let width = value/(columnsPerRow%value) 
        let height = 4
        switch (breakpoint) {
            case 'lg':
                columnsPerRow = 4
                width = value/(columnsPerRow%value) 
                row = 0
                break;
            case 'md':
                columnsPerRow = 3
                width = value/(columnsPerRow%value) 
                row = 0
                break;
            case 'sm':
                columnsPerRow = 2
                width = value/(columnsPerRow%value) 
                row = 0
                break;
            case 'xs':
                columnsPerRow = 1
                width = value/(columnsPerRow%value) 
                row = 0
                break;
        }
        return layout[breakpoint] = length.map((next, index) => {
            const skip = index * width % value
            if (skip+width === value)
                row++
            return {i:next.id.toString(), w: width, h: height, x: skip, y: row * height, minH: 4,minW:width }
        })
    })
    return layout
    console.log(window.innerWidth, breakpoints)
}