import React from "react"
import g from 'glamorous'

import Link from "gatsby-link"
import { Row, Col } from 'glamorous-grid'
import Section from '../components/Section'

export default ({data}) => <div>
                               <Section title={ data.markdownRemark.frontmatter.sections[0].title } name={ data.markdownRemark.frontmatter.sections[0].name }>
                                   { data.allMarkdownRemark.edges.map(({node}) => <Row key={ node.id }>
                                                                                      <Col css={ { textAlign: 'center' } }>
                                                                                      { /*<Link to={ node.fields.path } css={ { textDecoration: `none`, color: `inherit` } }>*/ }
                                                                                      <h4 css={ { fontSize: '1.1rem', marginBottom: '1.1rem' } }>{ node.frontmatter.title }<span css={ { color: "#BBB", fontSize: '1rem', paddingLeft: '1rem' } }>{ node.frontmatter.date }</span></h4>
                                                                                      <p>
                                                                                          { node.excerpt }
                                                                                      </p>
                                                                                      { /*</Link>*/ }
                                                                                      </Col>
                                                                                  </Row>
                                     ) }
                               </Section>
                           </div>

//export const query = pageQuery

export const query = graphql`
  query NewsQuery($path: String!) {
    markdownRemark(fields: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        sections {
        	title
        	name
        }
      }
    }
    allMarkdownRemark(filter: {fields: {itemType: {eq: "news"}}}, sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
          	id
            fields {
              path
            }
            frontmatter {
              title
              date(formatString: "DD.MM.YYYY")
              description
            }
            excerpt
          }
        }
    }
  }
`