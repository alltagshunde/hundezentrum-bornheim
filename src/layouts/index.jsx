import React from "react"
import glamorous, { ThemeProvider, Div } from 'glamorous'
import { Helmet } from "react-helmet";

import theme from "../theme"

import Logo from "../components/Logo"
import Banner from "../components/Banner"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"


export default ({children, data, noBanner}) => <ThemeProvider theme={ theme }>
                                                   <Div css={ { minHeight: '100%' } }>
                                                       <Helmet htmlAttributes={ { lang: 'de' } } titleTemplate="%s | Hundezentrum Bornheim" defaultTitle="Kompetenz rund um Ihren Hund | Hundezentrum Bornheim">
                                                           <meta name="description" content="Hundezentrum Bornheim - Kompetenz rund um Ihren Hund" />
                                                           { data.site && <link rel="canonical" href={ data.site.siteMetadata.siteUrl } /> }
                                                       </Helmet>
                                                       { theme.logoTop && <Logo/> }
                                                       <Navbar routes={ data.allMarkdownRemark.edges.map(edge => ({
                                                                            path: edge.node.fields.path,
                                                                            label: edge.node.frontmatter.title
                                                                        })) } />
                                                       { !noBanner && <Banner sizes={ data.file.childImageSharp.sizes } /> }
                                                       { children() }
                                                       <Footer/>
                                                   </Div>
                                               </ThemeProvider>

export const query = graphql`
  query RouteQuery {
    site {
      siteMetadata {
        siteUrl
      }
    }
    allMarkdownRemark(filter: {fields: {navEntry: {eq: "menu"}}}, sort: { fields: [frontmatter___position], order: ASC }) {
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
