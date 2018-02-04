import React from "react"

import Img from 'gatsby-image'
import { Container, Row, Col } from 'glamorous-grid'

import Section from '../components/Section'

export default ({data}) => <div>
                               { data.markdownRemark.frontmatter.image && // TODO: use sizes with media-query, factor out to parallax component 
                                 <div css={ { height: '500px', backgroundImage: `url("${data.markdownRemark.frontmatter.image.childImageSharp.sizes.src}")`, backgroundAttachment: 'fixed', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' } }></div> }
                               <Section title={ data.markdownRemark.frontmatter.title } name={ data.markdownRemark.fields.path } cssover={ { marginBottom: '1rem' } }>
                                   <Row>
                                       <Col span={ { md: 4 / 12 } } offset={ { md: 4 / 12 } } css={ { display: 'flex', justifyContent: 'space-between' } }>
                                       <span css={ { fontWeight: 'bold' } }>Wann</span><span>{ data.markdownRemark.frontmatter.termin }</span>
                                       </Col>
                                   </Row>
                                   <Row css={ { marginBottom: '2rem' } }>
                                       <Col span={ { md: 4 / 12 } } offset={ { md: 4 / 12 } } css={ { display: 'flex', justifyContent: 'space-between' } }>
                                       <span css={ { fontWeight: 'bold' } }>Was kostet es</span><span>{ data.markdownRemark.frontmatter.price }</span>
                                       </Col>
                                   </Row>
                                   <div dangerouslySetInnerHTML={ { __html: data.markdownRemark.html } } />
                               </Section>
                           </div>


export const query = graphql`
  query ServiceItemQuery($path: String!) {
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