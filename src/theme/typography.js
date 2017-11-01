import Typography from "typography"
import bootstrapTheme from "typography-theme-bootstrap"
import lawtonTheme from "typography-theme-lawton"
import fairyGateTheme from "typography-theme-fairy-gates"
import kirkhamTheme from "typography-theme-kirkham"


import sansation from '../assets/fonts/sansation.css'

//const typography = new Typography(kirkhamTheme)
//const typography = new Typography(fairyGateTheme)
//const typography = new Typography(lawtonTheme)
//const typography = new Typography(bootstrapTheme)
const typography = new Typography({
    baseFontSize: '18px',
    baseLineHeight: 1.666,
    headerFontFamily: ['Sansation Regular', 'sans-serif'],
    bodyFontFamily: ['Source Sans Pro', 'sans-serif'],
// See below for the full list of options.
})

export default typography