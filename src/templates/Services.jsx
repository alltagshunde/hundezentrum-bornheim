import React from "react"
import glamorous from 'glamorous'
import { Helmet } from "react-helmet";

import Link from "gatsby-link"
import { Row, Col } from 'glamorous-grid'
import Section from '../components/Section'
import Card, { CardHeader, CardBody, CardFooter, CardLink } from '../components/Card'

const StretchCard = glamorous(Card)({
    justifyContent: 'space-between'
}, ({theme}) => ({
    borderColor: theme.color.primary,
    ':hover, &.active': {
        borderColor: theme.color.accent
    }
}));

export default ({data}) => {
    const section = data.markdownRemark.frontmatter.sections[0]
    return <div>
               <Helmet>
                   <title>
                       { data.markdownRemark.frontmatter.title }
                   </title>
                   <meta name="description" content={ data.markdownRemark.frontmatter.title } />
                   <link rel="canonical" href={ `https://www.hundezentrum-bornheim.de${data.markdownRemark.fields.path}` } />
               </Helmet>
               { section.image_before && // TODO: use sizes with media-query, factor out to parallax component 
                 <div css={ { height: '500px', backgroundImage: `url("${section.image_before.childImageSharp.sizes.src}")`, backgroundAttachment: 'fixed', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' } }></div> }
               <Section title={ section.title } name={ section.name }>
                   <Row justifyContent={ { md: 'center' } }>
                       { data.allMarkdownRemark &&
                         data.allMarkdownRemark.edges.map(({node}) => <Col span={ { md: 6 / 12, lg: 4 / 12 } } css={ { marginBottom: '1rem' } } key={ node.id }>
                                                                      <CardLink to={ node.fields.path }>
                                                                          <StretchCard>
                                                                              <CardHeader>
                                                                                  { node.frontmatter.title }
                                                                              </CardHeader>
                                                                              <CardBody>
                                                                                  { node.frontmatter.description }
                                                                              </CardBody>
                                                                              <CardFooter>
                                                                                  { node.frontmatter.termin }
                                                                              </CardFooter>
                                                                          </StretchCard>
                                                                      </CardLink>
                                                                      </Col>
                         ) }
                   </Row>
               </Section>
           </div>
}

//export const query = pageQuery

export const query = graphql`
  query CoursesQuery($path: String!) {
    markdownRemark(fields: { path: { eq: $path } }) {
      html
      fields {
        path
      }
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
    allMarkdownRemark(filter: {fields: {itemType: {eq: "courses"}}}, sort: { fields: [frontmatter___position], order: ASC }) {
        edges {
          node {
            id
            fields {
              path
            }
            frontmatter {
              title
              termin
              price
              description
            }
            excerpt
          }
        }
    }
  }
`