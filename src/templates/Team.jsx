import React from "react"
import glamorous from 'glamorous'

import Img from 'gatsby-image'
import Link from "gatsby-link"
import { Row, Col } from 'glamorous-grid'
import Section from '../components/Section'
import Card, { CardHeader, CardBody, CardFooter, CardLink } from '../components/Card'

const CardHeaderPrimary = glamorous(CardHeader)({
    paddingBottom: '20px'
}, ({theme}) => ({
    color: theme.color.primary
}));

export default ({data}) => {
    const section = data.markdownRemark.frontmatter.sections[0]
    return <div>
               { section.image_before && // TODO: use sizes with media-query, factor out to parallax component 
                 <div css={ { height: '500px', backgroundImage: `url("${section.image_before.childImageSharp.sizes.src}")`, backgroundAttachment: 'fixed', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' } }></div> }
               <Section title={ section.title } name={ section.name }>
                   <Row justifyContent={ { md: 'center' } }>
                       { data.allMarkdownRemark &&
                         data.allMarkdownRemark.edges.map(({node}) => <Col span={ { md: 4 / 12 } } css={ { marginBottom: '1rem' } } key={ node.id }>
                                                                      <Card>
                                                                          <CardHeaderPrimary>
                                                                              { node.frontmatter.title }
                                                                          </CardHeaderPrimary>
                                                                          <CardBody>
                                                                              <Img sizes={ node.frontmatter.image.childImageSharp.sizes } css={ { marginBottom: '1rem' } } />
                                                                              <div dangerouslySetInnerHTML={ { __html: node.html } } />
                                                                          </CardBody>
                                                                      </Card>
                                                                      </Col>
                         ) }
                   </Row>
               </Section>
           </div>
}

//export const query = pageQuery

export const query = graphql`
  query TrainerQuery($path: String!) {
    markdownRemark(fields: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        sections {
          title
          name
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