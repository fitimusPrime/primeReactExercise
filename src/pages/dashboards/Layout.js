import React from 'react'
import 'react-resizable/css/styles.css'
import 'react-grid-layout/css/styles.css'
import Dashboard from './Item' 
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { generateResponsiveLayout } from 'utils/Utils'
import { switchTheme } from 'reducers/theme/ThemeActions'
import { Responsive, WidthProvider } from 'react-grid-layout';
const styles = {
    root: {
        width: '100%'
    }
}
const ResponsiveGridLayout = WidthProvider(Responsive);
class DashboardLayout extends React.Component {
    render() {
        const { theme, classes } = (this.props)
        const dashboards = [
            {
                id: 1,
                name: 'dashboard 1',
                text: 'lorem ipsum',
                children: [
                    {
                        id: 1,
                        name: 'child 1',
                        text: 'lorem ispum'
                    }
                ]
            },
            {
                id: 2,
                name: 'dashboard 2',
                text: 'lorem ipsum',
            },
            {
                id: 3,
                name: 'dashboard 3',
                text: 'lorem ipsum',
                children: [
                    {
                        id: 1,
                        name: 'child 1',
                        text: 'lorem ispum'
                    },
                    {
                        id: 2,
                        name: 'child 1',
                        text: 'lorem ispum'
                    },
                    {
                        id: 3,
                        name: 'child 1',
                        text: 'lorem ispum'
                    }
                ]
            },
            {
                id: 5,
                name: 'dashboard 5',
                text: 'lorem ipsum',
                children: [
                    {
                        id: 1,
                        name: 'child 1',
                        text: 'lorem ispum'
                    },
                    {
                        id: 2,
                        name: 'child 1',
                        text: 'lorem ispum'
                    },
                    {
                        id: 3,
                        name: 'child 1',
                        text: 'lorem ispum'
                    }
                ]
            },
            {
                id: 6,
                name: 'dashboard 6',
                text: 'lorem ipsum',
                children: [
                    {
                        id: 1,
                        name: 'child 1',
                        text: 'lorem ispum'
                    },
                    {
                        id: 2,
                        name: 'child 1',
                        text: 'lorem ispum'
                    },
                    {
                        id: 3,
                        name: 'child 1',
                        text: 'lorem ispum'
                    }
                ]
            },
            {
                id: 4,
                name: 'dashboard 4',
                text: 'lorem ipsum',
                children: [
                    {
                        id: 1,
                        name: 'child 1',
                        text: 'lorem ispum'
                    },
                    {
                        id: 2,
                        name: 'child 1',
                        text: 'lorem ispum'
                    },
                    {
                        id: 3,
                        name: 'child 1',
                        text: 'lorem ispum'
                    }
                ]
            },
        ]
        const layoutBreakpoints = { lg: 12, md: 12, sm: 12, xs: 12 }
        // layout is an array of objects, see the demo for more complete usage
        const layout = [
            { i: 'a', x: 0, y: 0, w: 3, h: 5 },
            { i: 'b', x: 3, y: 0, w: 3, h: 5 },
            { i: 'c', x: 6, y: 0, w: 3, h: 5 }
        ];
        let lay = {}
        const layouts = { "lg": [{ "w": 2, "h": 3, "x": 0, "y": 0, "i": "1", "minW": 2, "minH": 3, "moved": false, "static": false }, { "w": 2, "h": 3, "x": 2, "y": 0, "i": "2", "minW": 2, "minH": 3, "moved": false, "static": false }, { "w": 2, "h": 3, "x": 4, "y": 0, "i": "3", "minW": 2, "minH": 3, "moved": false, "static": false }, { "w": 2, "h": 3, "x": 8, "y": 0, "i": "4", "minW": 2, "minH": 3, "moved": false, "static": false }, { "w": 2, "h": 3, "x": 8, "y": 3, "i": "5", "minW": 2, "minH": 3, "moved": false, "static": false }], "md": [{ "w": 2, "h": 3, "x": 0, "y": 0, "i": "1", "minW": 2, "minH": 3, "moved": false, "static": false }, { "w": 2, "h": 3, "x": 2, "y": 0, "i": "2", "minW": 2, "minH": 3, "moved": false, "static": false }, { "w": 2, "h": 3, "x": 4, "y": 0, "i": "3", "minW": 2, "minH": 3, "moved": false, "static": false }, { "w": 2, "h": 3, "x": 8, "y": 0, "i": "4", "minW": 2, "minH": 3, "moved": false, "static": false }, { "w": 2, "h": 3, "x": 8, "y": 3, "i": "5", "minW": 2, "minH": 3, "moved": false, "static": false }], "sm": [{ "w": 2, "h": 3, "x": 2, "y": 0, "i": "1", "minW": 2, "minH": 3, "moved": false, "static": false }, { "w": 2, "h": 3, "x": 0, "y": 0, "i": "2", "minW": 2, "minH": 3, "moved": false, "static": false }, { "w": 2, "h": 3, "x": 4, "y": 0, "i": "3", "minW": 2, "minH": 3, "moved": false, "static": false }, { "w": 2, "h": 3, "x": 4, "y": 3, "i": "4", "minW": 2, "minH": 3, "moved": false, "static": false }, { "w": 2, "h": 3, "x": 4, "y": 6, "i": "5", "minW": 2, "minH": 3, "moved": false, "static": false }], "xs": [{ "w": 2, "h": 3, "x": 0, "y": 0, "i": "1", "minW": 2, "minH": 3, "moved": false, "static": false }, { "w": 2, "h": 3, "x": 2, "y": 0, "i": "2", "minW": 2, "minH": 3, "moved": false, "static": false }, { "w": 2, "h": 3, "x": 2, "y": 3, "i": "3", "minW": 2, "minH": 3, "moved": false, "static": false }, { "w": 2, "h": 3, "x": 2, "y": 6, "i": "4", "minW": 2, "minH": 3, "moved": false, "static": false }, { "w": 2, "h": 3, "x": 2, "y": 9, "i": "5", "minW": 2, "minH": 3, "moved": false, "static": false }] }
        console.log(generateResponsiveLayout(layoutBreakpoints, dashboards))
        return (
            <ResponsiveGridLayout
                breakpoints={theme.breakpoints.values}
                className={classes.root}
                layouts={generateResponsiveLayout(layoutBreakpoints, dashboards)}
                cols={layoutBreakpoints}
                rowHeight={40}
            >
                {dashboards.map(next => <div key={next.id.toString()}><Dashboard dashboard={next}/></div>)}
            </ResponsiveGridLayout>
        )
    }
}
const mapStateToProps = state => {
    return {
        isDark: state.theme.dark
    }
}
const mapDispatchToProps = {
    switchTheme
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(DashboardLayout))