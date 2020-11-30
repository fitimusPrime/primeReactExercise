import React from 'react'
import 'react-resizable/css/styles.css'
import 'react-grid-layout/css/styles.css'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import NewDashboard from './Modal'
import { fade } from '@material-ui/core/styles/colorManipulator';
import { getFilteredDashboard } from 'reducers/dashboard/Reducers'
import { fetchDashboard, getDashboard } from 'reducers/dashboard/Actions'
import Item from './Item'
import Filters from 'presentations/Filter'
import Skeleton from 'presentations/Skeleton'
import Attachments from './AttachmentsLayout'

const styles = ({ size, palette }) => ({
    root: {
        width: '100%'
    },
    formControl: {
        marginTop: size.spacing * 1.5,
        marginBottom: size.spacing * 1.5,
        width:'100%',
        minWidth: 120,
      },
    layout:{
        paddingTop: size.spacing * 2
    },
    childItem: {
        marginBottom: size.spacing * 2,
    },
    fab: {
        zIndex: 2,
        position: 'fixed',
        bottom: size.spacing,
        right: size.spacing * 2,
        backgroundColor: palette.leadColor,
        '&:hover': {

            backgroundColor: palette.leadAccent1,
        }
    },
    skeletonWrapper: {
        paddingLeft: size.spacing
    },
    modal: {
        backgroundColor: palette.cardBg
    },
})
class DashboardLayout extends React.Component {
    componentDidMount() {
        // console.log(this.props.fetchDashboards({ type: RECEIVE_DATA }))
        // this.props.getDashboards({ type: RECEIVE_DATA })
    }
    handleClose = () => {
        this.props.getDashboard(this.props.dashboard.id)
    };
    processChildren = (child, depth) => {

        const { classes, theme: { size = {} } } = (this.props)
        const children = child.children || []
        depth++
        return (<div key={child.id} className={classes.childItem} style={{ paddingLeft: depth * size.spacing }}><Item dashboard={child} />
            { children && children.length > 0 &&
                children.map((next) => this.processChildren(next, depth))}
        </div>
        )
    }
    render() {
        const { theme: { size = {} }, classes, dashboard, dashboardList, isLoading } = (this.props)
        const { children } = dashboard
        return (<div className={classes.root}>
            <Filters />
            <NewDashboard classes={classes} closeMenu={this.handleClose} />
            <div className={classes.layout}>
                {isLoading && Array(6).fill(null).map((next, index) => <div key={index} className={classes.skeletonWrapper}><Skeleton height={56} bottom={size.spacing * 2} /></div>)}
                {!isLoading && dashboardList && dashboardList.length > 0 && <div>
                    {dashboardList.map((next) => this.processChildren(next, 0))}
                </div>}
            </div>
            <Attachments dashboard={dashboard}/>
        </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        dashboardList: getFilteredDashboard(state),
        dashboard: state.dashboard.dashboard,
        isLoading: state.dashboard.loading
    }
}
const mapDispatchToProps = {
    fetchDashboard,
    getDashboard
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(DashboardLayout))