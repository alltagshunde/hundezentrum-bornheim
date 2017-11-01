import { css } from 'glamor'
import color from 'color'

const theme = {
    inverted: false,
    logoTop: false,
    color: {
        primary: '#007b77',
        //primary: 'rgb(130,205,177)',
        secondary: '#443f38',
        accent: '#ee7103',
        lightest: '#fff',
        lighter: 'rgb(247,247,247)',
        light: '#999',
        dark: color('#999').darken(0.5),
        darkest: color('#444').darken(0.3)
    }
}

css.global('html, body, #___gatsby', {
    padding: 0,
    margin: 0,
    //position: 'relative',
    minHeight: '100%'
})

css.global('body', {
    color: theme.color.secondary
})

export default theme

