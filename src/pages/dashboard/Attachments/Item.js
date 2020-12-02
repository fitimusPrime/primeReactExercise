import React from 'react'
import 'react-resizable/css/styles.css'
import 'react-grid-layout/css/styles.css'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { Card as MaterialCard } from '@material-ui/core';
import Typography from "presentations/Typography";
import { fade } from '@material-ui/core/styles/colorManipulator';
import { getFilteredDashboard } from 'reducers/dashboard/Reducers'
import { fetchDashboard, getDashboard } from 'reducers/dashboard/Actions'
import Skeleton from 'presentations/Skeleton'
import Chart from 'presentations/Chart'
import classNames from 'classnames'
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import DeleteDashboard from './Delete'
import { MoreVert, Create, DeleteOutlined } from '@material-ui/icons';
const styles = ({ size, palette }) => ({
    root: {
        width: '100%',
        height: '100%',
        position: 'relative'
    },
    menuWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position:'absolute',
        top: size.spacing,
        right: size.spacing,
        zIndex:1,
    },
    modal: {
        backgroundColor: palette.cardBg
    },
    menu: {
        '& ul': {
            padding: 0
        }
    },
    menuItem: {
        fontSize: size.captionFontSize,
        padding: `${size.spacing}px ${size.spacing * 2}px`,
    },
    menuIcon: {
        fontSize: size.defaultFontSize
    },
    formControl: {
        marginTop: size.spacing * 1.5,
        marginBottom: size.spacing * 1.5,
        width: '100%',
        minWidth: 120,
    },
    layout: {
        paddingTop: size.spacing * 2
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
    graphs: {
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        width: '100%'
    },
    title: {
        flexFlow: 'column'
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        objectFit: 'cover',
        width: '100%',
        height: '100%'
    },
    card: {
        backgroundColor: palette.cardBg,
        width: `100%`,
        height: '100%',
        padding: 8,
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'flex-start',
        position: 'relative'
    },
    cardYellow: {
        backgroundColor: palette.noteBg
    },
    text: {
        height: '100%',
        overflowY: 'auto'
    },
    graph: {
        display: 'flex',
        flex: 1,
        width: '100%',
        height: 'auto',
        minHeight: 200
    }
})
const Card = ({ options, title, titleClass, graphClass, attachment, imageClass, textClass, ...other }) => {
    const { type, data } = attachment
    const chartTypes = ['pie', 'line', 'tree', 'bar']
    const isChart = chartTypes.includes(type)
    const isImage = type === 'image'
    const isText = type === 'text'
    return <MaterialCard {...other}>
        <Typography variant={'title'} className={titleClass}>{title}</Typography>
        {isText && <Typography className={textClass}>{data}</Typography>}
        {isImage && <img className={imageClass} src={data} />}
        {isChart && <Chart className={graphClass} options={data} />}
    </MaterialCard>
}
const axisGraphDefaultOptions = {
    xAxis: {
        type: 'value'
    },
    yAxis: {
        type: 'value'
    }
}
const GRAPH_TYPES = {
    LINE: 'line',
    SCATTER: 'scatter',
    BAR: 'bar',
    PIE: 'pie',
    TREEMAP: 'treemap'
}
class AttachmentItem extends React.Component {
    /**
   * Returns given a length, an array that contains that many elements of the form
   * {
   *  name: 'Random Word',
   *  group: 'Random Group',
   *  value: 'Random Value'
   * }
   * @param {int} length
   * @param {boolean} positive = false
   */
    state = {
        anchorEl: null,
    };
    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
        this.props.getDashboard(this.props.dashboard.id)
    };
    componentDidMount() {
        // console.log(this.props.fetchDashboards({ type: RECEIVE_DATA }))
        // this.props.getDashboards({ type: RECEIVE_DATA })
    }
    render() {
        const { anchorEl } = this.state;
        const { theme: { size = {} }, classes, attachment } = (this.props)
        const { name, type } = attachment
        const isText = type === 'text'
        const cardProps = {
            titleClass: classes.title,
            className: classNames(classes.card, isText && classes.cardYellow),
            graphClass: classes.graph,
            imageClass: classes.image,
            textClass: classes.text,
            attachment
        }
        return (<div className={classes.root}>
            <div className={classes.menuWrapper}>
                <div>
                    <IconButton
                        className={classes.colors}
                        aria-label="More"
                        aria-owns={open ? 'long-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleClick}
                    >
                        <MoreVert />
                    </IconButton>
                    <Menu
                        className={classes.menu}
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleClose}
                    >
                        <DeleteDashboard classes={classes} attachment={attachment} closeMenu={this.handleClose} />
                    </Menu>
                </div>
            </div>
            <Card  {...cardProps} title={name} />
        </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        dashboard: state.dashboard.dashboard,
    }
}
const mapDispatchToProps = {
    getDashboard
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(AttachmentItem))