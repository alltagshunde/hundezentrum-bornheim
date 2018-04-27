import React from "react"
import glamorous from 'glamorous'
var MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();
import { Helmet } from "react-helmet";

import Img from 'gatsby-image'
import Link from "gatsby-link"
import { Row, Col } from 'glamorous-grid'
import Section from '../components/Section'
import Card, { CardHeader, CardBody, CardFooter, CardLink } from '../components/Card'

const CardPrimary = glamorous(Card)({

}, ({theme}) => ({
    color: theme.color.primary
}));

const Href = glamorous.a({
    textDecoration: 'none'
}, ({theme}) => ({
    color: theme.color.primary,
    ':hover, &.active': {
        color: theme.color.accent
    }
}));

export default ({data}) => {
    const section = data.markdownRemark.frontmatter.sections[0]
    return <div>
               <Helmet>
                   <title>
                       { data.markdownRemark.frontmatter.title }
                   </title>
                   <meta name="description" content="Zeigt Ihr Hund im Alltag unerwünschtes oder problematisches Verhalten lassen sich diese Probleme aufgrund der Einzigartigkeit jeder Beziehung am effektivsten in der Einzelberatung lösen."
                   />
                   <link rel="canonical" href={ `https://www.hundezentrum-bornheim.de${data.markdownRemark.fields.path}` } />
               </Helmet>
               { section.image_before && // TODO: use sizes with media-query, factor out to parallax component 
                 <div css={ { height: '500px', backgroundImage: `url("${section.image_before.childImageSharp.sizes.src}")`, backgroundAttachment: 'fixed', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' } }></div> }
               <Section title={ section.title } name={ section.name }>
                   <div dangerouslySetInnerHTML={ { __html: md.render(section.text) } } />
                   <Row justifyContent={ { md: 'center' } }>
                       { data.allMarkdownRemark &&
                         data.allMarkdownRemark.edges.map(({node}) => <Col span={ { md: 6 / 12, lg: 4 / 12 } } css={ { marginBottom: '1rem' } } key={ node.id }>
                                                                      <CardPrimary>
                                                                          <CardHeader>
                                                                              { node.frontmatter.title }
                                                                          </CardHeader>
                                                                          <CardBody>
                                                                              <div>
                                                                                  { node.frontmatter.phone }
                                                                              </div>
                                                                              <div>
                                                                                  <Href href={ node.frontmatter.site } target="_blank">
                                                                                      { node.frontmatter.sitename }
                                                                                  </Href>
                                                                              </div>
                                                                              { node.frontmatter.image && <Img sizes={ node.frontmatter.image.childImageSharp.sizes } css={ { marginTop: '1rem' } } /> }
                                                                          </CardBody>
                                                                      </CardPrimary>
                                                                      </Col>
                         ) }
                   </Row>
               </Section>
           </div>
}

//export const query = pageQuery

export const query = graphql`
  query BeratungQuery($path: String!) {
    markdownRemark(fields: { path: { eq: $path } }) {
      html
      excerpt
      fields {
        path
      }
      frontmatter {
        title
        sections {
          title
          name
          text
          image_before {
            childImageSharp {
              sizes {
                ...GatsbyImageSharpSizes_withWebp
              }
            }
          }
        }
      }
    }
    allMarkdownRemark(filter: {fields: {itemType: {eq: "team"}}}, sort: { fields: [frontmatter___position], order: ASC }) {
        edges {
          node {
            id
            fields {
              path
            }
            frontmatter {
              title
              description
              phone
              site
              sitename
              image {
                childImageSharp {
                  sizes {
                    ...GatsbyImageSharpSizes_withWebp
                  }
                }
              }
            }
            html
          }
        }
    }
  }
`