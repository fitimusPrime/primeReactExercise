/**
 * Created by LeutrimNeziri on 30/03/2019.
 */
import React from 'react'
import classNames from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'
import IconButton from '@material-ui/core/IconButton'
import LeftNavPane from 'containers/LeftNavPane'
import Typography from 'presentations/Typography';
import Logo from 'presentations/icons/Logo'
import LogoTextIcon from 'presentations/icons/LogoTextIcon'
import { connect } from 'react-redux'
import { switchTheme } from 'reducers/theme/ThemeActions'
import Fade from '@material-ui/core/Fade'
import Drawer from '@material-ui/core/Drawer';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const drawerWidth = 240;
const styles = ({ size, zIndex, palette, spacing, transitions }) => ({
  root: {
    maxWidth: 320,
    width: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    flexFlow: 'column nowrap',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    transition: transitions.common,
    color: palette.textColorInverse,
    border: 'none'
  },
  leftNavHeader: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexFlow: 'row nowrap',
    height: 80,
    padding: size.spacing * 1.5,
    // borderBottom: `1px solid ${palette.borderColor}`
  },
  logo: {
    fontSize: size.avatarSize,
    padding: 0,
    marginRight: size.spacing * 2
  },
  logoText: {
    fontSize: size.spacing * 5,
    width: 'unset'
  },
  icon: {
    fontSize: size.headingFontSize,
    color: palette.textColorInverse,
    opacity: 0.7,
    '&$iconActive, &:hover': {
      opacity: 1
    }
  },
  iconActive: {},
  leftNavRoot: {
    // height: `calc(100% - 80px)`,
    // overflowY: 'overlay'
  },
  hide: {
    display: 'none',
  },
  drawer: {
    border: 'none',
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    backgroundColor: palette.bgColor,
    bottom: 0,
    top: 0,
    position: 'absolute'
  },
  drawerOpen: {
    width: drawerWidth,
    backgroundColor: palette.navBgColor,
    transition: transitions.common,
  },
  drawerClose: {
    border: 'none',
    transition: transitions.common,
    overflowX: 'hidden',
    width: spacing.unit * 9 + 1,
    backgroundColor: palette.bgColor,
  },
  iOSSwitchBase: {
    '&$iOSChecked': {
      color: palette.common.white,
      '& + $iOSBar': {
        backgroundColor: '#52d869',
      },
    },
    transition: transitions.common,
  },
  iOSChecked: {
    transform: 'translateX(15px)',
    '& + $iOSBar': {
      opacity: 1,
      border: 'none',
    },
  },
  iOSBar: {
    borderRadius: 13,
    width: 42,
    height: 26,
    marginTop: -13,
    marginLeft: -21,
    border: 'solid 1px',
    borderColor: palette.grey[400],
    backgroundColor: palette.grey[50],
    opacity: 1,
    transition: transitions.common,
  },
  iOSIcon: {
    width: 24,
    height: 24,
  },
  switchLabel:{
    color: palette.textColorInverse,
    margin:0
  },
})

class LeftNav extends React.Component {

  state = {
    active: '',
  }
  switchTheme = name => event => {
    this.props.swithTheme()
  };
  onNavClick = (which, event) => {
    event.preventDefault()
    this.setState({
      active: which
    })
  }

  onClose = event => {
    this.setState({ active: '' })
  }

  render() {
    const { className: classNameProp, classes, breadcrumbs, handleDrawerClose, handleDrawerOpen, isDark, open, switchTheme } = this.props
    const { active } = this.state
    const className = classNames(
      classes.root,
      classNameProp
    )
    return (
      <Drawer
        variant="permanent"
        className={classNames(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: classNames({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open}
        onMouseOver={handleDrawerOpen}
        onMouseLeave={handleDrawerClose}
      >
        <div className={className}>
          <div className={classes.leftNavHeader}>
            <IconButton
              color="inherit"
              className={classes.logo}
              onClick={event => this.onNavClick('', event)}>
              <Logo fontSize="inherit" />
            </IconButton>
            <LogoTextIcon className={classes.logoText} />
          </div>
          {/*Left Nav Pane*/}
          <Fade in={open}>
            <div>
              <LeftNavPane className={classes.leftNavRoot} drawerOpen={open} breadcrumbs={breadcrumbs} open={false} active={active} onClose={this.onClose} />
            </div>
          </Fade>
        </div>
        <Fade in={open}>
          <FormControlLabel
          
            control={
              <Switch
                classes={{
                  switchBase: classes.iOSSwitchBase,
                  bar: classes.iOSBar,
                  icon: classes.iOSIcon,
                  iconChecked: classes.iOSIconChecked,
                  checked: classes.iOSChecked,
                }}
                checked={isDark}
                onChange={switchTheme}
                value="checkedB"
              />
            }
            labelPlacement="top"
            label={<Typography className={classes.switchLabel}>Dark theme</Typography>}
          />
        </Fade>
      </Drawer>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LeftNav))
