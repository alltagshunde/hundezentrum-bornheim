import React from "react"
var MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();
import { Helmet } from "react-helmet";

import Img from 'gatsby-image'
import { Container, Row, Col } from 'glamorous-grid'

import Section from '../components/Section'

export default ({data}) => {
    const section = data.markdownRemark.frontmatter.sections[0]
    return <div>
               <Helmet>
                   <title>
                       { section ? section.title : data.markdownRemark.frontmatter.title }
                   </title>
                   { data.markdownRemark.frontmatter.description && <meta name="description" content={ data.markdownRemark.frontmatter.description } /> }
                   { data.site && <link rel="canonical" href={ `${data.site.siteMetadata.siteUrl}${data.markdownRemark.fields.path}` } /> }
               </Helmet>
               { data.markdownRemark.frontmatter.sections.map(section => {
                     return <div key={ section.title }>
                                { section.image_before && // TODO: use sizes with media-query, factor out to parallax component 
                                  <div css={ { height: '500px', backgroundImage: `url("${section.image_before.childImageSharp.sizes.src}")`, backgroundAttachment: 'fixed', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' } }></div> }
                                <Section title={ section.title } name={ section.name }>
                                    { section.text && <div dangerouslySetInnerHTML={ { __html: md.render(section.text) } } /> }
                                </Section>
                            </div>
                 }) }
           </div>
}

export const query = graphql`
  query PageQuery($path: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    markdownRemark(fields: { path: { eq: $path } }) {
      html
      fields {
        path
      }
      frontmatter {
        title
        description
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
  }
`