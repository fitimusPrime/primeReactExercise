import React from 'react'
import 'react-resizable/css/styles.css'
import 'react-grid-layout/css/styles.css'
import Item from './Attachments/Item'
import NewDashboard from './Modal'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { generateResponsiveLayout } from 'utils/Utils'
import { getFilteredDashboards } from 'reducers/dashboard/Reducers'
import { fade } from '@material-ui/core/styles/colorManipulator';
import { getDashboards } from 'reducers/dashboard/Actions'
import {fetchDashboards} from 'reducers/dashboard/Reducers'
import { Responsive, WidthProvider } from 'react-grid-layout';

const styles = ({ size, palette }) => ({
    root: {
        width: '100%'
    },
    fab: {
        position: 'fixed',
        bottom: size.spacing,
        right: size.spacing * 2,
        backgroundColor: palette.leadColor,
        '&:hover': {

            backgroundColor: palette.leadAccent1,
        }
    },
    '@keyframes shine': {
        to: { backgroundPosition: 'right -40px top 0' }
    },
    skeleton: {
        backgroundColor:  fade(palette.cardBg, 0.5),
        backgroundImage: `linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0))`,
        backgroundSize: '40px 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left -40px top 0',
        animation: 'shine 1s ease infinite',
        borderRadius:4,
        boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)'
    },

    modal: {
        backgroundColor: palette.cardBg
    },
})
const ResponsiveGridLayout = WidthProvider(Responsive);
class DashboardLayout extends React.Component {
    componentDidMount() {
        // console.log(this.props.fetchDashboards({ type: RECEIVE_DATA }))
        // this.props.getDashboards({ type: RECEIVE_DATA })
    }
    render() {
        const { theme, classes, dashboard:{attachments = []}, isLoading } = (this.props)
        const Skeleton = Array(6).fill(null).map((next, index) => <div key={index} className={classes.skeleton}></div>)
        const dashboardsLength = attachments.length?attachments:Array(6).fill(null)
        const layoutBreakpoints = { lg: 12, md: 12, sm: 12, xs: 12 }
        const layoutProperites = generateResponsiveLayout(layoutBreakpoints, dashboardsLength)
        return (<div className={classes.root}>
            <ResponsiveGridLayout
                breakpoints={theme.breakpoints.values}
                className={classes.root}
                isResizable={false}
                isDraggable={!isLoading}
                layouts={layoutProperites}
                cols={layoutBreakpoints}
                rowHeight={60}
            >
                {/* {Skeleton} */}
                {isLoading?Skeleton:attachments.map((next,index) => <div key={index.toString()}><Item key={next.id + index} attachment={next} /></div>)}
            </ResponsiveGridLayout>
            <NewDashboard classes={classes} />
        </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        dashboard: state.dashboard.dashboard,
        isLoading: state.dashboard.loading
    }
}
const mapDispatchToProps = {
    fetchDashboards
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(DashboardLayout))