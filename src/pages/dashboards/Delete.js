import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import { DeleteOutlined } from '@material-ui/icons';


import { connect } from 'react-redux'
import { deleteDashboard } from 'reducers/dashboard/Actions'

class DashboardDeleteDialog extends React.Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };
    deleteDashboard = () => {
        this.props.deleteDashboard(this.props.dashboard)
        this.handleClose()
    }
    handleClose = () => {
        this.props.closeMenu()
        this.setState({ open: false });
    };

    render() {
        const { classes, dashboard } = this.props
        return (
            <div>
                <MenuItem className={classes.menuItem} onClick={this.handleClickOpen}><DeleteOutlined className={classes.menuIcon} /> Delete</MenuItem>
                <Dialog
                    classes={{
                        paper: classes.modal
                    }}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle className={ classes.colors}>Delete {dashboard.name}?</DialogTitle>
                    <DialogContent>
                        <DialogContentText  className={ classes.colors}>
                            Are you sure you want to delete {dashboard.name}, once you delete all the children and content inside it will be deleted as well.
            </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="default">
                            Cancel
            </Button>
                        <Button onClick={this.deleteDashboard} color="secondary" autoFocus>
                            Delete
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {}
}
const mapDispatchToProps = {
    deleteDashboard
}
export default connect(mapStateToProps, mapDispatchToProps)(DashboardDeleteDialog)