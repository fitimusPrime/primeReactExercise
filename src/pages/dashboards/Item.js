import React from 'react'
import { Card, CardContent, CardActions, Typography, Button, Fab } from '@material-ui/core';
import DeleteDashboard from './Delete'
import EditDashboard from './Modal'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { switchTheme } from 'reducers/theme/ThemeActions'
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import moment from 'moment';
import Tooltip from '@material-ui/core/Tooltip';
import { MoreVert, Create, DeleteOutlined } from '@material-ui/icons';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { pxToRem } from 'utils/size'
import TextTruncate from 'react-text-truncate';
import { Link } from 'react-router-dom'
const styles = ({ size, palette, typography }) => ({
    root: {
        color: '#333',
        height: '100%',
        backgroundColor: palette.cardBg
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
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
    title: {
        fontSize: pxToRem(size.titleFontSize),
        fontWeight: typography.weight.black,
        marginBottom: size.spacing,
        color: palette.textColor

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
        position: 'absolute',
        right: 0,
        top: 0
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
    dashboards: {

    }
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
    };
    render() {
        const { anchorEl } = this.state;
        const { classes, dashboard } = (this.props)
        const bull = <span className={classes.bullet}>•</span>;
        const time = <Tooltip title={moment(dashboard.createdAt).format('DD.MM.YYYY HH:mm')}><span>{moment(dashboard.createdAt).fromNow()}</span></Tooltip>
        return (
            <Card className={classes.root}>
                <div className={classes.menuWrapper}>
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
                <CardContent>
                    <Typography className={classes.colors} color="textSecondary" gutterBottom>
                        {dashboard.children && dashboard.children.length > 0 ? `${dashboard.children.length} Children` : ''}
                        {bull}
                        {time}
                    </Typography>
                    <Tooltip title={dashboard.name} aria-label={dashboard.name}>
                        <Typography variant="h4" component="h2" noWrap className={classes.title}>
                            <Link className={classes.link} to={`/lecture/${dashboard.id}`}>
                                {dashboard.name}
                            </Link>
                        </Typography>
                    </Tooltip>
                    <Typography className={classes.text} color="textSecondary">
                        <TextTruncate line={2}
                            element="span"
                            truncateText="…"
                            text={dashboard.text} />
                    </Typography>
                </CardContent>
                {(dashboard.children && dashboard.children.length > 0) && <CardActions>{

                    dashboard.children.map(next =>
                        <Tooltip key={next.id} title={next.name} aria-label={next.name}>
                            <Link className={classes.link} to={`/lecture/${next.id}`}>
                            <Fab
                                className={classes.buttons}
                                variant="extended"
                                size="small"
                                aria-label="Add"
                            >
                                <Typography noWrap>{next.name}</Typography>
                            </Fab>
                            </Link>
                        </Tooltip>
                    )
                }
                </CardActions>
                }
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
    switchTheme
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DashboardItem))