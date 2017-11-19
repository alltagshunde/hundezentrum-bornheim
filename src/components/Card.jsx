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
    textAlign: 'center'
}, ({theme}) => ({
    borderColor: theme.color.primary,
    ':hover, &.active': {
        borderColor: theme.color.secondary
    }
}));

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

export const CardLink = glamorous(Link)({
    textDecoration: 'none',
}, ({theme}) => ({
    color: theme.color.primary,
    ':hover, &.active': {
        color: theme.color.secondary
    }
}));

export default ({children}) => <Card>
                                   { children }
                               </Card>

export const CardHeader = ({children}) => <Center>
                                              <Header>
                                                  { children }
                                              </Header>
                                              <Hr/>
                                          </Center>

export const CardBody = ({children}) => <div>
                                            { children }
                                        </div>

export const CardFooter = ({children}) => <Footer>
                                              { children }
                                          </Footer>