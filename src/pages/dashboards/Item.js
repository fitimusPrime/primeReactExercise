import React from 'react'
import { Card, CardContent, CardActions, Typography, Button, Fab } from '@material-ui/core';
import DeleteDashboard from './Delete'
import EditDashboard from './Modal'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { switchTheme } from 'reducers/theme/ThemeActions'
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { MoreVert, Create, DeleteOutlined } from '@material-ui/icons';
const styles = ({ size, palette }) => ({
    root: {
        color: '#333',
        height: '100%',
        backgroundColor: '#fff'
    },
    buttons: {
        textTransform: 'none',
        '&, &:active': {
            boxShadow: 'none',
        },
        '& p': {
            padding: `0 ${size.spacing * 1.5}px`,
        }
    },
    menuWrapper: {
        position: 'absolute',
        right: 0,
        top: 0
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
        return (
            <Card className={classes.root}>
                <div className={classes.menuWrapper}>
                    <IconButton
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
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {dashboard.children && dashboard.children.length > 0 ? `${dashboard.children.length} Children` : ''}
                        {bull}

                    </Typography>
                    <Typography variant="h4" component="h2">
                        {dashboard.name}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {dashboard.text}
                    </Typography>
                </CardContent>
                {(dashboard.children && dashboard.children.length) && <CardActions>{

                    dashboard.children.map(next =>
                        <Fab
                            key={next.id}
                            className={classes.buttons}
                            variant="extended"
                            size="small"
                            aria-label="Add"
                        >
                            <Typography>{next.name}</Typography>
                        </Fab>
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