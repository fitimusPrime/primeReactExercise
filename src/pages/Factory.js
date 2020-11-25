/**
 * Created by LeutrimNeziri on 30/03/2019.
 */
import withStyles from "@material-ui/core/styles/withStyles";
import Content from 'anatomy/Content';
import { PAGES } from 'Constants';
import Home from 'pages/dashboards/Layout';
import Playground from "pages/playground/Playground";
import DashboardOpen from 'pages/dashboard/Layout'
import Support from "pages/support/Support";
import store from 'Store'
import { withRouter } from 'react-router-dom'
import { fetchDashboard } from 'reducers/dashboard/Actions'
import React from "react";
import routes from 'utils/Routes';
import Lecture1 from 'pages/lecture1/Lecture1';

const styles = ({ typography }) => ({
  root: {}
})

class Factory extends React.Component {

  constructor(props) {
    super(props)

    this.contentRef = React.createRef();
  }

  componentDidMount() {
    this.scrollToDiv()
  }

  componentDidUpdate(prevProps, prevState) {
    const { match: { params: { id = '' } = {} } = {} } = this.props
    const { match: { params: { id: nextId = '' } = {} } = {} } = prevProps

    if (id !== nextId) {
      this.scrollToDiv()
    }
  }

  scrollToDiv() {
    const { match: { params: { id = '' } = {} } = {} } = this.props
    const element = document.getElementById(id)
    const content = document.getElementById('content')
    if (!element || !content) {
      content.scrollTo(0, 0)
      return
    }
    content.scrollTo(0, element.offsetTop - 100)
  }

  reducer = (children, parents, breadcrumbs, section) => {
    if (!children) {
      return breadcrumbs
    }
    return children.reduce((breadcrumbs, next) => {
      breadcrumbs = this.reducer(next.children, [...parents, next], breadcrumbs, section)
      if (next.id === section) {
        return [...breadcrumbs, ...parents, next]
      }
      return breadcrumbs
    }, breadcrumbs)
  }

  renderSections = (breadcrumbs) => {
    const {  match: { params: { id = null } = {} } = {}, location } = this.props
    if (id) {
      store.dispatch(fetchDashboard(id))
      return <DashboardOpen dashboardId={id} />
    }
    return <Home />
  }


  render() {
    const { classes, ...other } = this.props
    const { match: { params: { id = PAGES.HOME } = {} } = {} } = this.props
    const breadcrumbs = this.reducer(routes, [], [], id)
    
    return (
      <Content breadcrumbs={breadcrumbs} {...other}>
        {this.renderSections(breadcrumbs)}
      </Content>
    )
  }
}

export default withRouter(withStyles(styles)(Factory))
