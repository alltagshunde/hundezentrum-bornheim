import React from "react"
import g from 'glamorous'
var MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();

import Link from "gatsby-link"
import { Row, Col } from 'glamorous-grid'
import Section from '../components/Section'

export default ({data}) => <div>
                               <Section title={ data.markdownRemark.frontmatter.sections[0].title } name={ data.markdownRemark.frontmatter.sections[0].name }>
                                   <div dangerouslySetInnerHTML={ { __html: md.render(data.markdownRemark.frontmatter.sections[0].text) } } />
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
          text
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