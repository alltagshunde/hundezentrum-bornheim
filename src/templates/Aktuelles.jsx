import React from "react"
import g from 'glamorous'
var MarkdownIt = require('markdown-it'),
  md = new MarkdownIt();
import { Helmet } from "react-helmet";

import Link from "gatsby-link"
import { Row, Col } from 'glamorous-grid'
import Img from 'gatsby-image'

import Section, { Hr, H2, H3 } from '../components/Section'

const NewsLink = g(Link)({
  textDecoration: 'none',
}, ({ theme }) => ({
  color: theme.color.secondary + ' !important',
  ':hover, &.active': {
    color: theme.color.primary + ' !important'
  }
}));

//TODO: might not work as date is transformed to string
const compareNewsDesc = (a, b) => {
  return b.node.frontmatter.date - a.node.frontmatter.date;
}

export default ({ data }) => <div>
  <Helmet>
    <meta name="description" content={data.markdownRemark.frontmatter.description} />
  </Helmet>
  <Section title={data.markdownRemark.frontmatter.sections[0].title} name={data.markdownRemark.frontmatter.sections[0].name}>
    {data.allMarkdownRemark && data.allMarkdownRemark.edges.sort(compareNewsDesc).map(({ node }, index) => <div key={node.id}>
      <NewsLink to={node.fields.path}>
        <Row css={{ flexDirection: index % 2 == 0 ? 'row' : 'row-reverse !important' }}>
          <Col span={{ md: 6 / 12 }} css={{ textAlign: 'center' }} alignSelf="center">
            <H2>
              {node.frontmatter.title}
            </H2>
            <H3>
              {node.frontmatter.description}
            </H3>
            <p dangerouslySetInnerHTML={{ __html: node.excerpt }}>
            </p>
          </Col>
          <Col span={{ md: 6 / 12 }} alignSelf="center">
            <Img sizes={node.frontmatter.image.childImageSharp.sizes} />
          </Col>
        </Row>
      </NewsLink>
      {<Row>
        <Col span={{ md: 8 / 12, lg: 6 / 12, xl: 4 / 12 }} offset={{ md: 2 / 12, lg: 3 / 12, xl: 4 / 12 }} css={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '3rem', marginBottom: '3rem' }}>
          {/*<Hr />*/}
        </Col>
      </Row>}
    </div>
    )}
  </Section>
</div>


//export const query = pageQuery

//TODO: readd date(formatString: "DD.MM.YYYY") to news frontmatter
export const query = graphql`
  query NewsQuery2($path: String!) {
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
    allMarkdownRemark(filter: {fields: {itemType: {eq: "news"}}}) {
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
                  sizes(maxWidth: 1600) {
                    ...GatsbyImageSharpSizes_withWebp
                  }
                }
              }
            }
            html
            excerpt
          }
        }
    }
  }
`
