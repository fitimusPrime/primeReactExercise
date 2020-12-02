import React from 'react';
import Button from '@material-ui/core/Button';

import { BarChart, PieChart, TableChart, ShowChart, InsertPhoto, Note } from '@material-ui/icons';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { getDashboard } from 'reducers/dashboard/Actions'

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux'
import { addAttachment } from 'reducers/dashboard/Actions'
import { withStyles } from '@material-ui/core/styles';
const styles = ({ size, palette }) => ({
    root: {
        display: 'flex',
        position: 'absolute',
        bottom: size.spacing,
        right: size.spacing * 2,
    },
    fab: {
        position: 'relative',
        zIndex:2,
        backgroundColor: palette.leadColor,
        '&:hover': {

            backgroundColor: palette.leadAccent1,
        }
    },
    popper:{
        top:['auto','!important'],
        left:['auto','!important'],
        right: '50%',
        bottom: '50%',
    },
    paper: {
        marginRight: size.spacing * 2,
    },
});
class AttachmentMenu extends React.Component {
    state = {
        open: false,
    };
    handleToggle = () => {
        this.setState(state => ({ open: !state.open }));
    };

    handleClose = type => event => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }
        if(type){
            this.props.addAttachment(type)
            this.props.getDashboard(this.props.dashboard.id)
        }
        this.setState({ open: false });
    };
    render() {
        const { classes, dashboard } = this.props;
        const { open } = this.state;
        const TriggerButton = () => {
            return (
                <Fab className={classes.fab}
                    buttonRef={node => {
                        this.anchorEl = node;
                    }}
                    color="primary" aria-label="Add"
                    aria-owns={open ? 'menu-list-grow' : undefined}
                    className={classes.fab}
                    aria-haspopup="true"
                    onClick={this.handleToggle}>
                    <AddIcon />
                </Fab >
            )
        }
        return (
            <div className={classes.root}>
                <TriggerButton />
                <Popper open={open} anchorEl={this.anchorEl} placement="top-start" transition disablePortal className={classes.popper}>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            id="menu-list-grow"
                            style={{ transformOrigin: 'right bottom' }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={this.handleClose()}>
                                    <MenuList>
                                        <MenuItem onClick={this.handleClose('text')}><Note/> Note</MenuItem>
                                        <MenuItem onClick={this.handleClose('image')}><InsertPhoto/> Image</MenuItem>
                                        <MenuItem onClick={this.handleClose('line')}><ShowChart/> Line graph</MenuItem>
                                        <MenuItem onClick={this.handleClose('bar')}><BarChart/> Bar graph</MenuItem>
                                        <MenuItem onClick={this.handleClose('pie')}><PieChart/> Pie graph</MenuItem>
                                        <MenuItem onClick={this.handleClose('tree')}><TableChart/> Tree Map</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div >
        );
    }
}
const mapStateToProps = state => {
    return {
        dashboard: state.dashboard.dashboard,
    }
}
const mapDispatchToProps = {
    addAttachment,
    getDashboard
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AttachmentMenu))