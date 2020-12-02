import React from 'react'
import { Card, CardContent, CardActions, Typography, Button, Fab } from '@material-ui/core';
import DeleteDashboard from '../dashboards/Delete'
import EditDashboard from './Modal'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { getDashboard } from 'reducers/dashboard/Actions'
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import moment from 'moment';
import Tooltip from '@material-ui/core/Tooltip';
import { MoreVert, Create, DeleteOutlined } from '@material-ui/icons';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { pxToRem } from 'utils/size'
import TextTruncate from 'react-text-truncate';
import {Link} from 'react-router-dom'

const styles = ({ size, palette, typography }) => ({
    root: {
        color: '#333',
        height: 'auto',
        backgroundColor: palette.cardBg,
        position: 'relative',
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        marginBottom: size.spacing * 2,
        width:'100%',
    },
    formControl: {
        marginTop: size.spacing * 1.5,
        marginBottom: size.spacing * 1.5,
        width:'100%',
        minWidth: 120,
      },
    buttons: {
        textTransform: 'none',
        backgroundColor: palette.buttonBg,
        border: '1px solid',
        borderColor: palette.buttonBorder,
        '&:hover': {
            backgroundColor: fade(palette.buttonBg, 0.8),
        },
        '&, &:active': {
            boxShadow: 'none',
        },
        '& p': {
            padding: `0 ${size.spacing * 1.5}px`,
            color: palette.buttonText,
            fontSize: size.defaultFontSize,
        }
    },
    link:{
        textDecoration: 'none',
        color: 'inherit'
    },
    cardContent: {
        width: 'calc( 100% - 160px)',
        display: 'flex',
        alignItems: 'center',
        '&,&:last-child': {
            padding: size.spacing * 2
        }
    },
    title: {
        fontSize: pxToRem(size.smallFontSize),
        fontWeight: typography.weight.black,
        marginBottom: 0,
        color: palette.textColor,
        flexShrink: 0

    },
    content: {
        fontSize: pxToRem(size.smallFontSize),
        fontWeight: typography.weight.regular,
        marginBottom: 0,
        color: palette.textColor,
        marginLeft: size.spacing * 2

    },
    text: {
        color: palette.textColor,
        minHeight: 40
    },
    colors: {
        color: palette.textColor,
        '&>*': {
            color: 'inherit'
        }
    },
    menuWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
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
    bullet: {
        color: palette.textColor,
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
})
class DashboardItem extends React.Component {
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
    render() {
        const { anchorEl } = this.state;
        const { classes, dashboard } = (this.props)
        const bull = <span className={classes.bullet}>•</span>;
        const time = <Tooltip title={moment(dashboard.createdAt).format('DD.MM.YYYY HH:mm')}><span>{moment(dashboard.createdAt).fromNow()}</span></Tooltip>
        return (
            <Card className={classes.root}>
                <div className={classes.menuWrapper}>
                <Typography variant="inherit" noWrap className={classes.content}>
                            {time}
                        </Typography>
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
                        <EditDashboard classes={classes} dashboard={dashboard} closeMenu={this.handleClose} />
                        <DeleteDashboard classes={classes} dashboard={dashboard} closeMenu={this.handleClose} />
                    </Menu>
                    </div>
                </div>
                <CardContent className={classes.cardContent}>
                    <Tooltip title={dashboard.name} aria-label={dashboard.name}>
                        <Typography variant="h4" component="h2" noWrap className={classes.title}>
                            
                            <Link className={classes.link} to={`/lecture/${dashboard.id}`}>{dashboard.name}</Link>
                        </Typography>
                    </Tooltip>
                    <Tooltip title={dashboard.text} aria-label={dashboard.text}>
                        <Typography noWrap className={classes.content}>
                            {dashboard.text}
                        </Typography>
                    </Tooltip>
                </CardContent>
            </Card>
        )
    }
}
const mapStateToProps = state => {
    return {
        isDark: state.theme.dark
    }
}
const mapDispatchToProps = {
    getDashboard
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DashboardItem))