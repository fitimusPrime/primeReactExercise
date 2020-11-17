import React from 'react'
import 'react-resizable/css/styles.css'
import 'react-grid-layout/css/styles.css'
import Dashboard from './Item'
import NewDashboard from './Modal'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { generateResponsiveLayout } from 'utils/Utils'
import { getFilteredDashboards } from 'reducers/dashboard/Reducers'
import { getDashboards } from 'reducers/dashboard/Actions'
import { GET_DASHBOARDS, RECEIVE_DATA } from 'reducers/dashboard/ActionsTypes'
import { Responsive, WidthProvider } from 'react-grid-layout';
import Filters from 'presentations/Filter'

const styles = ({ size,palette }) => ({
    root: {
        width: '100%'
    },
    fab: {
        position: 'fixed',
        bottom: size.spacing,
        right: size.spacing * 2,
        backgroundColor: palette.leadColor,
        '&:hover':{
            
            backgroundColor: palette.leadAccent1,
        }
    },
    modal:{
        backgroundColor: palette.cardBg
    },
})
const ResponsiveGridLayout = WidthProvider(Responsive);
class DashboardLayout extends React.Component {
    componentDidMount() {
        this.props.getDashboards({ type: RECEIVE_DATA })
    }
    render() {
        const { theme, classes, dashboards, isLoading } = (this.props)
        const layoutBreakpoints = { lg: 12, md: 12, sm: 12, xs: 12 }
        return (<div className={classes.root}>
            <Filters />
            <ResponsiveGridLayout
                breakpoints={theme.breakpoints.values}
                className={classes.root}
                layouts={generateResponsiveLayout(layoutBreakpoints, dashboards)}
                cols={layoutBreakpoints}
                rowHeight={40}
            >
                {dashboards.map(next => <div key={next.id.toString()}><Dashboard key={next} dashboard={next} /></div>)}
            </ResponsiveGridLayout>
            <NewDashboard classes={classes} />
        </div>
        )
    }
}
const mapStateToProps = state => {
    console.log(state,getFilteredDashboards)
    return {
        dashboards: getFilteredDashboards(state),
        isLoading: state.dashboard.loading
    }
}
const mapDispatchToProps = {
    getDashboards
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(DashboardLayout))