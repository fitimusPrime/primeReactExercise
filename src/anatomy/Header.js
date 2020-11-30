/**
 * Created by LeutrimNeziri on 30/03/2019.
 */
import GoPrimeHeader from 'presentations/Header';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import { PAGES } from "Constants";
import ArrowRight from 'presentations/icons/ArrowRight';
import React, { Fragment } from 'react';
import { generateBreadcrumps } from 'reducers/dashboard/Reducers'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import Skeleton from 'presentations/Skeleton'

const styles = ({ palette, size, transitions, typography }) => ({
  root: {
    padding: size.spacing * 4,
    alignItems: 'center'
  },
  skeleton: {
    width: 150
  },
  breadCrumbs: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 20
  },
  link: {
    ...typography.header,
    textDecoration: 'none',
    marginRight: size.spacing * 2,
    transition: transitions.common,
    '&:hover': {
      color: palette.leadColor
    }
  },
  activeLink: {
    color: palette.leadColor
  },
  icon: {
    marginRight: size.spacing * 2,
    width: size.spacing * 2,
    height: size.spacing * 2
  }
})

class Header extends React.Component {

  static get defaultProps() {
    return {}
  }

  createBreadCrumbs = (link, index) => {
    const { classes, breadcrumbs, breadcrumbsList } = this.props
    console.log(this)
    let last = index === breadcrumbsList.length - 1
    let url = link.id === PAGES.HOME ? '/' : `/lecture/${link.id}/`
    return <Fragment key={link.id + index}>
      {index !== 0 && <ArrowRight className={classes.icon} />}
      <Link className={classNames(classes.link, last && classes.activeLink)} to={url}>{link.name}</Link>
    </Fragment>
  }

  render() {
    // return <div></div>
    const { match: { params: { id = null } }, theme: { palette = {} }, classes, className: classNameProp, isLoading, breadcrumbsList, other } = this.props
    const className = classNames(classes.root, classNameProp)
    if (!id)
      return <div></div>
    return (
      <GoPrimeHeader className={className} {...other}>
        <div className={classes.breadCrumbs}>
          {isLoading && <div className={classes.skeleton}><Skeleton flat={true} background={palette.searchBg} height={20} /></div>}
          {!isLoading && breadcrumbsList.map(this.createBreadCrumbs)}
        </div>
      </GoPrimeHeader>
    )
  }
}
const mapStateToProps = state => {
  return {
    breadcrumbsList: generateBreadcrumps(state.dashboard),
    isLoading: state.dashboard.loading
  }
}
const mapDispatchToProps = {
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles, { withTheme: true })(Header)))
