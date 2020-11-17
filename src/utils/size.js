import {BREAKPOINTS} from 'Constants'

const fontSize = 14
const coefficient = fontSize / 14
const htmlFontSize = 10

const spacing = 8

const rawFontSize = () => {
  try {
    const html = document.querySelector("html")
    const ratio = window.getComputedStyle(html, null).getPropertyValue("font-size")
    return ratio.replace('%', '')
  } catch (e) {
    return '14'
  }
}

export const baseFontSize = () => {
  return parseInt(rawFontSize())
}

export const preciseBaseFontSize = () => {
  return parseFloat(rawFontSize())
}

export const pxToRemValue = (size) => {
  return (size / htmlFontSize) * coefficient
}

export const pxToRem = (size) => {
  return `${result.pxToRemValue(size)}rem`
}

export const scaleFontSizeSizeToRatio = (fontSize, ratio = 14) => {
  return baseFontSize() * (fontSize / ratio)
}

export const scalePixelSizeToRatio = (pixels, baseSize = 10) => {
  return pixels * (preciseBaseFontSize() / baseSize)
}

export const invertScaledSize = (pixels, baseSize = 10) => {
  return pixels * (baseSize/ preciseBaseFontSize())
}


const spacingToRem = (spacingParam = 1) => pxToRem(spacingParam * spacing)

const spacingToRemValue = (spacingParam = 1) => pxToRemValue(spacingParam * spacing)

let result = {
  id: 'normal',
  breakpoint: BREAKPOINTS.FULL_HD,
  h1: 48,
  h2: 28,
  h3: 24,
  h4: 20,
  h5: 18,
  h6: 16,
  fontSize: 14,
  captionFontSize: 12,
  smallFontSize: 10,
  spacing: 8,
  iconSize: 24,
  iconSizeSmall: 18,
  baseRadius: 4,
  pxToRemValue,
  pxToRem,
  spacingToRem,
  spacingToRemValue,
  logoSize: 48
}

export default result
