import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import MenuItem from '@material-ui/core/MenuItem';
import { Create } from '@material-ui/icons';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { connect } from 'react-redux'
import { updateDashboard, addDashboard } from 'reducers/dashboard/Actions'
class DashboardModal extends React.Component {
    state = {
        open: false,
        item: {
            name: '',
            text: ''
        }
    };
    componentDidMount() {
        const { dashboard } = this.props
        if (dashboard)
            this.setState({ item: dashboard })
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };
    sumbit = () => {
        const { updateDashboard, addDashboard, dashboard } = this.props
        if (dashboard)
            updateDashboard(this.state.item)
        else
            addDashboard(this.state.item)
        this.handleClose()
    }
    handleClose = () => {
        const { closeMenu } = this.props
        if (closeMenu)
            closeMenu()
        this.setState({
            open: false,
             item: {
                name: '',
                text: ''
            }
        });
    };
    handleChange = name => event => {
        this.setState({
            ...this.state, item: {
                ...this.state.item,
                [name]: event.target.value,
            }

        });
    };
    render() {
        const { classes, dashboard } = this.props
        const TriggerButton = () => {
            if (dashboard) {
                return (<MenuItem className={classes.menuItem} onClick={this.handleClickOpen}><Create className={classes.menuIcon} /> Edit</MenuItem>)
            } else
                return (
                    <Fab className={classes.fab}
                        color="primary" aria-label="Add"
                        className={classes.fab}
                        onClick={this.handleClickOpen} >
                        <AddIcon />
                    </Fab >
                )
        }
        return (
            <div>
                <TriggerButton />
                <Dialog
                classes={{
                    paper: classes.modal
                }}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title" className={classes.colors}>Create new project</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            value={this.state.item.name}
                            onChange={this.handleChange('name')}
                            variant="outlined"
                            fullWidth
                        />
                        <TextField
                            label="Description"
                            multiline
                            rows="4"
                            value={this.state.item.text}
                            onChange={this.handleChange('text')}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
            </Button>
                        <Button onClick={this.sumbit} color="primary" variant="contained">
                            Save
            </Button>
                    </DialogActions>
                </Dialog>
            </div >
        );
    }
}
const mapStateToProps = state => {
    return {}
}
const mapDispatchToProps = {
    updateDashboard,
    addDashboard
}
export default connect(mapStateToProps, mapDispatchToProps)(DashboardModal)