import React from "react"
import glamorous from 'glamorous'

import { Container } from 'glamorous-grid'
import Link from "gatsby-link"

import { rhythm } from "../theme/typography"
import theme from "../theme"

import Logo from "../components/Logo"


const Navbar = glamorous.nav({
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap', // allow us to do the line break for collapsing content
    alignItems: 'center',
    justifyContent: 'spaceBetween', // space out brand from logo
    padding: '1rem 1rem',
    //opacity: 0.9,
    '@supports (position: sticky)': {
        position: 'sticky',
        top: 0,
        zIndex: 1020
    }
}, ({theme}) => ({
    color: theme.inverted ? theme.color.lightest : theme.color.primary,
    backgroundColor: theme.inverted ? theme.color.primary : theme.color.lighter
}));

const NavContent = glamorous(Container)({
    display: 'flex',
    flexWrap: 'wrap', // allow us to do the line break for collapsing content
    alignItems: 'center',
    justifyContent: 'center' //'space-between', // space out brand from logo
});

const Nav = glamorous.ul({
    display: 'flex',
    padding: 0,
    margin: 0,
    listStyle: 'none',
});

const NavLink = glamorous(Link)({
    paddingLeft: '1rem',
    textDecoration: 'none',
    fontFamily: 'Sansation Regular',
    textTransform: 'uppercase',
    fontWeight: 'bold',
}, ({theme}) => ({
    color: theme.inverted ? theme.color.lightest : theme.color.secondary,
    ':hover, &.active': {
        color: theme.inverted ? theme.color.accent : theme.color.primary
    }
}));



export default ({routes}) => {
    return <Navbar>
               <NavContent>
                   <Nav>
                       { routes.map(route => <li key={ route.path } css={ { margin: 0 } }>
                                                 <NavLink to={ route.path } exact={ route.path === '/' } activeClassName="active">
                                                     { route.label }
                                                 </NavLink>
                                             </li>) }
                   </Nav>
               </NavContent>
           </Navbar>
}

