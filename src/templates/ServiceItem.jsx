import React from "react"
import { Helmet } from "react-helmet";

import Img from 'gatsby-image'
import { Container, Row, Col } from 'glamorous-grid'

import Section from '../components/Section'

export default ({data}) => <div>
                               <Helmet>
                                   <title>
                                       { data.markdownRemark.frontmatter.title }
                                   </title>
                                   <meta name="description" content={ data.markdownRemark.frontmatter.title } />
                                   { data.site && <link rel="canonical" href={ `${data.site.siteMetadata.siteUrl}${data.markdownRemark.fields.path}` } /> }
                               </Helmet>
                               { data.markdownRemark.frontmatter.image && // TODO: use sizes with media-query, factor out to parallax component 
                                 <div css={ { height: '500px', backgroundImage: `url("${data.markdownRemark.frontmatter.image.childImageSharp.sizes.src}")`, backgroundAttachment: 'fixed', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' } }></div> }
                               <Section title={ data.markdownRemark.frontmatter.title } name={ data.markdownRemark.fields.path } cssover={ { marginBottom: '1rem' } }>
                                   <Row>
                                       <Col span={ { md: 8 / 12, lg: 6 / 12, xl: 4 / 12 } } offset={ { md: 2 / 12, lg: 3 / 12, xl: 4 / 12 } } css={ { display: 'flex', justifyContent: 'space-between' } }>
                                       <span css={ { fontWeight: 'bold' } }>Wann</span><span>{ data.markdownRemark.frontmatter.termin }</span>
                                       </Col>
                                   </Row>
                                   <Row css={ { marginBottom: '2rem' } }>
                                       <Col span={ { md: 8 / 12, lg: 6 / 12, xl: 4 / 12 } } offset={ { md: 2 / 12, lg: 3 / 12, xl: 4 / 12 } } css={ { display: 'flex', justifyContent: 'space-between' } }>
                                       <span css={ { fontWeight: 'bold', whiteSpace: 'nowrap', paddingRight: '1rem' } }>Was kostet es</span><span>{ data.markdownRemark.frontmatter.price }</span>
                                       </Col>
                                   </Row>
                                   <Row>
                                       <Col>
                                       <div css={ { textAlign: 'center' } } dangerouslySetInnerHTML={ { __html: data.markdownRemark.html } } />
                                       </Col>
                                   </Row>
                               </Section>
                           </div>


export const query = graphql`
  query ServiceItemQuery($path: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    markdownRemark(fields: { path: { eq: $path } }) {
      fields {
        path
      }
      html
      frontmatter {
        title
        termin
        price
        image {
          childImageSharp {
            sizes {
              ...GatsbyImageSharpSizes_withWebp
            }
          }
        }
      }
    }
  }
`