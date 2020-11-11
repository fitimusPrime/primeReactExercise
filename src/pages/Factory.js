/**
 * Created by LeutrimNeziri on 30/03/2019.
 */
import withStyles from "@material-ui/core/styles/withStyles";
import Content from 'anatomy/Content';
import { PAGES } from 'Constants';
import Home from 'pages/Home';
import Playground from "pages/playground/Playground";
import Support from "pages/support/Support";
import React from "react";
import routes from 'utils/Routes';
import Lecture1 from 'pages/lecture1/Lecture1';

const styles = ({typography}) => ({
  root: {}
})

class Factory extends React.Component {

  constructor (props) {
    super(props)

    this.contentRef = React.createRef();
  }

  componentDidMount () {
    this.scrollToDiv()
  }

  componentDidUpdate (prevProps, prevState) {

    const {match: {params: {id = ''} = {}} = {}} = this.props
    const {match: {params: {id: nextId = ''} = {}} = {}} = prevProps

    if (id !== nextId) {
      this.scrollToDiv()
    }
  }

  scrollToDiv() {
    const {match: {params: { id = ''} = {}} = {}} = this.props
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
    const {match, match: {params: {id = ''} = {}} = {}, location} = this.props

    let page = breadcrumbs[0]
    switch (page.id) {
      case PAGES.LECTURE_1.ID:
        return <Lecture1 breadcrumbs={breadcrumbs} />
      case PAGES.PLAYGROUND:
        return <Playground page={page} />
      default:
        return <Home/>
    }
  }


  render() {
    const {classes, ...other} = this.props
    const {match: {params: {id = PAGES.HOME} = {}} = {}} = this.props
    const breadcrumbs = this.reducer(routes, [], [], id)
    return (
      <Content breadcrumbs={breadcrumbs} {...other}>
        {this.renderSections(breadcrumbs)}
      </Content>
    )
  }
}

export default withStyles(styles)(Factory)
