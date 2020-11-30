import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { getFlattenDashboards, generateTreeStructureFromFlat } from 'reducers/dashboard/Reducers'
import MenuItem from '@material-ui/core/MenuItem';
import { Create } from '@material-ui/icons';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux'
import { updateDashboard, addDashboard, deleteDashboard } from 'reducers/dashboard/Actions'
class DashboardModal extends React.Component {
    state = {
        open: false,
        selectLabel: 0,
        item: {
            name: '',
            text: '',
            parent: ''
        }
    };
    componentDidMount() {
        const { dashboard, flatDashboards } = this.props
        if (dashboard)
            this.setState({ item: {...flatDashboards.find(e => e.id === dashboard.id)} })

    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };
    sumbit = () => {
        const { updateDashboard, addDashboard, dashboard, flatDashboards,deleteDashboard } = this.props
        const { item } = this.state
        const ogDashboard = flatDashboards.find(e => e.id === dashboard.id)
        if (dashboard) {// its an Edit
            if (item.parent !== ogDashboard.parent) {//parent has changed, so we have to move it
                deleteDashboard(item)
                addDashboard(item)
            } else {
                updateDashboard(item)
            }
        }
        else {
            addDashboard(item)
        }
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
                parent: '',
                text: ''
            }
        });
    };
    handleSelectChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    handleChange = name => event => {
        console.log(name, event)
        this.setState({
            ...this.state, item: {
                ...this.state.item,
                [name]: event.target.value,
            }

        });
    };
    render() {
        const { classes, dashboard, flatDashboards } = this.props
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
        let SelectOptions = [...flatDashboards]
        if (dashboard && flatDashboards && flatDashboards.length)
            SelectOptions = [...flatDashboards.filter(x => (!x.parents.includes(dashboard.id) && x.parent !== dashboard.id))]
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
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel
                                ref={ref => {
                                    this.InputLabelRef = ref;
                                }}
                                htmlFor="outlined-age-simple"
                            >
                                Parent
                            </InputLabel>
                            <Select
                                variant="outlined"
                                value={this.state.item.parent}
                                onChange={this.handleChange('parent')}
                                input={
                                    <OutlinedInput
                                        labelWidth={50}
                                        name="parent"
                                        id="parent-select"
                                    />
                                }
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {(SelectOptions && SelectOptions.length > 0 &&
                                    SelectOptions.map(next => <MenuItem key={next.id} value={next.id}>{next.name}</MenuItem>))}
                            </Select>
                        </FormControl>
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
    return {
        flatDashboards: getFlattenDashboards(state.dashboard),
    }
}
const mapDispatchToProps = {
    updateDashboard,
    addDashboard,
    deleteDashboard
}
export default connect(mapStateToProps, mapDispatchToProps)(DashboardModal)