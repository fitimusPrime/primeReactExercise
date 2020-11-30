import React from 'react'
import 'react-resizable/css/styles.css'
import 'react-grid-layout/css/styles.css'
import { withStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator';

const styles = ({ size, palette }) => ({
    root: {
        width: '100%'
    },
    '@keyframes shine': {
        to: { backgroundPosition: 'right -40px top 0' }
    },
    skeleton: {
        height: '100%',
        backgroundColor: fade(palette.cardBg, 0.5),
        backgroundImage: `linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0))`,
        backgroundSize: '40px 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left -40px top 0',
        animation: 'shine 1s ease infinite',
        borderRadius: 4,
        boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)'
    },
})
class Skeleton extends React.Component {
    componentDidMount() {
        // console.log(this.props.fetchDashboards({ type: RECEIVE_DATA }))
        // this.props.getDashboards({ type: RECEIVE_DATA })
    }
    render() {
        const { slot, classes, height, bottom, background, flat } = this.props
        const optionsBase = { height, marginBottom: bottom }
        const innerOptions = {}
        if(flat)
        innerOptions.boxShadow = 'none'
        if(background)
        innerOptions.backgroundColor = fade(background,0.5)
        return <div className={classes.root} style={optionsBase}>
            <div className={classes.skeleton} style={innerOptions}></div>
        </div>

    }
}
export default withStyles(styles)(Skeleton)