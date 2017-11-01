import React from "react"
import glamorous from 'glamorous'

import logo from '../assets/img/Logo_Hundezentrum_Bornheim.png'

const Logo = glamorous.h1({
    wordWrap: 'no-wrap',
    fontSize: '1.5rem',
    fontWeight: 'normal',
    margin: 0
}, ({theme}) => ({
    color: theme.color.primary
}));

const Middle = glamorous.span({
}, ({theme}) => ({
    color: theme.color.secondary
}));

export default ({}) => <div css={ { display: 'flex', justifyContent: 'center', padding: '1rem' } }>
                           <img src={ logo } css={ { height: '2rem', margin: 0 } } alt="Logo" />
                       </div>
/*export default ({}) => <Logo>
                           <span>HUNDE <Middle> ZENTRUM </Middle> BORNHEIM</span>                           
                       </Logo>
*/