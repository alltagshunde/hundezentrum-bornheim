import React from "react"
import g from 'glamorous'
var MarkdownIt = require('markdown-it'),
  md = new MarkdownIt();
import { Helmet } from "react-helmet";

import Link from "gatsby-link"
import { Row, Col } from 'glamorous-grid'
import Section from '../components/Section'

export default ({ data }) => <div>
  <Helmet>
    <meta name="description" content={data.markdownRemark.frontmatter.description} />
  </Helmet>
  <Section title={data.markdownRemark.frontmatter.sections[0].title} name={data.markdownRemark.frontmatter.sections[0].name}>
    <div dangerouslySetInnerHTML={{ __html: md.render(data.markdownRemark.frontmatter.sections[0].text) }} />
  </Section>
</div>

//export const query = pageQuery

export const query = graphql`
  query HomeQuery($path: String!) {
    markdownRemark(fields: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        description
        sections {
          title
          name
          text
        }
      }
    }
  }
`
