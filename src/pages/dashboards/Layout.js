import React from 'react'
import 'react-resizable/css/styles.css'
import 'react-grid-layout/css/styles.css'
import Dashboard from './Item' 
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { generateResponsiveLayout } from 'utils/Utils'
import { getDashboards } from 'reducers/dashboard/Actions'
import { GET_DASHBOARDS,RECEIVE_DATA } from 'reducers/dashboard/ActionsTypes'
import { Responsive, WidthProvider } from 'react-grid-layout';
const styles = {
    root: {
        width: '100%'
    }
}
const ResponsiveGridLayout = WidthProvider(Responsive);
class DashboardLayout extends React.Component {
    componentDidMount(){
        this.props.getDashboards({type:RECEIVE_DATA})
    }
    render() {
        const { theme, classes,getDashboards,dashboards,isLoading } = (this.props)
        console.log(dashboards,isLoading)
        const dashboardsList = [
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
        return (
            <ResponsiveGridLayout
                breakpoints={theme.breakpoints.values}
                className={classes.root}
                layouts={generateResponsiveLayout(layoutBreakpoints, dashboards)}
                cols={layoutBreakpoints}
                rowHeight={40}
            >
                {dashboards.map(next => <div key={next.id.toString()}><Dashboard key={next} dashboard={next}/></div>)}
            </ResponsiveGridLayout>
        )
    }
}
const mapStateToProps = state => {
    console.log(state)
    return {
        dashboards:state.dashboard.dashboards,
        isLoading: state.dashboard.loading
    }
}
const mapDispatchToProps = {
    getDashboards
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(DashboardLayout))