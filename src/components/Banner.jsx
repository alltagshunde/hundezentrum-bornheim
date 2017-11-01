import React from "react"
import { css } from 'glamor'
import glamorous, { ThemeProvider } from 'glamorous'
import { Container, Row, Col } from 'glamorous-grid'
import Img from 'gatsby-image'

import Logo from "../components/Logo"

import logo from '../assets/img/Logo_Hundezentrum_Bornheim.png'
import logo_inverted from '../assets/img/Logo_Hundezentrum_Bornheim_inverted.png'
import front from '../assets/img/DSC01648.jpg'

import { noOuterGutter } from "../theme/grid"
import theme from "../theme"

const StyledCol = glamorous(Col)({
    //padding: '0 !important'
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
}, ({theme}) => ({
    color: theme.inverted ? theme.color.primary : theme.color.lighter,
    backgroundColor: theme.inverted ? theme.color.lighter : theme.color.primary
}));

const StyledRow = glamorous(Row)({
    margin: '0 !important'
});

const H = glamorous.h1({
    textAlign: 'center',
    marginTop: '4rem',
    fontSize: '4rem'
});

const ban = css({
    width: '100%',
    margin: 0
})

export default ({sizes}) => <Container fluid px="0 !important">
                                <Row noGutters={ true }>
                                    <Col span={ { md: 6 / 12 } }>
                                    <Img sizes={ sizes } />
                                    </Col>
                                    <StyledCol span={ { md: 6 / 12 } }>
                                        <img src={ theme.inverted ? logo : logo_inverted } css={ { width: '80%', margin: 0 } } />
                                        <H>
                                            Kompetenz rund um Ihren Hund
                                        </H>
                                    </StyledCol>
                                </Row>
                            </Container>

