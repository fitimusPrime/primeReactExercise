/**
 * Created by LeutrimNeziri on 30/03/2019.
 */
import React from 'react'
import classNames from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'
import Page from 'anatomy/Page'
import Header from 'anatomy/Header'
import LeftNav from 'anatomy/LeftNav'

const styles = ({ palette, size, typography, shadows ,spacing}) => ({
  '@global': {
    ol: {
      margin: `${size.spacing}px 0px`,
      width: '100%'
    },
    ul: {
      margin: `${size.spacing}px 0px`,
      width: '100%'
    },
    img: {
      boxShadow: shadows[3]
    }
  },
  appWrapper: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    width: '100%',
    height: '100%',
    maxHeight: '100%',
    overflow: 'hidden',
    paddingLeft: spacing.unit * 5 ,
  },
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'flex-start',
    alignContent: 'flex-start'
  },
  content: {
    width: '100%',
    alignItems: 'flex-start',
    flexFlow: 'row wrap',
    display: 'flex',
    alignContent: 'flex-start',
    flex: 1,
    overflowY: 'auto',
    padding: `${size.spacing * 2}px ${size.spacing * 4}px`
  },
  footer: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${size.spacing}px 0px`,
    fontSize: size.captionFontSize,
    color: palette.disabledColor,
    fontStyle: 'italic'
  }
})

class Content extends React.Component {
  state = {
    drawerOpen: false
  }
  static get defaultProps() {
    return {
      showHeader: true,
      title: ''
    }
  }
  handleDrawerOpen = (event) => {
    event.preventDefault()
    this.setState({ drawerOpen: true });
  };
  handleDrawerClose = (event) => {
    event.preventDefault()
    this.setState({ drawerOpen: false });
  };
  render() {
    const { handleDrawerOpen, handleDrawerClose } = this
    const { drawerOpen } = this.state
    const { classes, className: classNameProp, children, showHeader, breadcrumbs, ...other } = this.props
    const className = classNames(classes.root, classNameProp)
    return (
      <Page className={className} {...other}>
        <LeftNav open={drawerOpen} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} breadcrumbs={breadcrumbs} />
        <div className={classes.appWrapper}>
          {showHeader && <Header breadcrumbs={breadcrumbs} />}
          <div id={'content'} className={classes.content}>
            {children}
          </div>
          <div className={classes.footer}>
            Made by Fitim X Krasniqi
          </div>
        </div>
      </Page>
    )
  }
}

export default withStyles(styles)(Content)
