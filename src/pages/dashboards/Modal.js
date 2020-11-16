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


import { connect } from 'react-redux'
import { updateDashboard } from 'reducers/dashboard/Actions'

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
        this.props.updateDashboard(this.state.item)
        this.handleClose()
    }
    handleClose = () => {
        this.props.closeMenu()
        this.setState({ open: false });
    };
    handleChange = name => event => {
        console.log(name)
        this.setState({
            ...this.state, item: {
                ...this.state.item,
                [name]: event.target.value,
            }

        });
    };
    render() {
        const { classes, dashboard } = this.props

        return (
            <div>
                <MenuItem className={classes.menuItem} onClick={this.handleClickOpen}><Create className={classes.menuIcon} /> Edit</MenuItem>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Create new project</DialogTitle>
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
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {}
}
const mapDispatchToProps = {
    updateDashboard
}
export default connect(mapStateToProps, mapDispatchToProps)(DashboardModal)