import React from "react"
import glamorous from 'glamorous'
import { Container, Row, Col } from 'glamorous-grid'
import Link from "gatsby-link"

const Center = glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
});

const Card = glamorous(Center)({
    border: '1px solid',
    padding: '2rem 1.5rem',
    textAlign: 'center',
    minHeight: '100%'
});

const Header = glamorous.h5({
    textTransform: 'uppercase',
    marginBottom: '1rem'
});

const Footer = glamorous.div({
    fontSize: '.9rem',
    marginTop: '2rem'
}, ({theme}) => ({
    //color: theme.color.primary
}));

const Hr = glamorous.div({
    width: '66%',
    height: '2rem',
    borderTop: '1px solid'
});

const Hr2 = glamorous.div({
    width: '66%',
    height: '2rem',
    borderBottom: '1px solid',
    marginBottom: '1rem'
});

export const CardBody = glamorous.div({
});

export const CardLink = glamorous(Link)({
    textDecoration: 'none',
    width: '100%'
}, ({theme}) => ({
    color: theme.color.primary,
    ':hover, &.active': {
        color: theme.color.accent
    }
}));

export default Card
//export default ({children}) => <Card>
//                                   { children }
//                               </Card>

export const CardHeader = ({children}) => <Center>
                                              <Header>
                                                  { children }
                                              </Header>
                                              <Hr/>
                                          </Center>

export const CardFooter = ({children}) => <Center>
                                              <Hr2/>
                                              <h6 css={ { textTransform: 'uppercase', marginBottom: '0' } }>{ children }</h6>
                                          </Center>
