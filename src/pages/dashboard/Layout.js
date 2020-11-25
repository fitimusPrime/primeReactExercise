import React from 'react'
import 'react-resizable/css/styles.css'
import 'react-grid-layout/css/styles.css'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import NewDashboard from './Modal'
import { fade } from '@material-ui/core/styles/colorManipulator';
import { fetchDashboard, getDashboard } from 'reducers/dashboard/Actions'
import Item from './Item'

const styles = ({ size, palette }) => ({
    root: {
        width: '100%'
    },
    childItem: {
        marginBottom: size.spacing * 2,
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
        backgroundColor: fade(palette.cardBg, 0.5),
        backgroundImage: `linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0))`,
        backgroundSize: '40px 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left -40px top 0',
        animation: 'shine 1s ease infinite',
        borderRadius: 4,
        boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)'
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
        const { theme, classes, dashboard, flatDashboards, isLoading } = (this.props)
        const Skeleton = Array(6).fill(null).map((next, index) => <div key={index} className={classes.skeleton}></div>)
        const { children } = dashboard
        console.log(children)
        return (<div className={classes.root}>
            <NewDashboard classes={classes} closeMenu={this.handleClose} />
            the dashboard {isLoading ? 'is loading' : dashboard.name}
            {children && children.length > 0 && <div>
                {children.map((next) => this.processChildren(next, 0))}
            </div>}
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
    fetchDashboard,
    getDashboard
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(DashboardLayout))