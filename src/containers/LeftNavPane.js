/**
 * Created by LeutrimNeziri on 01/03/2019.
 */
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import { PAGES } from 'Constants';
import NavRowWrapper from 'presentations/rows/NavRowWrapper';
import React from 'react';
import { connect } from 'react-redux'
import routes, {format} from 'utils/Routes';
import { generatePath } from "react-router";

const styles = ({ size, palette, typography }) => ({
  root: {
    display: 'flex',
    padding: 0,
    flexFlow: 'column nowrap',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    overflowY: 'hidden',
    width: '100%',
  },
  expandable: {}
})

class LeftNav extends React.Component {

  static get defaultProps() {
    return {
      open: false
    }
  }

  state = {
    active: PAGES.HOME
  }

  componentDidMount() {
    this.onLinkChanged()
  }

  componentDidUpdate(prevProps) {
    const { breadcrumbs } = this.props
    const { breadcrumbs: prevBreadcrumbs } = prevProps
    if (breadcrumbs.length !== prevBreadcrumbs.length) {
      this.onLinkChanged()
    } else {
      let isDirty = false
      breadcrumbs.every((next, index) => {
        isDirty = prevBreadcrumbs[index].id !== next.id
        return isDirty
      })
      if (isDirty) {
        this.onLinkChanged()
      }
    }
  }

  onLinkChanged() {
    const { breadcrumbs } = this.props
    if (breadcrumbs.length === 0) {
      return
    }
    this.setState({
      active: breadcrumbs[0].id
    })
  }

  onCollapse = (event, item) => {
    const { active } = this.state
    if (active === item.id) {
      this.setState({ active: undefined })
      return
    }
    this.setState({
      active: item.id
    })
  }

  renderPanes = (route, index) => {
    const { active } = this.state
    const { breadcrumbs, drawerOpen } = this.props
    return <NavRowWrapper
      key={route.id}
      breadcrumbs={breadcrumbs}
      open={route.id === active}
      drawerOpen={drawerOpen}
      onCollapse={this.onCollapse}
      item={route} />
  }

  render() {
    const { className: classNameProp, classes,dashboards } = this.props
    const generateDashboardRoutes = () =>{
      dashboards.map(next =>{
        generatePath('/lecture/:id',{id:next.id})
        return format(next)
      })
    }
    const routerLinks =[...routes,...dashboards.map(format)]
    const className = classNames(
      classes.root,
      classNameProp
    )
    return (
      <div className={className}>
        {routerLinks.map(this.renderPanes)}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
      dashboards: state.dashboard.dashboards,
      isLoading: state.dashboard.loading
  }
}
const mapDispatchToProps = {
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles )(LeftNav))
