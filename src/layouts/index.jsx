import React from "react"
import glamorous, { ThemeProvider, Div, H1 } from 'glamorous'
import { Container, Row, Col } from 'glamorous-grid'
import Link from "gatsby-link"

import { rhythm } from "../theme/typography"
import theme from "../theme"

import Logo from "../components/Logo"
import Banner from "../components/Banner"
import Navbar from "../components/Navbar"


const inverted = true


const Container2 = glamorous(Container)({
    paddingBottom: rhythm(2),
    paddingTop: rhythm(1.5)
});

const Footer = glamorous.footer({
    display: 'flex',
    flexWrap: 'wrap', // allow us to do the line break for collapsing content
    alignItems: 'center',
    justifyContent: 'center', //'space-between', // space out brand from logo
    paddingTop: '5rem',
    paddingBottom: '5rem'
}, ({theme}) => ({
    color: theme.color.lightest,
    backgroundColor: theme.color.primary
}));

export default ({children, data, noBanner}) => <ThemeProvider theme={ theme }>
                                                   <div css={ { minHeight: '100%' } }>
                                                       { theme.logoTop && <Logo/> }
                                                       <Navbar routes={ data.allMarkdownRemark.edges.map(edge => ({
                                                                            path: edge.node.fields.path,
                                                                            label: edge.node.frontmatter.title
                                                                        })) } />
                                                       { !noBanner && <Banner sizes={ data.file.childImageSharp.sizes } /> }
                                                       { children() }
                                                       <Footer>
                                                           © Hundezentrum Bornheim 2017
                                                       </Footer>
                                                   </div>
                                               </ThemeProvider>

export const query = graphql`
  query RouteQuery {
    site {
      siteMetadata {
        routes {
            path
            label
        }
      }
    }
    allMarkdownRemark(filter: {fields: {itemType: {eq: "pages"}}}, sort: { fields: [frontmatter___position], order: ASC }) {
        edges {
          node {
            fields {
              path
            }
            frontmatter {
              title
              name
            }
          }
        }
    }
    file(relativePath: { eq: "assets/img/pexels-photo-406014.jpg"}) {
      childImageSharp {
      sizes(maxWidth: 1600) {
          # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
          ...GatsbyImageSharpSizes_withWebp
        }
    }
    }
  }
`
