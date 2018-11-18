import React from "react"
import glamorous from 'glamorous'

import { Container } from 'glamorous-grid'
import Link from "gatsby-link"

import { rhythm } from "../theme/typography"
import theme from "../theme"

import Logo from "../components/Logo"
import { Hr } from "../components/Section"


const Navbar = glamorous.nav({
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap', // allow us to do the line break for collapsing content
    alignItems: 'center',
    justifyContent: 'space-between', // space out brand from logo
    //opacity: 0.9,
    '@supports (position: sticky)': {
        position: 'sticky',
        top: 0,
        zIndex: 1020
    }
}, ({ theme }) => ({
    color: theme.inverted ? theme.color.lightest : theme.color.primary,
    backgroundColor: theme.inverted ? theme.color.primary : theme.color.lighter
}));

const NavContent = glamorous(Container)({
    display: 'flex',
    flexWrap: 'wrap', // allow us to do the line break for collapsing content
    alignItems: 'center',
    justifyContent: 'center', //'space-between', // space out brand from logo
    padding: '1rem 1rem',
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
}, ({ theme }) => ({
    color: theme.inverted ? theme.color.lightest : theme.color.secondary,
    ':hover, &.active': {
        color: theme.inverted ? theme.color.accent : theme.color.primary
    }
}));

const NavLink2 = glamorous(NavLink)({
}, ({ theme }) => ({
    color: theme.inverted ? theme.color.primary : theme.color.accent,
    //backgroundColor: theme.inverted ? theme.color.lighter : theme.color.primary
}));

const Separator = glamorous(Hr)({
    height: '0px',
}, ({ theme }) => ({
    borderColor: theme.color.secondary,
}));

const hasNews = (news) => news && news.length > 0 && news[0].frontpageUntil && Date.parse(news[0].frontpageUntil) - Date.now() > 0

export default ({ routes, news }) => {
    return <Navbar>
        <NavContent>
            <Nav>
                {routes.map(route => <li key={route.path} css={{ margin: 0 }}>
                    <NavLink to={route.path}
                        exact={route.path === '/'}
                        activeClassName="active"
                        title={route.label}>
                        {route.label}
                    </NavLink>
                </li>)}
            </Nav>
        </NavContent>
        {hasNews(news) && <Separator />}
        {hasNews(news) && <NavContent>

            <Nav>
                {news.map(n => <li key={n.title} css={{ margin: 0 }}>
                    <NavLink2 css={{ textTransform: 'none' }} to={n.path}
                        title={n.title}>
                        {n.title + ' - ' + n.description}
                    </NavLink2>
                </li>)}
            </Nav>
        </NavContent>}
    </Navbar>
}
