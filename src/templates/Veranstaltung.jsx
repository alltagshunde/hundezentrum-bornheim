import React from "react"
import { Helmet } from "react-helmet";

import Img from 'gatsby-image'
import { Container, Row, Col } from 'glamorous-grid'

import Section, { Hr } from '../components/Section'

const hasInfoBlock = (info) => info.termin || info.place || info.price || info.subscription

export default ({ data }) => <div>
  <Helmet>
    <title>
      {data.markdownRemark.frontmatter.title}
    </title>
    <meta name="description" content={data.markdownRemark.frontmatter.description} />
    {data.site && <link rel="canonical" href={`${data.site.siteMetadata.siteUrl}${data.markdownRemark.fields.path}`} />}
  </Helmet>
  <Section title={data.markdownRemark.frontmatter.title} name={data.markdownRemark.fields.path} cssover={{ marginBottom: '1rem' }}>
    <Row>
    {hasInfoBlock(data.markdownRemark.frontmatter) && <Col span={{ md: 6 / 12 }} offset={{ md: data.markdownRemark.frontmatter.image ? 0 : 3 / 12 }} css={{ textAlign: 'center' }} alignSelf="center">
        {data.markdownRemark.frontmatter.termin && <p>
          <div css={{ fontWeight: 'bold' }}>Wann</div>
          {data.markdownRemark.frontmatter.termin}
        </p>}
        {data.markdownRemark.frontmatter.place && <p>
          <div css={{ fontWeight: 'bold' }}>Wo</div>
          {data.markdownRemark.frontmatter.place}
        </p>}
        {data.markdownRemark.frontmatter.price && <p>
          <div css={{ fontWeight: 'bold' }}>Wieviel kostet es</div>
          {data.markdownRemark.frontmatter.price}
        </p>}
        {data.markdownRemark.frontmatter.subscription && <p>
          <div css={{ fontWeight: 'bold' }}>Wie kann ich teilnehmen</div>
          {data.markdownRemark.frontmatter.subscription}
        </p>}
      </Col>}
      <Col span={{ md: 6 / 12 }} offset={{ md: hasInfoBlock(data.markdownRemark.frontmatter) ? 0 : 3 / 12 }} alignSelf="center">
        {data.markdownRemark.frontmatter.image && <Img sizes={data.markdownRemark.frontmatter.image.childImageSharp.sizes} />}
      </Col>
    </Row>

    {(hasInfoBlock(data.markdownRemark.frontmatter) || data.markdownRemark.frontmatter.image) && <Row>
      <Col span={{ md: 8 / 12, lg: 6 / 12, xl: 4 / 12 }} offset={{ md: 2 / 12, lg: 3 / 12, xl: 4 / 12 }} css={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem', marginBottom: '2rem' }}>
        {hasInfoBlock(data.markdownRemark.frontmatter) && <Hr />}
      </Col>
    </Row>}

    <Row>
      <Col>
        <div css={{ textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      </Col>
    </Row>

  </Section>
</div>


export const query = graphql`
  query EventQuery($path: String!) {
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
        place
        subscription
        description
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
