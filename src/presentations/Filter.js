/**
 * Created by LeutrimNeziri on 28/02/2019.
 */
import React from 'react'
import classNames from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux'
import { fade } from '@material-ui/core/styles/colorManipulator';
import { changeFilter,clearFilter } from 'reducers/filter/Actions'
import { InputAdornment, IconButton } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
const styles = ({ palette, size, breakpoints, transitions }) => ({
    root: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        alignItems: 'flex-start',
    },
    search: {
        position: 'relative',
        borderRadius: size.baseRadius,
        backgroundColor: palette.searchBg,
        '&:hover': {
            backgroundColor: fade(palette.searchBg, 0.8),
        },
        marginRight: size.spacing * 2,
        marginLeft: 0,
        width: '100%',
        [breakpoints.up('sm')]: {
            marginLeft: size.spacing * 1.2,
            width: 'auto',
        },
    },
    clearButton: {
        padding: 0,
        marginRight: size.spacing,
        color: 'inherit'
    },
    clearButtonHide: {
        pointerEvents: 'none',
        opacity: 0,
        visibility: 'hidden'
    },
    searchIcon: {
        width: size.spacing * 5,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: size.spacing,
        paddingRight: size.spacing,
        paddingBottom: size.spacing,
        paddingLeft: size.spacing * 6,
        transition: transitions.common,
        width: '100%',
        [breakpoints.up('md')]: {
            width: 200,
        },
    },
})

class Filter extends React.Component {

    render() {
        const { className: classNameProp, classes, children, props, filter, changeFilter,clearFilter } = this.props
        const onChangeFilter = (e) => {
            changeFilter(e.target.value)
        }
        const className = classNames(
            classes.root,
            classNameProp
        )
        const clearButtonStyle = classNames(
            classes.clearButton,
            filter.length === 0 && classes.clearButtonHide
        )
        return (
            <div className={className} {...props}>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        type={'inputTypeSearch'}
                        value={filter}
                        onChange={onChangeFilter}
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    className={clearButtonStyle}
                                    aria-label="Toggle password visibility"
                                    onClick={clearFilter}
                                >
                                    <Clear />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        filter: state.filter.text
    }
}
const mapDispatchToProps = {
    changeFilter,
    clearFilter
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Filter))