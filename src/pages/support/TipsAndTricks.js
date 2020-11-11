/**
 * Created by LeutrimNeziri on 09/04/2019.
 */
import withStyles from "@material-ui/core/styles/withStyles";
import Divider from "presentations/Divider";
import Typography from "presentations/Typography";
import React, { Fragment } from "react";
const styles = ({ typography }) => ({
  root: {},
})

import InspectHTMLElement from 'assets/images/support/inspect_html.png'
import OpenInspectElement from 'assets/images/support/inspect.png'
import Console from 'assets/images/support/console.png'
import ReactDevTool from 'assets/images/support/react.png'
import ErrorMessages from 'assets/images/support/error_messages.png'

class TipsAndTricks extends React.Component {
  render() {
    const { classes, section } = this.props
    const debugging = section.children[0]
    const logging = section.children[1]
    const devTools = section.children[2]

    console.log(`The result of console.log('test1', 'test2', 'test3', \{ name: 'agon'\}) are shown here, check the next line`)
    console.log('test1', 'test2', 'test3', { name: 'agon'})
    return (
      <Fragment>
        <Typography variant={'heading'}>
          {section.display}
          <Typography variant='p'>
            In this page we are going to show some tips and tricks on how to improve and get better at understanding React development as well as tools that can help you optimise your workflow
          </Typography>
          <Divider />
        </Typography>
        <Typography id={debugging.id} variant={'title'}>
          {debugging.display}
        </Typography>
        <Typography variant='p'>
          Open up the inspect element by doing Right Click and selecting the Inspect Element ("Ctrl + Shift + I" shortcut on Windows):
        </Typography>
        <Typography variant='p'>
          <img src={OpenInspectElement} />
        </Typography>
        <Typography variant='p'>
          The first tab that opens can allow users to inspect how the HTML looks like and allow them to quickly try changing it and visualising the change live!
        </Typography>
        <Typography variant='p'>
          <img src={InspectHTMLElement} />
        </Typography>
        <Typography id={logging.id} variant={'title'}>
          {logging.display}
        </Typography>
        <Typography variant='p'>
          Every console.log() output will show at the console tab. You can also use console.log('test1', 'test2', 'test3', {`\{ name: 'agon'\}`}) to output multiple strings, objects, arrays, html elements etc. Try it out!
        </Typography>
        <Typography variant='p'>
          <img src={Console} />
        </Typography>
        <Typography variant='p'>
          Furthermore, you can get viable error message that guide you through a code that doesn't work. Follow them through to find out what the problem is! Example:
        </Typography>
        <Typography variant='p'>
          <img src={ErrorMessages} />
        </Typography>
        <Typography variant='p'>
          At the above example the reference of the bug is not defined. The bug happened at TipsAndTrics.js. By clicking the link you can see what the code that failed looks like and try to fix it!
        </Typography>
        <Typography id={devTools.id} variant={'title'}>
          {devTools.display}
        </Typography>
        <Typography variant='p'>
          The React Dev tool can be downloaded using the following link, which is also shown at the console when you are running a React App and you don't have the extension setup:
          <Typography variant='p'>
            <img src={ReactDevTool} />
          </Typography>
          Try Downloading it, you will get a new tab, which tells you all the component hirearchy and how they are layed on the page! Happy coding!
        </Typography>
      </Fragment>
    )
  }
}

export default withStyles(styles)(TipsAndTricks)
