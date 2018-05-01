import React from "react"
import glamorous from 'glamorous'

import { Container, Row, Col } from 'glamorous-grid'
import Link from "gatsby-link"
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone'
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope'

import theme from "../theme"

const Footer = glamorous.footer({
    //    display: 'flex',
    //    flexDirection: 'column',
    //flexWrap: 'wrap', // allow us to do the line break for collapsing content
    //    alignItems: 'stretch',
    //    justifyContent: 'space-between', //'space-between', // space out brand from logo
    //    paddingTop: '5rem',
    //    paddingBottom: '5rem',
    //paddingLeft: '10rem',
    //paddingRight: '10rem'
}, ({theme}) => ({
    color: theme.color.lightest,
    backgroundColor: theme.color.primary
}));

const FooterRow = glamorous.div({
    display: 'flex',
    flexWrap: 'wrap', // allow us to do the line break for collapsing content
    alignItems: 'center',
    justifyContent: 'space-between', //'space-between', // space out brand from logo
}, ({theme}) => ({
    color: theme.color.primary,
    backgroundColor: theme.color.lightest
}));

const FooterBottom = glamorous.div({
    paddingTop: '2.5rem',
    paddingBottom: '2.5rem',
}, ({theme}) => ({
    borderTop: `1px solid ${theme.color.lightest}`,
    color: theme.color.lightest,
    backgroundColor: theme.color.primary
}));

const FooterRowLeft = glamorous.div({
    display: 'flex',
    flexWrap: 'wrap', // allow us to do the line break for collapsing content
    alignItems: 'flex-start',
    justifyContent: 'space-between', //'space-between', // space out brand from logo
});

const LinkList = glamorous.ul({
    padding: 0,
    margin: 0,
    listStyle: 'none',
    '& li': {
        marginBottom: 0
    }
});

const FooterLink = glamorous(Link)({
    textDecoration: 'none',
//paddingLeft: '1rem',
}, ({theme}) => ({
    color: theme.color.lightest,
    ':hover, &.active': {
        color: theme.color.secondary
    }
}));

const FooterLinkExt = glamorous.a({
    textDecoration: 'none',
}, ({theme}) => ({
    color: theme.color.lightest,
    ':hover, &.active': {
        color: theme.color.secondary
    }
}));

const FooterHeader = glamorous.h4({
    marginBottom: '1rem',
    textTransform: 'uppercase',
});

const Icon = glamorous(FontAwesomeIcon)({
    marginRight: '0.5rem',
});

export default () => <Footer>
                         <FooterBottom>
                             <Container>
                                 <Row justifyContent="between">
                                     <Col>
                                     <FooterHeader>
                                         Kontakt
                                     </FooterHeader>
                                     <LinkList>
                                         <li>
                                             <Icon icon={ faPhone } fixedWidth/> 02222/9626517
                                         </li>
                                         <li>
                                             <Icon icon={ faEnvelope } fixedWidth/>
                                             <FooterLinkExt href="mailto:&#105;&#110;&#102;&#111;&#064;&#104;&#117;&#110;&#100;&#101;&#122;&#101;&#110;&#116;&#114;&#117;&#109;&#045;&#098;&#111;&#114;&#110;&#104;&#101;&#105;&#109;&#046;&#100;&#101;">
                                                 info@hundezentrum-bornheim.de
                                             </FooterLinkExt>
                                         </li>
                                     </LinkList>
                                     </Col>
                                     <Col>
                                     <FooterHeader>
                                         Über uns
                                     </FooterHeader>
                                     <LinkList>
                                         <li>
                                             <FooterLink to="/philosophie/" activeClassName="active" title="Philosophie">
                                                 Philosophie
                                             </FooterLink>
                                         </li>
                                         <li>
                                             <FooterLink to="/team/" activeClassName="active" title="Team">
                                                 Team
                                             </FooterLink>
                                         </li>
                                     </LinkList>
                                     </Col>
                                     <Col span={ 12 / 12 } auto={ true }>
                                     <FooterHeader>
                                         Partner
                                     </FooterHeader>
                                     <LinkList>
                                         <li>
                                             <FooterLinkExt href="https://www.der-waldi.de" target="_blank">
                                                 Der Waldi
                                             </FooterLinkExt>
                                         </li>
                                         <li>
                                             <FooterLinkExt href="http://gesunderhundnowak.de" target="_blank">
                                                 Gesunder Hund Nowak
                                             </FooterLinkExt>
                                         </li>
                                         <li>
                                             <FooterLinkExt href="https://www.canis-kynos.de" target="_blank">
                                                 CANIS
                                             </FooterLinkExt>
                                         </li>
                                         <li>
                                             <FooterLinkExt href="http://www.rheinland-hunde.de" target="_blank">
                                                 Rheinland Hunde
                                             </FooterLinkExt>
                                         </li>
                                         <li>
                                             <FooterLinkExt href="https://www.rheinrudel.de" target="_blank">
                                                 Rheinrudel
                                             </FooterLinkExt>
                                         </li>
                                         <li>
                                             <FooterLinkExt href="http://www.tierarztpraxis-weinand.de" target="_blank">
                                                 Tierarztpraxis Weinand
                                             </FooterLinkExt>
                                         </li>
                                     </LinkList>
                                     </Col>
                                 </Row>
                             </Container>
                         </FooterBottom>
                         <FooterBottom>
                             <Container>
                                 <Row justifyContent="between">
                                     <Col> © Hundezentrum Bornheim 2018
                                     </Col>
                                     <Col span={ 12 / 12 } auto={ true }>
                                     <FooterLink to="/privacy/" activeClassName="active" title="Datenschutz">
                                         Datenschutz
                                     </FooterLink>
                                     <FooterLink to="/legal/"
                                         css={ { paddingLeft: '1rem' } }
                                         activeClassName="active"
                                         title="Impressum">
                                         Impressum
                                     </FooterLink>
                                     </Col>
                                 </Row>
                             </Container>
                         </FooterBottom>
                     </Footer>


