import React from "react"
import glamorous, { ThemeProvider, Div } from 'glamorous'
import { Helmet } from "react-helmet";

import theme from "../theme"

import Logo from "../components/Logo"
import Banner from "../components/Banner"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"


const compareNewsDesc = (a, b) => {
  return b.node.frontmatter.frontpageUntil - a.node.frontmatter.frontpageUntil;
}

export default ({ children, data, noBanner }) => <ThemeProvider theme={theme}>
  <Div css={{ minHeight: '100%' }}>
    <Helmet htmlAttributes={{ lang: 'de' }} titleTemplate="%s | Hundezentrum Bornheim" defaultTitle="Kompetenz rund um Ihren Hund | Hundezentrum Bornheim">
      <meta name="description" content="Hundezentrum Bornheim - Kompetenz rund um Ihren Hund" />
      {data.site && <link rel="canonical" href={data.site.siteMetadata.siteUrl} />}
    </Helmet>
    {theme.logoTop && <Logo />}
    <Navbar routes={data.menu.edges.map(edge => ({
      path: edge.node.fields.path,
      label: edge.node.frontmatter.title
    }))} news={noBanner ? [] : ((data.news && data.news.edges && data.news.edges.length > 0) ? [{ ...data.news.edges.sort(compareNewsDesc)[0].node.frontmatter, ...data.news.edges.sort(compareNewsDesc)[0].node.fields }] : [])} />
    {!noBanner && <Banner sizes={data.file.childImageSharp.sizes} />}
    {children()}
    <Footer />
  </Div>
</ThemeProvider>

//TODO: readd frontpageUntil to news frontmatter
export const query = graphql`
  query RouteQuery {
    site {
      siteMetadata {
        siteUrl
      }
    }
    menu: allMarkdownRemark(filter: {fields: {navEntry: {eq: "menu"}}}, sort: { fields: [frontmatter___position], order: ASC }) {
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

    news: allMarkdownRemark(filter: {fields: {itemType: {eq: "news"}}}) {
      edges {
        node {
          id
          fields {
            path
          }
          frontmatter {
            title
            description
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
