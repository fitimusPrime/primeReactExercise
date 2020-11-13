/**
 * Created by LeutrimNeziri on 21/02/2019.
 */
import React from "react"
import {connect} from 'react-redux'
import {MuiThemeProvider as ThemeProviderMaterialUI, createMuiTheme} from "@material-ui/core/styles"
import "normalize.css"
import Theme from 'utils/Theme'
class ThemeProvider extends React.Component {
  render() {
    const {children, isDark} = this.props
    let theme = createMuiTheme(Theme.getTheme(isDark))
    console.log(theme)
    return (
      <ThemeProviderMaterialUI theme={ theme}>
        {children}
      </ThemeProviderMaterialUI>
    )
  }
}

const mapStateToProps = state => {
  return {
    isDark: state.theme.dark
  }
}

export default connect(mapStateToProps)(ThemeProvider)
